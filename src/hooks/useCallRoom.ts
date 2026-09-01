import configs from "@config";
import { useWebsocket } from "@contexts/websocket";
import { useEffect, useRef, useState } from "react";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from "@stream-io/react-native-webrtc";
import { Socket } from "socket.io-client";
import InCallManager from "react-native-incall-manager";

const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export const useCallRoom = (roomId: string) => {
  const { socket } = useWebsocket();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [socketId: string]: MediaStream;
  }>({});

  const peersRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  // Fila para guardar os candidatos ICE que chegarem antes do RemoteDescription
  const iceCandidatesQueue = useRef<{ [socketId: string]: any[] }>({});

  useEffect(() => {
    let isMounted = true;

    const initVoice = async () => {
      // 1. Inicia áudio e viva-voz no hardware nativo
      InCallManager.start({ media: "video" });
      InCallManager.setForceSpeakerphoneOn(true);

      // 2. Captura stream local
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      if (isMounted) setLocalStream(stream);

      socket?.emit("join_call_room", { roomId });

      // O usuário que entrou recebe os usuários que já estavam na sala
      socket?.on(
        "current_room_users",
        async (users: Array<{ socketId: string }>) => {
          if (!socket) return;
          for (const targetUser of users) {
            const peer = createPeer(targetUser.socketId, stream, socket);
            peersRef.current[targetUser.socketId] = peer;

            const offer = await peer.createOffer({});
            await peer.setLocalDescription(offer);

            socket.emit("sending_offer", {
              targetSocketId: targetUser.socketId,
              offer,
            });
          }
        },
      );

      // Novo participante entrou
      socket?.on("user_joined", ({ socketId }) => {
        if (!socket) return;
        if (!peersRef.current[socketId]) {
          const peer = createPeer(socketId, stream, socket);
          peersRef.current[socketId] = peer;
        }
      });

      // Recebe oferta de outro participante
      socket?.on("receive_offer", async ({ callerSocketId, offer }) => {
        if (!socket) return;

        // CORREÇÃO 1: Cria o peer se ele ainda não existir na tabela
        let peer = peersRef.current[callerSocketId];
        if (!peer) {
          peer = createPeer(callerSocketId, stream, socket);
          peersRef.current[callerSocketId] = peer;
        }

        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        // Processa candidatos ICE pendentes na fila
        if (iceCandidatesQueue.current[callerSocketId]) {
          for (const candidate of iceCandidatesQueue.current[callerSocketId]) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          }
          delete iceCandidatesQueue.current[callerSocketId];
        }

        socket.emit("sending_answer", {
          targetSocketId: callerSocketId,
          answer,
        });
      });

      // Recebe resposta de oferta
      socket?.on("receive_answer", async ({ responderSocketId, answer }) => {
        const peer = peersRef.current[responderSocketId];
        if (peer) {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));

          // Processa candidatos ICE pendentes na fila
          if (iceCandidatesQueue.current[responderSocketId]) {
            for (const candidate of iceCandidatesQueue.current[responderSocketId]) {
              await peer.addIceCandidate(new RTCIceCandidate(candidate));
            }
            delete iceCandidatesQueue.current[responderSocketId];
          }
        }
      });

      // CORREÇÃO 2: Trata candidatos ICE com fila para evitar erros de tempo de execução
      socket?.on(
        "receive_ice_candidate",
        async ({ senderSocketId, candidate }) => {
          const peer = peersRef.current[senderSocketId];

          if (peer && peer.remoteDescription) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
            // Se o RemoteDescription não estiver pronto, guarda na fila
            if (!iceCandidatesQueue.current[senderSocketId]) {
              iceCandidatesQueue.current[senderSocketId] = [];
            }
            iceCandidatesQueue.current[senderSocketId].push(candidate);
          }
        },
      );

      socket?.on("user_left", ({ socketId }) => {
        if (peersRef.current[socketId]) {
          peersRef.current[socketId].close();
          delete peersRef.current[socketId];
        }

        setRemoteStreams((prev) => {
          const updated = { ...prev };
          delete updated[socketId];
          return updated;
        });
      });
    };

    initVoice();

    return () => {
      isMounted = false;

      InCallManager.stop();

      socket?.emit("leave_voice_room", { roomId });
      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("receive_offer");
      socket?.off("receive_answer");
      socket?.off("receive_ice_candidate");
      socket?.off("user_left");

      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
      iceCandidatesQueue.current = {};
      setRemoteStreams({});
    };
  }, [roomId, socket]);

  const createPeer = (
    targetSocketId: string,
    stream: MediaStream,
    activeSocket: Socket,
  ) => {
    const peer = new RTCPeerConnection(configuration);

    stream.getTracks().forEach((track: any) => peer.addTrack(track, stream));

    peer.onicecandidate = (event: any) => {
      if (event.candidate) {
        activeSocket.emit("sending_ice_candidate", {
          targetSocketId,
          candidate: event.candidate,
        });
      }
    };

    peer.oniceconnectionstatechange = () => {
      console.log(
        `[WebRTC] ICE State (${targetSocketId}):`,
        peer.iceConnectionState,
      );
    };

    peer.ontrack = (event: any) => {
      console.log(`[WebRTC] Track de mídia recebida de ${targetSocketId}:`, event.track.kind);
      if (event.streams && event.streams[0]) {
        const remoteStream = event.streams[0];
        setRemoteStreams((prev) => ({
          ...prev,
          [targetSocketId]: remoteStream,
        }));
      }
    };

    return peer;
  };

  const toggleAudio = (isMuted: boolean) => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track: any) => {
        track.enabled = !isMuted;
      });
    }
  };

  const toggleVideo = async (enableVideo: boolean) => {
    if (!localStream) return;

    localStream.getVideoTracks().forEach((track: any) => {
      track.enabled = enableVideo;
    });
  };

  return { localStream, remoteStreams, toggleAudio, toggleVideo };
};