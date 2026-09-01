import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import InCallManager from "react-native-incall-manager";

import { useCallRoom } from "@hooks/useCallRoom";
import { useWebsocket } from "@contexts/websocket";
import { useAuth } from "@contexts/auth";
import { RoomUser } from "@type/interfaces";

import {
  Container,
  Header,
  HeaderTitle,
  ParticipantCount,
  GridContainer,
  ParticipantCard,
  Avatar,
  AvatarText,
  NameContainer,
  Name,
  MoreCard,
  MoreText,
  MoreSubtext,
  ControlsBar,
  ControlButton,
  EndCallButton,
  StyledRTCView,
} from "./styles";

const MAX_DISPLAY = 6;

const Call: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const navigation = useNavigation();

  const { groupId } = useRoute().params as {
    groupId: string;
  };
  const { socket } = useWebsocket();
  const { user } = useAuth();

  const { localStream, remoteStreams, toggleAudio, toggleVideo } =
    useCallRoom(groupId);

  const [participants, setParticipants] = useState<RoomUser[]>([
    { socketId: "local", user: user! },
  ]);

  const totalParticipants = participants.length;
  const hasMore = totalParticipants > MAX_DISPLAY;

  const visibleParticipants = hasMore
    ? participants.slice(0, MAX_DISPLAY - 1)
    : participants.slice(0, MAX_DISPLAY);

  const remainingCount = totalParticipants - (MAX_DISPLAY - 1);

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);

    if (localStream) {
      toggleAudio(nextState);
    }

    socket?.emit("toggle_mute_audio", {
      roomId: groupId,
      isMuted: nextState,
    });
  };

  const handleToggleVideo = async () => {
    const nextState = !isVideoOn;
    setIsVideoOn(nextState);

    InCallManager.start({ media: nextState ? "video" : "audio", auto: true });
    InCallManager.setForceSpeakerphoneOn(true);

    if (toggleVideo) {
      await toggleVideo(nextState);
    }

    socket?.emit("toggle_video", {
      roomId: groupId,
      isVideoOn: nextState,
    });
  };

  const handleEndCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track: any) => track.stop());
    }

    InCallManager.stop();
    socket?.emit("leave_voice_room", { roomId: groupId });
    navigation.goBack();
  };

  useEffect(() => {
    // 1. Recebe a lista inicial de participantes e preserva o estado local
    socket?.on("current_room_users", (users: RoomUser[]) => {
      setParticipants((prev) => {
        const localUser = prev.find((u) => u.socketId === "local");
        const newRemoteUsers = users.filter((u) => u.socketId !== socket.id);

        return localUser ? [localUser, ...newRemoteUsers] : newRemoteUsers;
      });
    });

    // 2. Quando um novo usuário entra na sala
    socket?.on("user_joined", (newUser: RoomUser) => {
      setParticipants((prev) => {
        if (prev.some((u) => u.socketId === newUser.socketId)) return prev;
        return [...prev, newUser];
      });
    });

    // 3. Quando um usuário sai
    socket?.on("user_left", ({ socketId }: { socketId: string }) => {
      setParticipants((prev) => prev.filter((u) => u.socketId !== socketId));
    });

    return () => {
      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("user_left");
    };
  }, [socket, user]);

  console.log(remoteStreams);
  return (
    <Container>
      <Header>
        <HeaderTitle>Chamada em Grupo</HeaderTitle>
        <ParticipantCount>{totalParticipants} na chamada</ParticipantCount>
      </Header>

      <GridContainer>
        {visibleParticipants.map((item) => {
          const isLocal = item.socketId === "local";
          const stream = isLocal ? localStream : remoteStreams?.[item.socketId];

          // No caso remoto, basta verificar se o stream remoto existe
          const shouldShowVideo = isLocal
            ? isVideoOn &&
              localStream?.getVideoTracks().some((t: any) => t.enabled)
            : !!stream && stream.getVideoTracks().length > 0;

          return (
            <ParticipantCard key={item.socketId}>
              {shouldShowVideo && stream ? (
                <StyledRTCView
                  streamURL={stream.toURL()}
                  objectFit="cover"
                  mirror={isLocal}
                />
              ) : (
                <Avatar>
                  <AvatarText>
                    {item.user?.name
                      ? item.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarText>
                </Avatar>
              )}

              <NameContainer>
                <Name numberOfLines={1}>
                  {isLocal ? `${item.user?.name} (Você)` : item.user?.name}
                </Name>
              </NameContainer>
            </ParticipantCard>
          );
        })}

        {hasMore && (
          <MoreCard onPress={() => {}} activeOpacity={0.7}>
            <MoreText>+{remainingCount}</MoreText>
            <MoreSubtext>Ver todos</MoreSubtext>
          </MoreCard>
        )}
      </GridContainer>

      <ControlsBar>
        <ControlButton onPress={handleToggleMute} isActive={isMuted}>
          <Feather name={isMuted ? "mic-off" : "mic"} size={24} color="#FFF" />
        </ControlButton>
        <ControlButton onPress={handleToggleVideo} isActive={isVideoOn}>
          <Feather
            name={isVideoOn ? "video" : "video-off"}
            size={24}
            color="#FFF"
          />
        </ControlButton>

        <EndCallButton onPress={handleEndCall}>
          <Feather name="phone-off" size={24} color="#FFF" />
        </EndCallButton>
      </ControlsBar>
    </Container>
  );
};

export default Call;
