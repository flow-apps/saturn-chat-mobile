import io from "socket.io-client"

function getWebsocket(token: string) {
  const socket = io("http://192.168.0.112:3000/", {
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
