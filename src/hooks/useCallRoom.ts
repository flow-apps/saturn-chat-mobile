import { useEffect, useRef, useState } from "react";
import { AppState, Platform } from "react-native";
import InCallManager from "react-native-incall-manager";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from "@stream-io/react-native-webrtc";
import { Socket } from "socket.io-client";

import configs from "@config";
import { useWebsocket } from "@contexts/websocket";
import { navigationRef } from "@routes/rootNavigation";

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

export const useCallRoom = (
  roomId: string | null,
  onEnded?: () => void,
) => {
  const { socket } = useWebsocket();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [socketId: string]: MediaStream;
  }>({});

  const peersRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const iceCandidatesQueue = useRef<{ [socketId: string]: any[] }>({});
  const notificationIdRef = useRef<string | null>(null);
  const videoEnabledRef = useRef(false);

  const refreshMediaTracks = async () => {
    if (!socket || !roomId) return;

    try {
      const nextStream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const audioTrack = nextStream.getAudioTracks()[0];
      const videoTrack = nextStream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.enabled = videoEnabledRef.current;
      }

      if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }

      setLocalStream(nextStream);

      Object.values(peersRef.current).forEach((peer) => {
        const senders = peer.getSenders();
        const audioSender = senders.find((s: any) => s.track?.kind === "audio");
        const videoSender = senders.find((s: any) => s.track?.kind === "video");

        if (audioTrack) {
          if (audioSender) {
            audioSender.replaceTrack(audioTrack);
          } else {
            peer.addTrack(audioTrack, nextStream);
          }
        }

        if (videoTrack) {
          if (videoSender) {
            videoSender.replaceTrack(videoTrack);
          } else {
            peer.addTrack(videoTrack, nextStream);
          }
        }
      });
    } catch (error) {
      console.error("[Call] Erro ao reativar mídia em segundo plano:", error);
    }
  };

  // Função centralizada para criar/reemitir a notificação fixa
  const emitCallNotification = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.requestPermissionsAsync();

        await Notifications.setNotificationChannelAsync("voice_call_channel", {
          name: "Chamadas em Andamento",
          importance: Notifications.AndroidImportance.MAX,
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
          sound: undefined,
        });
      }

      // Cancela a versão anterior para evitar duplicadas antes de reemitir
      if (notificationIdRef.current) {
        await Notifications.dismissNotificationAsync(notificationIdRef.current);
      }

      notificationIdRef.current = await Notifications.scheduleNotificationAsync(
        {
          content: {
            title: "Chamada em andamento",
            body: "Toque para voltar ao Saturn Chat",
            sticky: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            categoryIdentifier: "call",
            data: { groupId: roomId },
          },
          trigger: null,
        },
      );
    } catch (error) {
      console.error("[Notifications] Erro ao emitir notificação:", error);
    }
  };

  useEffect(() => {
    if (!roomId) {
      return;
    }

    let isMounted = true;

    const initVoice = async () => {
      // 1. Configuração de Hardware e Áudio
      InCallManager.start({ media: "audio", auto: false });
      InCallManager.setForceSpeakerphoneOn(true);
      InCallManager.setKeepScreenOn(true);

      // Emite a notificação ao entrar
      await emitCallNotification();

      // 2. Captura do Stream Local (inicia com vídeo desabilitado)
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      stream.getVideoTracks().forEach((track: any) => {
        track.enabled = false;
      });

      if (isMounted) setLocalStream(stream);

      socket?.emit("join_call_room", { roomId });

      // 3. Handshake WebRTC via Socket.IO
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

      socket?.on("user_joined", ({ socketId }) => {
        if (!socket) return;
        if (!peersRef.current[socketId]) {
          const peer = createPeer(socketId, stream, socket);
          peersRef.current[socketId] = peer;
        }
      });

      socket?.on("receive_offer", async ({ callerSocketId, offer }) => {
        if (!socket) return;

        let peer = peersRef.current[callerSocketId];
        if (!peer) {
          peer = createPeer(callerSocketId, stream, socket);
          peersRef.current[callerSocketId] = peer;
        }

        await peer.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);

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

      socket?.on(
        "receive_ice_candidate",
        async ({ senderSocketId, candidate }) => {
          const peer = peersRef.current[senderSocketId];

          if (peer && peer.remoteDescription) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
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

    // LÓGICA 1: Recria a notificação quando o usuário navega para OUTRA TELA dentro do app (Perda de foco)
    // const unsubscribeBlur = navigationRef.addListener("blur", () => {
    //   emitCallNotification();
    // });

    // LÓGICA 2: Recria a notificação caso o usuário clique nela (o Android remove notificações comuns ao clicar)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener(async () => {
        await emitCallNotification();
      });

    const appStateSubscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "active") {
          if (roomId) {
            await refreshMediaTracks();
            socket?.emit("join_call_room", { roomId });
          }
        }
      },
    );

    // Cleanup acionado SOMENTE quando a chamada é totalmente encerrada (componente desmontado)
    return () => {
      isMounted = false;
      // unsubscribeBlur();
      responseSubscription.remove();
      appStateSubscription.remove();

      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("receive_offer");
      socket?.off("receive_answer");
      socket?.off("receive_ice_candidate");
      socket?.off("user_left");

      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
      iceCandidatesQueue.current = {};

      if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }
      setRemoteStreams({});
    };
  }, [roomId, socket]);

  const endCall = () => {
    Object.values(peersRef.current).forEach((peer) => peer.close());
    peersRef.current = {};
    iceCandidatesQueue.current = {};

    if (localStream) {
      localStream.getTracks().forEach((track: any) => track.stop());
    }

    setRemoteStreams({});

    InCallManager.setKeepScreenOn(false);
    InCallManager.stop();

    if (notificationIdRef.current) {
      Notifications.dismissNotificationAsync(notificationIdRef.current);
    }

    socket?.emit("leave_voice_room", { roomId });

    socket?.off("current_room_users");
    socket?.off("user_joined");
    socket?.off("receive_offer");
    socket?.off("receive_answer");
    socket?.off("receive_ice_candidate");
    socket?.off("user_left");

    onEnded?.();
  };

  const createPeer = (
    targetSocketId: string,
    stream: MediaStream,
    activeSocket: Socket,
  ) => {
    const peerConfig = Array.isArray(configs.ICE_SERVERS_CONFIG)
      ? { iceServers: configs.ICE_SERVERS_CONFIG }
      : configs.ICE_SERVERS_CONFIG;

    const peer = new RTCPeerConnection(peerConfig);

    stream.getTracks().forEach((track: any) => peer.addTrack(track, stream));

    peer.onicecandidate = (event: any) => {
      if (event.candidate) {
        activeSocket.emit("sending_ice_candidate", {
          targetSocketId,
          candidate: event.candidate,
        });
      }
    };

    peer.ontrack = (event: any) => {
      if (event.streams && event.streams[0]) {
        const remoteStream = event.streams[0];

        event.track.onunmute = () => {
          setRemoteStreams((prev) => ({
            ...prev,
            [targetSocketId]: remoteStream,
          }));
        };

        event.track.onmute = () => {
          setRemoteStreams((prev) => ({
            ...prev,
            [targetSocketId]: remoteStream,
          }));
        };

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
    videoEnabledRef.current = enableVideo;

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
      videoTrack.enabled = enableVideo;
    }

    setLocalStream(
      Object.assign(new MediaStream(localStream.getTracks()), localStream),
    );
  };

  return { localStream, remoteStreams, toggleAudio, toggleVideo, endCall };
};
