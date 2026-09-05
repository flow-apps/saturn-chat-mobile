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
import { useAuth } from "@contexts/auth";
import { RoomUser } from "@type/interfaces";

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
  width: { ideal: 640 },
  height: { ideal: 480 },
  frameRate: { ideal: 18 },
};

const getCallVideoConstraints = (facingMode: "user" | "environment") => ({
  facingMode,
  ...CALL_VIDEO_CONSTRAINTS,
});

export const useCallRoom = (roomId: string | null, onEnded?: () => void) => {
  const { socket } = useWebsocket();
  const { user } = useAuth();
  const { t } = useTranslate("Call");

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{
    [socketId: string]: MediaStream;
  }>({});
  const [participants, setParticipants] = useState<RoomUser[]>([]);
  const [remoteVideoEnabled, setRemoteVideoEnabled] = useState<{
    [socketId: string]: boolean;
  }>({});
  const [remoteAudioMuted, setRemoteAudioMuted] = useState<{
    [socketId: string]: boolean;
  }>({});

  const streamRef = useRef<MediaStream | null>(null);
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
        video: videoEnabledRef.current
          ? getCallVideoConstraints(cameraFacingRef.current)
          : false,
      });

      const audioTrack = nextStream.getAudioTracks()[0];
      const videoTrack = nextStream.getVideoTracks()[0];

      if (videoTrack) {
        videoTrack.enabled = videoEnabledRef.current;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track: any) => track.stop());
      } else if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }

      streamRef.current = nextStream;
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
    if (!socket) return;

    const handleConnect = () => {
      if (roomId) {
        joinedRoomRef.current = null;
        joinCallRoom();
      }
    };

    socket.on("connect", handleConnect);
    return () => {
      socket.off("connect", handleConnect);
    };
  }, [socket, roomId]);

  useEffect(() => {
    if (!roomId) {
      setParticipants([]);
      return;
    }

    let isMounted = true;

    if (user) {
      setParticipants([{ socketId: "local", user }]);
    }

    const initVoice = async () => {
      InCallManager.start({ media: "audio", auto: false });
      InCallManager.setForceSpeakerphoneOn(true);
      InCallManager.setKeepScreenOn(true);

      await emitCallNotification();

      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: getCallVideoConstraints(cameraFacingRef.current),
      });

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = videoEnabledRef.current;
      }

      streamRef.current = stream;
      if (isMounted) setLocalStream(stream);

      const handleCurrentRoomUsers = async (users: RoomUser[]) => {
        if (!socket) return;

        setParticipants((prev) => {
          const localUser =
            prev.find((u) => u.socketId === "local") ||
            (user ? { socketId: "local", user } : null);
          const remoteUsers = users.filter(
            (u) =>
              u.socketId !== socket.id && (!user || u.user?.id !== user.id),
          );
          return localUser ? [localUser, ...remoteUsers] : remoteUsers;
        });

        const activeStream = streamRef.current;
        if (!activeStream) return;

        for (const targetUser of users) {
          if (targetUser.socketId === socket.id) continue;
          if (user?.id && targetUser.user?.id === user.id) continue;

          const peer = ensurePeer(targetUser.socketId, activeStream, socket);
          if (peer.signalingState !== "stable") continue;

          try {
            const offer = await peer.createOffer({});
            await peer.setLocalDescription(offer);

            socket.emit("sending_offer", {
              targetSocketId: targetUser.socketId,
              offer,
              roomId,
            });
          } catch (error) {
            console.error("[Call] Erro ao criar oferta:", error);
          }
        }
      };

      const handleUserJoined = (newUser: RoomUser) => {
        if (!socket) return;
        if (newUser.socketId === socket.id) return;
        if (user?.id && newUser.user?.id === user.id) return;

        setParticipants((prev) => {
          if (prev.some((u) => u.socketId === newUser.socketId)) return prev;
          return [...prev, newUser];
        });

        const activeStream = streamRef.current;
        if (activeStream) {
          ensurePeer(newUser.socketId, activeStream, socket);
        }
      };

      const handleReceiveOffer = async ({
        callerSocketId,
        offer,
      }: {
        callerSocketId: string;
        offer: any;
      }) => {
        if (!socket) return;

        const activeStream = streamRef.current;
        if (!activeStream) return;

        const peer = ensurePeer(callerSocketId, activeStream, socket);

        const isOfferCollision =
          offer.type === "offer" &&
          (peer.signalingState !== "stable" || peer.localDescription !== null);

        if (isOfferCollision) {
          const isPolite = (socket.id || "") < callerSocketId;
          if (!isPolite) {
            return;
          }
          try {
            await peer.setLocalDescription({ type: "rollback" } as any);
          } catch (e) {
            console.warn("[Call] Rollback falhou ou não suportado:", e);
          }
        }

        try {
          await peer.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);

          if (iceCandidatesQueue.current[callerSocketId]) {
            for (const candidate of iceCandidatesQueue.current[
              callerSocketId
            ]) {
              try {
                await peer.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (e) {
                console.warn(
                  "[Call] Erro ao adicionar ICE candidate da fila:",
                  e,
                );
              }
            }
            delete iceCandidatesQueue.current[callerSocketId];
          }

          socket.emit("sending_answer", {
            targetSocketId: callerSocketId,
            answer,
            roomId,
          });
        } catch (error) {
          console.error("[Call] Erro ao responder oferta:", error);
        }
      };

      const handleReceiveAnswer = async ({
        responderSocketId,
        answer,
      }: {
        responderSocketId: string;
        answer: any;
      }) => {
        const peer = peersRef.current[responderSocketId];
        if (!peer) return;

        if (peer.remoteDescription?.type === "answer") return;
        if (peer.signalingState !== "have-local-offer") return;

        try {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));

          if (iceCandidatesQueue.current[responderSocketId]) {
            for (const candidate of iceCandidatesQueue.current[
              responderSocketId
            ]) {
              try {
                await peer.addIceCandidate(new RTCIceCandidate(candidate));
              } catch (e) {
                console.warn(
                  "[Call] Erro ao adicionar ICE candidate após resposta:",
                  e,
                );
              }
            }
            delete iceCandidatesQueue.current[responderSocketId];
          }
        } catch (error) {
          console.error("[Call] Erro ao aplicar resposta:", error);
        }
      };

      const handleReceiveIceCandidate = async ({
        senderSocketId,
        candidate,
      }: {
        senderSocketId: string;
        candidate: any;
      }) => {
        const peer = peersRef.current[senderSocketId];

        if (peer && peer.remoteDescription && peer.remoteDescription.type) {
          try {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (e) {
            console.warn("[Call] Erro ao aplicar ICE candidate:", e);
          }
        } else {
          if (!iceCandidatesQueue.current[senderSocketId]) {
            iceCandidatesQueue.current[senderSocketId] = [];
          }
          iceCandidatesQueue.current[senderSocketId].push(candidate);
        }
      };

      const handleUserLeft = ({ socketId }: { socketId: string }) => {
        cleanupPeerConnection(socketId);
        setParticipants((prev) => prev.filter((u) => u.socketId !== socketId));
      };

      const handleUserToggleVideo = ({
        socketId,
        isVideoOn,
      }: {
        socketId: string;
        isVideoOn: boolean;
      }) => {
        setRemoteVideoEnabled((prev) => ({
          ...prev,
          [socketId]: isVideoOn,
        }));
      };

      const handleUserToggleAudio = ({
        socketId,
        isMuted,
      }: {
        socketId: string;
        isMuted: boolean;
      }) => {
        setRemoteAudioMuted((prev) => ({
          ...prev,
          [socketId]: isMuted,
        }));
      };

      socket?.on("current_room_users", handleCurrentRoomUsers);
      socket?.on("user_joined", handleUserJoined);
      socket?.on("receive_offer", handleReceiveOffer);
      socket?.on("receive_answer", handleReceiveAnswer);
      socket?.on("receive_ice_candidate", handleReceiveIceCandidate);
      socket?.on("user_left", handleUserLeft);
      socket?.on("user_toggle_video", handleUserToggleVideo);
      socket?.on("user_toggle_audio", handleUserToggleAudio);

      joinCallRoom();
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
      socket?.off("user_toggle_video");
      socket?.off("user_toggle_audio");

      Object.keys(peersRef.current).forEach((targetSocketId) => {
        cleanupPeerConnection(targetSocketId);
      });

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track: any) => track.stop());
        streamRef.current = null;
      }
      setLocalStream(null);
      setRemoteStreams({});
      setParticipants([]);
      setRemoteVideoEnabled({});
      setRemoteAudioMuted({});
    };
  }, [roomId, socket, user]);

  const renegotiatePeer = async (
    targetSocketId: string,
    peer: RTCPeerConnection,
  ) => {
    if (!socket || peer.signalingState !== "stable") return;

    try {
      const offer = await peer.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await peer.setLocalDescription(offer);

      socket.emit("sending_offer", {
        targetSocketId,
        offer,
        roomId,
      });
    } catch (error) {
      console.error("[Call] Erro na renegociação com peer:", error);
    }
  };

  const cleanupPeerConnection = (targetSocketId: string) => {
    const peer = peersRef.current[targetSocketId];
    if (peer) {
      peer.close();
      delete peersRef.current[targetSocketId];
    }

    delete iceCandidatesQueue.current[targetSocketId];
    setRemoteStreams((prev) => {
      const updated = { ...prev };
      delete updated[targetSocketId];
      return updated;
    });
    setRemoteVideoEnabled((prev) => {
      const updated = { ...prev };
      delete updated[targetSocketId];
      return updated;
    });
    setRemoteAudioMuted((prev) => {
      const updated = { ...prev };
      delete updated[targetSocketId];
      return updated;
    });
  };

  const endCall = () => {
    socket?.emit("leave_voice_room", { roomId });

    Object.keys(peersRef.current).forEach((targetSocketId) => {
      cleanupPeerConnection(targetSocketId);
    });

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track: any) => track.stop());
      streamRef.current = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track: any) => track.stop());
    }

    setLocalStream(null);
    videoEnabledRef.current = false;
    joinedRoomRef.current = null;
    setRemoteStreams({});
    setParticipants([]);
    setRemoteVideoEnabled({});
    setRemoteAudioMuted({});

    InCallManager.setKeepScreenOn(false);
    InCallManager.stop();

    if (notificationIdRef.current) {
      Notifications.dismissNotificationAsync(notificationIdRef.current);
    }

    socket?.off("current_room_users");
    socket?.off("user_joined");
    socket?.off("receive_offer");
    socket?.off("receive_answer");
    socket?.off("receive_ice_candidate");
    socket?.off("user_left");
    socket?.off("user_toggle_video");
    socket?.off("user_toggle_audio");

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
          roomId,
        });
      }
    };

    peer.ontrack = (event: any) => {
      const remoteStream =
        event.stream || event.streams?.[0] || new MediaStream([event.track]);

      if (remoteStream && !remoteStream.getTracks().includes(event.track)) {
        remoteStream.addTrack(event.track);
      }

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
    };

    peer.onconnectionstatechange = () => {
      if (["failed", "closed"].includes(peer.connectionState)) {
        cleanupPeerConnection(targetSocketId);
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
    const activeStream = streamRef.current || localStream;
    if (activeStream) {
      activeStream.getAudioTracks().forEach((track: any) => {
        track.enabled = !isMuted;
      });
    }

    socket?.emit("toggle_mute_audio", {
      roomId,
      isMuted,
    });
  };

  const toggleVideo = async (enableVideo: boolean) => {
    videoEnabledRef.current = enableVideo;

    const activeStream = streamRef.current || localStream;
    if (!activeStream) return;

    let videoTrack = activeStream.getVideoTracks()[0];

    if (!videoTrack && enableVideo) {
      try {
        const videoStream = await mediaDevices.getUserMedia({
          audio: false,
          video: getCallVideoConstraints(cameraFacingRef.current),
        });
        const newVideoTrack = videoStream.getVideoTracks()[0];
        if (newVideoTrack) {
          activeStream.addTrack(newVideoTrack);
          videoTrack = newVideoTrack;
        }
      } catch (error) {
        console.error("[Call] Erro ao obter câmera:", error);
        return;
      }
    }

    if (videoTrack) {
      videoTrack.enabled = enableVideo;

      Object.values(peersRef.current).forEach((peer) => {
        const senders = peer.getSenders();
        const videoSender = senders.find((s: any) => s.track?.kind === "video");

        if (videoSender) {
          videoSender.replaceTrack(videoTrack);
        } else if (enableVideo) {
          peer.addTrack(videoTrack, activeStream);
        }
      });
    }

    streamRef.current = activeStream;
    setLocalStream(activeStream);

    socket?.emit("toggle_video", {
      roomId,
      isVideoOn: enableVideo,
    });
  };

  const switchCamera = async () => {
    const nextFacing =
      cameraFacingRef.current === "user" ? "environment" : "user";
    cameraFacingRef.current = nextFacing;

    const activeStream = streamRef.current || localStream;
    if (!activeStream || !videoEnabledRef.current) {
      return;
    }

    const currentVideoTrack = activeStream.getVideoTracks()[0];
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
      activeStream.removeTrack(currentVideoTrack);
      activeStream.addTrack(nextVideoTrack);

      await Promise.all(
        Object.entries(peersRef.current).map(async ([targetSocketId, peer]) => {
          const senders = peer.getSenders();
          const videoSender = senders.find(
            (s: any) => s.track?.kind === "video",
          );

          if (videoSender) {
            videoSender.replaceTrack(nextVideoTrack);
          } else {
            peer.addTrack(nextVideoTrack, activeStream);
          }

          await renegotiatePeer(targetSocketId, peer);
        }),
      );

      const updatedStream = new MediaStream(activeStream.getTracks());
      streamRef.current = updatedStream;
      setLocalStream(updatedStream);
    } catch (error) {
      console.error("Erro ao trocar câmera:", error);
    }
  };

  return {
    localStream,
    remoteStreams,
    participants,
    remoteVideoEnabled,
    remoteAudioMuted,
    toggleAudio,
    toggleVideo,
    switchCamera,
    endCall,
  };
};
