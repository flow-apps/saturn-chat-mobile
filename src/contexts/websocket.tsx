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
  const [socket, setSocket] = useState<Socket>();

  const { token, signed } = useAuth();

  useEffect(() => {
    if (!signed || !token) return;

    const createdSocket = io(config.API_URL, {
      ...websocketConfig,
      query: {
        token,
      },
    }).connect();
    createdSocket.compress(true);

    setSocket(createdSocket);

    return () => {
      socket.offAny();
      socket.disconnect();
    };
  }, [token, signed]);

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
