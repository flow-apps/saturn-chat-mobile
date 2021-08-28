import io, { Socket } from "socket.io-client";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function getWebsocket(token: string) {

  token = await AsyncStorage.getItem("@SaturnChat:token") || token

  const socket = io(config.API_URL, {
    path: "/socket.io/",
    timeout: 2000,
    reconnectionDelay: 500,
    forceNew: true,
    jsonp: false,
    withCredentials: true,
    transports: ["websocket"],
    query: {
      token,
    },
  }).connect();

  socket.compress(true)

  return socket;
}

export { getWebsocket };
