import React, { createContext, useContext, useEffect, useState } from "react";
import websocketConfig from "../configs/websocket";
import config from "../config";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth";

interface IWebsocketContext {
  socket: Socket;
}

const WebsocketContext = createContext({} as IWebsocketContext);

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.offAny();
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    if (socket && socket.connected) {
      return; // Ignorar conexão se já estiver conectado
    }

    if (isConnecting) return;

    setIsConnecting(true);

    console.log("Criando novo socket e conectando ao servidor");
    const createdSocket = io(config.API_URL, {
      ...websocketConfig,
      query: { token },
    });

    setSocket(createdSocket);

    createdSocket.on("connect", () => {
      console.log("Socket conectado com sucesso");
      setIsConnecting(false);
    });

    // createdSocket.on("connect_error", (error) =>
    //   console.error("Connection Error:", JSON.stringify(error))
    // );

    // createdSocket.on("disconnect", (error) => console.log(error));
    createdSocket.on("error", (error) => console.log(JSON.stringify(error)));

    return () => {
      createdSocket.offAny();
      createdSocket.disconnect();
      setSocket(null);
    };
  }, [token]);

  return (
    <WebsocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

const useWebsocket = () => {
  return useContext(WebsocketContext);
};

export { WebsocketProvider, useWebsocket };
