import { useEffect, useRef, useState } from "react";
import { AppState, Platform } from "react-native";
import InCallManager from "react-native-incall-manager";
import * as Notifications from "expo-notifications";

import { useTranslate } from "@hooks/useTranslate";
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

const CALL_VIDEO_CONSTRAINTS = {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  frameRate: { ideal: 24 },
};

const getCallVideoConstraints = (facingMode: "user" | "environment") => ({
  facingMode,
  ...CALL_VIDEO_CONSTRAINTS,
});

export const useCallRoom = (
  roomId: string | null,
  onEnded?: () => void,
) => {
  const { socket } = useWebsocket();
  const { t } = useTranslate("Call");

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [socketId: string]: MediaStream;
  }>({});

  const peersRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const iceCandidatesQueue = useRef<{ [socketId: string]: any[] }>({});
  const notificationIdRef = useRef<string | null>(null);
  const joinedRoomRef = useRef<{ roomId: string; socket: Socket } | null>(null);
  const videoEnabledRef = useRef(false);
  const cameraFacingRef = useRef<"user" | "environment">("user");

  const joinCallRoom = () => {
    if (
      !socket ||
      !roomId ||
      (joinedRoomRef.current?.roomId === roomId &&
        joinedRoomRef.current.socket === socket)
    ) {
      return;
    }

    joinedRoomRef.current = { roomId, socket };
    socket.emit("join_call_room", { roomId });
  };

  const refreshMediaTracks = async () => {
    if (!socket || !roomId) return;

    try {
      const nextStream = await mediaDevices.getUserMedia({
        audio: true,
        video: getCallVideoConstraints(cameraFacingRef.current),
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

  const emitCallNotification = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.requestPermissionsAsync();

        await Notifications.setNotificationChannelAsync("voice_call_channel", {
          name: t("notification.channel_name"),
          importance: Notifications.AndroidImportance.MAX,
          lockscreenVisibility:
            Notifications.AndroidNotificationVisibility.PUBLIC,
          sound: undefined,
        });
      }

      if (notificationIdRef.current) {
        await Notifications.dismissNotificationAsync(notificationIdRef.current);
      }

      notificationIdRef.current = await Notifications.scheduleNotificationAsync(
        {
          content: {
            title: t("notification.title"),
            body: t("notification.body"),
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
      InCallManager.start({ media: "audio", auto: false });
      InCallManager.setForceSpeakerphoneOn(true);
      InCallManager.setKeepScreenOn(true);

      await emitCallNotification();

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      if (isMounted) setLocalStream(stream);

      joinCallRoom();

      socket?.on(
        "current_room_users",
        async (users: Array<{ socketId: string }>) => {
          if (!socket) return;
          for (const targetUser of users) {
            const peer = ensurePeer(targetUser.socketId, stream, socket);

            if (peer.signalingState !== "stable") continue;

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
        ensurePeer(socketId, stream, socket);
      });

      socket?.on("receive_offer", async ({ callerSocketId, offer }) => {
        if (!socket) return;

        const peer = ensurePeer(callerSocketId, stream, socket);

        if (peer.remoteDescription && peer.remoteDescription.type === "offer") {
          return;
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

    const appStateSubscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "active") {
          if (roomId) {
            await refreshMediaTracks();
            joinCallRoom();
          }
        }
      },
    );

    return () => {
      isMounted = false;
      joinedRoomRef.current = null;
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

    setLocalStream(null);
    videoEnabledRef.current = false;
    joinedRoomRef.current = null;

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
    const existingPeer = peersRef.current[targetSocketId];
    if (existingPeer) {
      return existingPeer;
    }

    const peerConfig = Array.isArray(configs.ICE_SERVERS_CONFIG)
      ? { iceServers: configs.ICE_SERVERS_CONFIG }
      : configs.ICE_SERVERS_CONFIG;

    const peer = new RTCPeerConnection(peerConfig);
    peersRef.current[targetSocketId] = peer;

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

  const ensurePeer = (
    targetSocketId: string,
    stream: MediaStream,
    activeSocket: Socket,
  ) => createPeer(targetSocketId, stream, activeSocket);

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

    if (enableVideo) {
      try {
        const videoStream = await mediaDevices.getUserMedia({
          audio: false,
          video: getCallVideoConstraints(cameraFacingRef.current),
        });

        const nextVideoTrack = videoStream.getVideoTracks()[0];

        if (nextVideoTrack) {
          if (videoTrack) {
            videoTrack.stop();
            localStream.removeTrack(videoTrack);
          }

          videoTrack = nextVideoTrack;
          localStream.addTrack(nextVideoTrack);

          Object.values(peersRef.current).forEach((peer) => {
            const senders = peer.getSenders();
            const videoSender = senders.find(
              (s: any) => s.track?.kind === "video",
            );

            if (videoSender) {
              videoSender.replaceTrack(nextVideoTrack);
            } else {
              peer.addTrack(nextVideoTrack, localStream);
            }
          });
        }
      } catch (error) {
        console.error("Erro ao capturar câmera:", error);
        return;
      }
    } else if (videoTrack) {
      videoTrack.stop();
      localStream.removeTrack(videoTrack);
    }

    setLocalStream(new MediaStream(localStream.getTracks()));
  };

  const switchCamera = async () => {
    const nextFacing =
      cameraFacingRef.current === "user" ? "environment" : "user";
    cameraFacingRef.current = nextFacing;

    if (!localStream || !videoEnabledRef.current) {
      return;
    }

    const currentVideoTrack = localStream.getVideoTracks()[0];

    if (!currentVideoTrack) {
      return;
    }

    try {
      const nextVideoStream = await mediaDevices.getUserMedia({
        audio: false,
        video: getCallVideoConstraints(nextFacing),
      });

      const nextVideoTrack = nextVideoStream.getVideoTracks()[0];

      if (!nextVideoTrack) {
        nextVideoStream.getTracks().forEach((track: any) => track.stop());
        return;
      }

      currentVideoTrack.stop();
      localStream.removeTrack(currentVideoTrack);
      localStream.addTrack(nextVideoTrack);

      Object.values(peersRef.current).forEach((peer) => {
        const senders = peer.getSenders();
        const videoSender = senders.find((s: any) => s.track?.kind === "video");

        if (videoSender) {
          videoSender.replaceTrack(nextVideoTrack);
        } else {
          peer.addTrack(nextVideoTrack, localStream);
        }
      });

      setLocalStream(new MediaStream(localStream.getTracks()));
    } catch (error) {
      console.error("Erro ao trocar câmera:", error);
    }
  };

  return {
    localStream,
    remoteStreams,
    toggleAudio,
    toggleVideo,
    switchCamera,
    endCall,
  };
};
