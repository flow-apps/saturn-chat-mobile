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
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

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
    let notificationId: string | null = null;

    // 1. Configura e exibe a notificação de Foreground Service via expo-notifications
    const startCallNotification = async () => {
      try {
        if (Platform.OS === "android") {
          await Notifications.requestPermissionsAsync();

          await Notifications.setNotificationChannelAsync(
            "voice_call_channel",
            {
              name: "Chamadas em Andamento",
              importance: Notifications.AndroidImportance.MAX,
              lockscreenVisibility:
                Notifications.AndroidNotificationVisibility.PUBLIC,
              sound: undefined,
            },
          );
        }

        notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Chamada em andamento",
            body: "Toque para voltar ao Saturn Chat",
            sticky: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            categoryIdentifier: "call",
            data: { roomId },
          },
          trigger: null,
        });
      } catch (error) {
        console.error("[Notifications] Erro ao iniciar notificação:", error);
      }
    };

    const initVoice = async () => {
      // 2. Configuração de Hardware e Áudio
      InCallManager.start({ media: "audio", auto: true });
      InCallManager.setForceSpeakerphoneOn(true);
      InCallManager.setKeepScreenOn(true);

      await startCallNotification();

      // 3. Captura do Stream Local
      // Começa com video: true para negociar a track no SDP inicial,
      // mas desabilita imediatamente para o usuário entrar com a câmera desligada.
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      stream.getVideoTracks().forEach((track: any) => {
        track.enabled = false;
      });

      if (isMounted) setLocalStream(stream);

      // Entra na sala via WebSocket
      socket?.emit("join_call_room", { roomId });

      // 4. Listeners do Socket.IO para a sinalização WebRTC

      // Usuários que já estavam na sala quando eu entrei
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

      // Novo participante entrou na sala
      socket?.on("user_joined", ({ socketId }) => {
        if (!socket) return;
        if (!peersRef.current[socketId]) {
          const peer = createPeer(socketId, stream, socket);
          peersRef.current[socketId] = peer;
        }
      });

      // Recebeu uma oferta WebRTC de outro participante
      socket?.on("receive_offer", async ({ callerSocketId, offer }) => {
        if (!socket) return;

        // Se o peer ainda não existe no mapa local, cria na hora
        let peer = peersRef.current[callerSocketId];
        if (!peer) {
          peer = createPeer(callerSocketId, stream, socket);
          peersRef.current[callerSocketId] = peer;
        }

        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

        // Processa candidatos ICE pendentes que chegaram antes do SDP
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

      // Recebeu a resposta para uma oferta enviada
      socket?.on("receive_answer", async ({ responderSocketId, answer }) => {
        const peer = peersRef.current[responderSocketId];
        if (peer) {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));

          if (iceCandidatesQueue.current[responderSocketId]) {
            for (const candidate of iceCandidatesQueue.current[
              responderSocketId
            ]) {
              await peer.addIceCandidate(new RTCIceCandidate(candidate));
            }
            delete iceCandidatesQueue.current[responderSocketId];
          }
        }
      });

      // Recebeu candidatos ICE
      socket?.on(
        "receive_ice_candidate",
        async ({ senderSocketId, candidate }) => {
          const peer = peersRef.current[senderSocketId];

          if (peer && peer.remoteDescription) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
            // Guarda na fila para processar assim que o remoteDescription for definido
            if (!iceCandidatesQueue.current[senderSocketId]) {
              iceCandidatesQueue.current[senderSocketId] = [];
            }
            iceCandidatesQueue.current[senderSocketId].push(candidate);
          }
        },
      );

      // Participante saiu da chamada
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

    // 5. Cleanup da chamada
    return () => {
      isMounted = false;

      // Restaura as configurações nativas de hardware e notificações
      InCallManager.setKeepScreenOn(false);
      InCallManager.stop();

      if (notificationId) {
        Notifications.dismissNotificationAsync(notificationId);
      }

      // Informa ao servidor que o usuário saiu da sala de voz
      socket?.emit("leave_voice_room", { roomId });

      // Desliga listeners do Socket.IO
      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("receive_offer");
      socket?.off("receive_answer");
      socket?.off("receive_ice_candidate");
      socket?.off("user_left");

      // Fecha todas as conexões Peer
      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
      iceCandidatesQueue.current = {};

      // Para o stream local e reseta os remotos
      if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }
      setRemoteStreams({});
    };
  }, [roomId, socket]);

  const createPeer = (
    targetSocketId: string,
    stream: MediaStream,
    activeSocket: Socket,
  ) => {
    const peer = new RTCPeerConnection(configs.ICE_SERVERS_CONFIG);

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
      console.log(
        `[WebRTC] Track de mídia recebida de ${targetSocketId}:`,
        event.track.kind,
      );
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

    let videoTrack = localStream.getVideoTracks()[0];

    if (enableVideo && !videoTrack) {
      try {
        const videoStream = await mediaDevices.getUserMedia({
          audio: false,
          video: true,
        });

        videoTrack = videoStream.getVideoTracks()[0];

        if (videoTrack) {
          localStream.addTrack(videoTrack);

          Object.values(peersRef.current).forEach((peer) => {
            const senders = peer.getSenders();
            const videoSender = senders.find(
              (s: any) => s.track?.kind === "video",
            );

            if (videoSender) {
              videoSender.replaceTrack(videoTrack);
            } else {
              peer.addTrack(videoTrack, localStream);
            }
          });
        }
      } catch (error) {
        console.error("Erro ao capturar câmera:", error);
        return;
      }
    } else if (videoTrack) {
      // Se a faixa já existe, apenas ativa ou desativa
      videoTrack.enabled = enableVideo;
    }

    // Clona a referência para forçar o re-render no React
    setLocalStream(
      Object.assign(new MediaStream(localStream.getTracks()), localStream),
    );
  };

  return { localStream, remoteStreams, toggleAudio, toggleVideo };
};
