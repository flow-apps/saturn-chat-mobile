import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import InCallManager from "react-native-incall-manager";

import { useCallRoom } from "@hooks/useCallRoom";
import { useWebsocket } from "@contexts/websocket";
import { useAuth } from "@contexts/auth";
import { useCallStatus } from "@contexts/callStatus";
import { RoomUser } from "@type/interfaces";

import {
  Container,
  Header,
  HeaderTitle,
  ParticipantCount,
  GridContainer,
  ParticipantCard,
  Avatar,
  AvatarImage, // Importado
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
  const navigation = useNavigation();

  const { groupId } = useRoute().params as {
    groupId: string;
  };
  const { socket } = useWebsocket();
  const { user } = useAuth();
  const {
    localStream,
    remoteStreams,
    toggleAudio,
    toggleVideo,
    endCall,
    setActiveCallRoom,
    isVideoEnabled,
    setVideoEnabled,
  } = useCallStatus();

  useEffect(() => {
    setActiveCallRoom(groupId);
  }, [groupId, setActiveCallRoom]);

  const [participants, setParticipants] = useState<RoomUser[]>([
    { socketId: "local", user: user! },
  ]);

  const totalParticipants = participants.length;
  const hasMore = totalParticipants > MAX_DISPLAY;

  const visibleParticipants = hasMore
    ? participants.slice(0, MAX_DISPLAY - 1)
    : participants.slice(0, MAX_DISPLAY);

  const remainingCount = totalParticipants - (MAX_DISPLAY - 1);
  const displayedCardsCount = hasMore
    ? visibleParticipants.length + 1
    : visibleParticipants.length;

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
    const nextState = !isVideoEnabled;
    setVideoEnabled(nextState);

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
    endCall();
    navigation.goBack();
  };

  useEffect(() => {
    socket?.on("current_room_users", (users: RoomUser[]) => {
      setParticipants((prev) => {
        const localUser = prev.find((u) => u.socketId === "local");
        const newRemoteUsers = users.filter((u) => u.socketId !== socket.id);
        return localUser ? [localUser, ...newRemoteUsers] : newRemoteUsers;
      });
    });

    socket?.on("user_joined", (newUser: RoomUser) => {
      setParticipants((prev) => {
        if (prev.some((u) => u.socketId === newUser.socketId)) return prev;
        return [...prev, newUser];
      });
    });

    socket?.on("user_left", ({ socketId }: { socketId: string }) => {
      setParticipants((prev) => prev.filter((u) => u.socketId !== socketId));
    });

    return () => {
      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("user_left");
    };
  }, [socket, user]);

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

          const hasVideoTrack = stream
            ?.getVideoTracks()
            .some((t: any) => t.enabled && t.readyState === "live");

          const shouldShowVideo = isLocal
            ? isVideoEnabled && hasVideoTrack
            : hasVideoTrack;

          return (
            <ParticipantCard
              key={item.socketId}
              totalItems={displayedCardsCount}
            >
              {shouldShowVideo && stream ? (
                <StyledRTCView
                  streamURL={stream.toURL()}
                  objectFit="cover"
                  mirror={isLocal}
                />
              ) : (
                <Avatar>
                  <AvatarImage
                    uri={item.user.avatar ? item.user?.avatar.url : undefined}
                    placeholder={require("@assets/avatar-placeholder.jpg")}
                  />
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
          <MoreCard
            totalItems={displayedCardsCount}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <MoreText>+{remainingCount}</MoreText>
            <MoreSubtext>Ver todos</MoreSubtext>
          </MoreCard>
        )}
      </GridContainer>

      <ControlsBar>
        <ControlButton onPress={handleToggleMute} isActive={!isMuted}>
          <Feather name={isMuted ? "mic-off" : "mic"} size={24} color="#FFF" />
        </ControlButton>
        <ControlButton onPress={handleToggleVideo} isActive={isVideoEnabled}>
          <Feather
            name={isVideoEnabled ? "video" : "video-off"}
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
