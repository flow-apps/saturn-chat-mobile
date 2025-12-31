import { ManagerOptions } from "socket.io-client";

const websocketConfig: ManagerOptions = {
  path: "/socket.io/",
  withCredentials: true,
  transports: ["websocket"],
  upgrade: false,
  // @ts-ignore
  jsonp: false,
  query: {
    token: ""
  }
} 

export default websocketConfig;