import React, { createContext, useContext, useEffect, useState } from "react";
import websocketConfig from "../configs/websocket";
import config from "../config";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IWebsocketContext {
  socket: Socket | null;
  isConnected: boolean;
}

const WebsocketContext = createContext<IWebsocketContext>({
  socket: null,
  isConnected: false,
});

const API_PREFERENCE_KEY = "@SaturnChat:useDevApi";

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const { token } = useAuth();

  useEffect(() => {
    let createdSocket: Socket | null = null;

    const setupSocket = async () => {
      if (!token) {
        if (socket) {
          socket.offAny();
          socket.disconnect();
          setSocket(null);
          setIsConnected(false);
        }
        return;
      }

      if (socket && socket.connected) {
        return;
      }

      if (isConnecting) return;

      setIsConnecting(true);

      let currentBaseURL = config.PROD_API_URL;

      try {
        const storedPreference = await AsyncStorage.getItem(API_PREFERENCE_KEY);
        const useDev =
          storedPreference && __DEV__ ? JSON.parse(storedPreference) : false;
        currentBaseURL = useDev ? config.DEV_API_URL : config.PROD_API_URL;
      } catch (error) {
        console.error(
          "Failed to load API preference from AsyncStorage in websocket context",
          error,
        );
      }

      console.log(
        `Criando novo socket e conectando ao servidor em ${currentBaseURL}`,
      );
      createdSocket = io(currentBaseURL, {
        ...websocketConfig,
        query: { token },
      });

      setSocket(createdSocket);

      createdSocket.on("connect", () => {
        console.log("Socket conectado com sucesso");
        setIsConnecting(false);
        setIsConnected(true);
      });

      createdSocket.on("disconnect", () => {
        console.log("Socket desconectado");
        setIsConnected(false);
      });

      createdSocket.on("error", (error) => console.log(JSON.stringify(error)));
    };

    setupSocket();

    return () => {
      if (createdSocket) {
        createdSocket.offAny();
        createdSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
    };
  }, [token]);

  return (
    <WebsocketContext.Provider
      value={{
        socket,
        isConnected,
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
