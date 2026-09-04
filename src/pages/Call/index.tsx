import React, { useEffect, useState } from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import InCallManager from "react-native-incall-manager";
import {
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CustomAlert from "@components/Alert";
import { useTranslate } from "@hooks/useTranslate";
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
  AvatarImage,
  NameContainer,
  Name,
  MoreCard,
  MoreText,
  MoreSubtext,
  ControlsBar,
  ControlButton,
  EndCallButton,
  StyledRTCView,
  DirectCallContainer,
  FullscreenCard,
  MiniCard,
} from "./styles";

const MAX_DISPLAY = 12;

const Call: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLocalPrimary, setIsLocalPrimary] = useState(false);
  const [isParticipantsModalVisible, setParticipantsModalVisible] =
    useState(false);
  const [focusedParticipant, setFocusedParticipant] = useState<RoomUser | null>(
    null,
  );
  const [callAlert, setCallAlert] = useState({
    visible: false,
    title: "",
    content: "",
  });
  const navigation = useNavigation();
  const { t } = useTranslate("Call");

  const { groupId } = useRoute().params as {
    groupId: string;
  };
  const { socket } = useWebsocket();
  const { user } = useAuth();
  const {
    localStream,
    remoteStreams,
    toggleAudio,
    switchCamera,
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
  const localParticipant = participants.find(
    (item) => item.socketId === "local",
  );
  const remoteParticipant = participants.find(
    (item) => item.socketId !== "local",
  );
  const isDirectCall =
    totalParticipants === 2 && !!localParticipant && !!remoteParticipant;
  const primaryParticipant = isLocalPrimary
    ? localParticipant
    : remoteParticipant;
  const secondaryParticipant = isLocalPrimary
    ? remoteParticipant
    : localParticipant;

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

    await setVideoEnabled(nextState);

    InCallManager.start({ media: nextState ? "video" : "audio", auto: true });
    InCallManager.setForceSpeakerphoneOn(true);

    socket?.emit("toggle_video", {
      roomId: groupId,
      isVideoOn: nextState,
    });
  };

  const handleEndCall = () => {
    endCall();
    navigation.goBack();
  };

  const showCallAlert = (
    message: string,
    fallbackTitle = t("errors.default.title"),
  ) => {
    const lowerMessage = message.toLowerCase();

    let title = fallbackTitle;
    let content = message || t("errors.default.content");

    if (lowerMessage.includes("banned")) {
      title = t("errors.access_blocked.title");
      content = t("errors.access_blocked.content");
    } else if (lowerMessage.includes("not in this group")) {
      title = t("errors.group_invalid.title");
      content = t("errors.group_invalid.content");
    } else if (lowerMessage.includes("direct calls can only contain")) {
      title = t("errors.direct_limit.title");
      content = t("errors.direct_limit.content");
    } else if (lowerMessage.includes("allows up to")) {
      title = t("errors.participant_limit.title");
      content = message;
    } else if (
      lowerMessage.includes("inactivity") ||
      lowerMessage.includes("inactivity_timeout")
    ) {
      title = t("errors.inactivity_timeout.title");
      content = t("errors.inactivity_timeout.content");
    } else if (
      lowerMessage.includes("call room") ||
      lowerMessage.includes("room closed") ||
      lowerMessage.includes("closed")
    ) {
      title = t("errors.call_closed.title");
      content = t("errors.call_closed.content");
    } else if (lowerMessage.includes("not part of this direct call")) {
      title = t("errors.direct_not_part.title");
      content = t("errors.direct_not_part.content");
    }

    setCallAlert({ visible: true, title, content });
  };

  const closeCallAlert = () => {
    setCallAlert({ visible: false, title: "", content: "" });
    navigation.goBack();
  };

  const handleParticipantFocus = (item: RoomUser) => {
    setParticipantsModalVisible(false);
    setFocusedParticipant(item);
  };

  const closeFocusedParticipant = () => {
    setFocusedParticipant(null);
    setParticipantsModalVisible(true);
  };

  const renderParticipantContent = (item: RoomUser) => {
    const isLocal = item.socketId === "local";
    const stream = isLocal ? localStream : remoteStreams?.[item.socketId];

    const hasVideoTrack = stream
      ?.getVideoTracks()
      .some((t: any) => t.enabled && t.readyState === "live");

    const shouldShowVideo = isLocal
      ? isVideoEnabled && hasVideoTrack
      : hasVideoTrack;

    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#29292E",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        {shouldShowVideo && stream ? (
          <StyledRTCView
            streamURL={stream.toURL()}
            objectFit="cover"
            mirror={isLocal}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#29292E",
            }}
          >
            <Avatar>
              <AvatarImage
                uri={item.user.avatar ? item.user?.avatar.url : undefined}
                placeholder={require("@assets/avatar-placeholder.jpg")}
              />
            </Avatar>
          </View>
        )}

        <NameContainer>
          <Name numberOfLines={1}>
            {isLocal ? `${item.user?.name} (${t("you")})` : item.user?.name}
          </Name>
        </NameContainer>
      </View>
    );
  };

  useEffect(() => {
    const handleRoomError = ({ message }: { message?: string }) => {
      if (message) {
        showCallAlert(message);
      }
    };

    const handleRoomClosed = ({ reason }: { reason?: string }) => {
      if (reason === "inactivity_timeout") {
        showCallAlert(t("events.inactivity_closed"));
        return;
      }

      showCallAlert(t("events.room_closed"));
    };

    socket?.on("call_error", handleRoomError);
    socket?.on("error_join_call_room", handleRoomError);
    socket?.on("call_room_closed", handleRoomClosed);

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
      socket?.off("call_error", handleRoomError);
      socket?.off("error_join_call_room", handleRoomError);
      socket?.off("call_room_closed", handleRoomClosed);
      socket?.off("current_room_users");
      socket?.off("user_joined");
      socket?.off("user_left");
    };
  }, [socket, user]);

  return (
    <Container>
      <Header>
        <HeaderTitle>{t("header_title")}</HeaderTitle>
        <ParticipantCount>
          {t("participants_count", { count: totalParticipants })}
        </ParticipantCount>
      </Header>

      {focusedParticipant ? (
        <DirectCallContainer>
          <View
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <ControlButton
              onPress={closeFocusedParticipant}
              isActive
              style={{ width: 42, height: 42, borderRadius: 21 }}
            >
              <Feather name="x" size={20} color="#FFF" />
            </ControlButton>
          </View>

          <FullscreenCard activeOpacity={1}>
            {renderParticipantContent(focusedParticipant)}
          </FullscreenCard>

          <MiniCard
            activeOpacity={0.9}
            onPress={() => setIsLocalPrimary((prev) => !prev)}
          >
            {renderParticipantContent(localParticipant ?? participants[0])}
          </MiniCard>
        </DirectCallContainer>
      ) : isDirectCall && primaryParticipant && secondaryParticipant ? (
        <DirectCallContainer>
          <FullscreenCard activeOpacity={1}>
            {renderParticipantContent(primaryParticipant)}
          </FullscreenCard>

          <MiniCard
            activeOpacity={0.9}
            onPress={() => setIsLocalPrimary((prev) => !prev)}
          >
            {renderParticipantContent(secondaryParticipant)}
          </MiniCard>
        </DirectCallContainer>
      ) : (
        <GridContainer>
          {visibleParticipants.map((item) => (
            <ParticipantCard
              key={item.socketId}
              totalItems={displayedCardsCount}
            >
              {renderParticipantContent(item)}
            </ParticipantCard>
          ))}

          {hasMore && (
            <MoreCard
              totalItems={displayedCardsCount}
              onPress={() => setParticipantsModalVisible(true)}
              activeOpacity={0.7}
            >
              <MoreText>+{remainingCount}</MoreText>
              <MoreSubtext>Ver todos</MoreSubtext>
            </MoreCard>
          )}
        </GridContainer>
      )}

      <Modal
        visible={isParticipantsModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setParticipantsModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setParticipantsModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#000000a5",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "100%",
                  maxHeight: "80%",
                  backgroundColor: "#1F1F23",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: "#2E2E33",
                  }}
                >
                  <HeaderTitle style={{ fontSize: 18 }}>
                    {t("participants_modal.title")}
                  </HeaderTitle>
                  <ControlButton
                    onPress={() => setParticipantsModalVisible(false)}
                    isActive
                    style={{ width: 38, height: 38, borderRadius: 19 }}
                  >
                    <Feather name="x" size={20} color="#FFF" />
                  </ControlButton>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ padding: 12 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {participants.map((item) => (
                      <TouchableWithoutFeedback
                        key={item.socketId}
                        onPress={() => handleParticipantFocus(item)}
                      >
                        <View
                          style={{
                            width: "48%",
                            aspectRatio: 1.08,
                            backgroundColor: "#29292E",
                            borderRadius: 12,
                            overflow: "hidden",
                            marginBottom: 12,
                            position: "relative",
                          }}
                        >
                          {renderParticipantContent(item)}
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <CustomAlert
        title={callAlert.title}
        content={callAlert.content}
        visible={callAlert.visible}
        okButtonText={t("alert_ok")}
        okButtonAction={closeCallAlert}
        extraButton={false}
      />

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

        <ControlButton onPress={switchCamera} isActive={isVideoEnabled}>
          <MaterialCommunityIcons
            name="camera-switch-outline"
            size={22}
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
