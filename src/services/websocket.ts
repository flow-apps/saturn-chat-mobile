import io from "socket.io-client"
import config from "../config"

function getWebsocket(token: string) {
  const socket = io(config.API_URL, {
      path: "/socket.io/",
      jsonp: false,
      withCredentials: true,
      transports: ["websocket"],
      query: {
        token,
      },
  }).connect()

  return socket
}


export { getWebsocket }
