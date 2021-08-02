import io, { Socket } from "socket.io-client";
import config from "../config";

function getWebsocket(token: string) {
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
