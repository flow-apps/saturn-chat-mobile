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
  const [connecting, setConnecting] = useState(false);

  const { token, signed } = useAuth();

  useEffect(() => {
    if (!signed || !token) {
      setSocket(null);
      return;
    }
    
    if (socket && socket.connected || connecting)
      return;

    console.log("Conectando ao Socket");
    setConnecting(true);


    const createdSocket = io(config.API_URL, {
      ...websocketConfig,
      query: {
        token,
      },
    });
    createdSocket.compress(true);
    createdSocket.connect();

    createdSocket.on("connect", () => {
      console.log("Socket conectado com sucesso");
      
      setSocket(createdSocket);
      setConnecting(false);
    })

    return () => {
      if (socket && socket.connected) {
        socket.offAny();
        socket.disconnect();
      }
    };
  }, [signed, token]);

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
