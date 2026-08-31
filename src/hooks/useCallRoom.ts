// useCallRoom.ts
import configs from "@config";
import { useAuth } from "@contexts/auth";
import { useWebsocket } from "@contexts/websocket";
import { useEffect, useRef, useState } from "react";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from "@stream-io/react-native-webrtc";
import { Socket } from "socket.io-client";

const configuration = configs.ICE_SERVERS;

export const useCallRoom = (roomId: string) => {
  const { user } = useAuth();
  const { socket } = useWebsocket();
  const [localStream, setLocalStream] = useState<any>(null);
  const peersRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});

  useEffect(() => {
    let isMounted = true;

    const initVoice = async () => {
      // 1. Obter stream de áudio do microfone
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      if (isMounted) setLocalStream(stream);

      // 2. Notificar servidor que entrou no canal
      socket?.emit("join-voice-room", {
        roomId,
        userId: user?.id,
        userName: user?.name,
      });

      // 3. Receber usuários que já estavam na sala e criar ofertas P2P para cada um
      socket?.on(
        "current-room-users",
        async (users: Array<{ socketId: string }>) => {
          for (const targetUser of users) {
            const peer = createPeer(targetUser.socketId, stream, socket);
            peersRef.current[targetUser.socketId] = peer;

            const offer = await peer.createOffer({});
            await peer.setLocalDescription(offer);

            socket.emit("sending-offer", {
              targetSocketId: targetUser.socketId,
              offer,
            });
          }
        },
      );

      // 4. Quando um novo usuário entra, aguarda a oferta dele
      socket?.on("user-joined", ({ socketId }) => {
        const peer = createPeer(socketId, stream, socket);
        peersRef.current[socketId] = peer;
      });

      // 5. Tratar oferta recebida
      socket?.on("receive-offer", async ({ callerSocketId, offer }) => {
        const peer = peersRef.current[callerSocketId];
        if (!peer) return;

        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        socket.emit("sending-answer", {
          targetSocketId: callerSocketId,
          answer,
        });
      });

      // 6. Tratar resposta recebida
      socket?.on("receive-answer", async ({ responderSocketId, answer }) => {
        const peer = peersRef.current[responderSocketId];
        if (peer) {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      // 7. Adicionar candidatos ICE
      socket?.on(
        "receive-ice-candidate",
        async ({ senderSocketId, candidate }) => {
          const peer = peersRef.current[senderSocketId];
          if (peer) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          }
        },
      );

      // 8. Usuário saiu da sala
      socket?.on("user-left", ({ socketId }) => {
        if (peersRef.current[socketId]) {
          peersRef.current[socketId].close();
          delete peersRef.current[socketId];
        }
      });
    };

    initVoice();

    return () => {
      isMounted = false;
      // Limpeza de recursos ao fechar/sair da tela
      socket?.emit("leave-voice-room");
      socket?.off("current-room-users");
      socket?.off("user-joined");
      socket?.off("receive-offer");
      socket?.off("receive-answer");
      socket?.off("receive-ice-candidate");
      socket?.off("user-left");

      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
    };
  }, [roomId]);

  const createPeer = (targetSocketId: string, stream: any, socket: Socket) => {
    const peer = new RTCPeerConnection(configuration);

    // Adiciona as faixas de áudio locais à conexão
    stream.getTracks().forEach((track: any) => peer.addTrack(track, stream));

    // Envia os candidatos ICE para o outro par
    peer.onicecandidate = (event: any) => {
      if (event.candidate) {
        socket.emit("sending-ice-candidate", {
          targetSocketId,
          candidate: event.candidate,
        });
      }
    };

    return peer;
  };

  return { localStream };
};
