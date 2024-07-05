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

  const { token, signed } = useAuth();

  useEffect(() => {
    if (!signed || !token) {
      setSocket(null)
      return
    };

    console.log("Conectando ao Socket");
    
    const createdSocket = io(config.API_URL, {
      ...websocketConfig,
      query: {
        token,
      },
    });
    createdSocket.compress(true);
    createdSocket.connect()

    setSocket(createdSocket);

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
