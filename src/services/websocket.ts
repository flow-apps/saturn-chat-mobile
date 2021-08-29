import io from "socket.io-client";
import config from "../config";
import websocket from "../configs/websocket";

function getWebsocket() {
  const socket = io(config.API_URL, websocket).connect();

  socket.compress(true)

  return socket;
}

export { getWebsocket };
