import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./auth";

interface SocketContext {
  socket: Socket;
  connectInGroup: (id: string) => Socket;
}

interface SocketContextProps {
  groupID: string;
}

const SocketContext = createContext({} as SocketContext);

const SocketProvider: React.FC = ({ children }) => {
  const { token } = useAuth();
  const connectInGroup = useCallback((id: string) => {
    const socketIO = io("http://192.168.0.112:3000/", {
      path: "/socket.io/",
      jsonp: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      transports: ["websocket"],
      query: {
        group_id: id,
        token,
      },
    });

    return socketIO;
  }, []);

  return (
    <SocketContext.Provider
      value={{
        connectInGroup,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const socketContext = useContext(SocketContext);

  return socketContext;
};

export { SocketProvider, useSocket };
