import { ManagerOptions, SocketOptions } from "socket.io-client";

export default {
  path: "/socket.io/",
  timeout: 2000,
  reconnectionDelay: 500,
  forceNew: true,
  jsonp: false,
  withCredentials: true,
  transports: ["websocket"],
  query: {
    token: ""
  }
}