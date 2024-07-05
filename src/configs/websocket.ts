import { ManagerOptions } from "socket.io-client";

const websocketConfig: ManagerOptions = {
  path: "/socket.io/",
  reconnectionDelay: 250,
  withCredentials: true,
  transports: ["websocket"],
  // @ts-ignore
  jsonp: false,
  query: {
    token: ""
  }
} 

export default websocketConfig;