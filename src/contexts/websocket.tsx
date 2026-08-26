import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import websocketConfig from "../configs/websocket";
import config from "../config";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IWebsocketContext {
  socket: Socket | null;
}

const WebsocketContext = createContext<IWebsocketContext>({ socket: null });

const API_PREFERENCE_KEY = "@SaturnChat:useDevApi";

const WebsocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const { token } = useAuth();

  useEffect(() => {
    let activeSocket: Socket | null = null;

    const setupSocket = async () => {
      if (!token) {
        if (socket) {
          socket.offAny();
          socket.disconnect();
          setSocket(null);
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
        const useDev = storedPreference && __DEV__ ? JSON.parse(storedPreference) : false;
        currentBaseURL = useDev ? config.DEV_API_URL : config.PROD_API_URL;
      } catch (error) {
        console.error("Failed to load API preference from AsyncStorage in websocket context", error);
      }

      console.log(`Criando novo socket e conectando ao servidor em ${currentBaseURL}`);
      activeSocket = io(currentBaseURL, {
        ...websocketConfig,
        query: { token },
      });

      setSocket(activeSocket);

      activeSocket.on("connect", () => {
        console.log("Socket conectado com sucesso");
        setIsConnecting(false);
      });

      activeSocket.on("disconnect", (reason) => {
        console.log(`Socket desconectado. Razão: ${reason}`);
        setIsConnecting(false);
      });

      activeSocket.on("error", (error) => console.log(JSON.stringify(error)));
    };

    setupSocket();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App voltou para primeiro plano. Verificando reconexão do socket...");
        setSocket((currentSocket) => {
          if (currentSocket && !currentSocket.connected) {
            currentSocket.connect();
          } else if (!currentSocket && token) {
            setupSocket();
          }
          return currentSocket;
        });
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      if (activeSocket) {
        activeSocket.offAny();
        activeSocket.disconnect();
      }
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