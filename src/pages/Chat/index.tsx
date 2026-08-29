import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useAppState } from "@react-native-community/hooks";
import { useRoute } from "@react-navigation/core";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import Feather from "@expo/vector-icons/Feather";
import uuid from "react-native-uuid";
import * as MimeTypes from "react-native-mime-types";
import FormData from "form-data";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import _ from "lodash";
import { MotiView, AnimatePresence } from "moti";
import { useTheme } from "styled-components/native";

import {
  GroupData,
  MessageData,
  ParticipantsData,
  UserData,
} from "@type/interfaces";
import { ParticipantRoles } from "@type/enums";
import { HeaderButton } from "@components/Header/styles";
import Alert from "@components/Alert";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Message from "@components/Chat/Message";
import Typing from "@components/Chat/Typing";
import LoadingIndicator from "@components/LoadingIndicator";

import api from "@services/api";
import { FileService, FileServiceErrors } from "@services/file";
import { useAuth } from "@contexts/auth";
import { useRemoteConfigs } from "@contexts/remoteConfigs";
import { useWebsocket } from "@contexts/websocket";
import { useChat } from "@contexts/chat";
import { useTranslate } from "@hooks/useTranslate";
import { ArrayUtils } from "@utils/array";
import { getSettingValue } from "@utils/settings";
import { OneSignal } from "@configs/notifications";

import { File, ordernedRolesArray } from "./types";
import { useChatMessages } from "@hooks/useChatMessages";
import { useChatAudio } from "@hooks/useChatAudio";
import { ChatInput } from "@components/Chat/ChatInput";
import { Container, MessageContainer } from "./styles";
import { PollModal } from "@components/Chat/PollModal";

const MESSAGES_LIMIT_REQUEST = 50;

const AnimatedMessage: React.FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const delay = Math.min(index * 40, 320);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 250,
        delay,
      }}
    >
      {children}
    </MotiView>
  );
};

const Chat: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id, name, friendId } = route.params as {
    id: string;
    name?: string;
    friendId: string;
  };

  const arrayUtils = new ArrayUtils();
  const insets = useSafeAreaInsets();
  const headerHeight = getStatusBarHeight();
  const { user } = useAuth();
  const { userConfigs } = useRemoteConfigs();
  const { socket } = useWebsocket();
  const { colors } = useTheme();
  const appState = useAppState();
  const { t } = useTranslate("Chat");

  const flashListRef = useRef<FlashList<MessageData>>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const {
    oldMessages,
    setOldMessages,
    fetching,
    fetchedAll,
    fetchOldMessages,
    sortMessages,
    setFetchedAll,
    setPage,
  } = useChatMessages(id);
  const {
    isRecording,
    audioDuration,
    recordAudio,
    stopRecordAudioAndSubmit,
    cancelRecordAudio,
  } = useChatAudio((dur, uri) => handleSendVoice(dur, uri));

  const [isPollModalVisible, setIsPollModalVisible] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendedFileProgress, setSendedFileProgress] = useState(0);
  const [typingUsers, setTypingUsers] = useState<UserData[]>([]);
  const [replyingMessage, setReplyingMessage] = useState<MessageData>();
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>(
    {} as ParticipantsData,
  );
  const [participants, setParticipants] = useState<ParticipantsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const prevAppState = useRef(appState);

  const fileService = new FileService(filesSizeUsed, userConfigs.fileUpload);
  const {
    handleJoinRoom,
    handleSetReadMessage,
    handleSetTyping,
    handleSendMessage,
    handleSendVoiceMessage,
    onSendedUserMessage,
    onNewUserMessage,
    onNewUserTyping,
    onDeletedUserTyping,
    onDeleteUserMessage,
    connected,
    currentGroupId,
  } = useChat();

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setIsKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setIsKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToBottom(offsetY > 300);
  };

  const scrollToBottom = () => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleCreatePoll = useCallback(
    (pollData: {
      question: string;
      options: string[];
      allows_multiple: boolean;
    }) => {
      if (id !== currentGroupId || !connected) return;

      const localReference = uuid.v4() as string;

      const optimisticPollMessage: MessageData = {
        id: localReference,
        localReference,
        author: user as UserData,
        group,
        participant,
        message: "",
        sended: false,
        created_at: new Date().toISOString(),
        poll: {
          id: `temp_poll_${localReference}`,
          message_id: localReference,
          question: pollData.question,
          allows_multiple: pollData.allows_multiple,
          options: pollData.options.map((optText, index) => ({
            id: `temp_opt_${index}_${localReference}`,
            poll_id: `temp_poll_${localReference}`,
            option_text: optText,
            votes_count: 0,
            votes: [],
            created_at: new Date().toISOString(),
          })),
          created_at: new Date().toISOString(),
        } as any,
      };

      setOldMessages((old) =>
        sortMessages(_.uniqBy([optimisticPollMessage, ...old], "id")),
      );

      socket?.emit("new_poll", {
        group_id: id,
        question: pollData.question,
        options: pollData.options,
        allows_multiple: pollData.allows_multiple,
        reply_to_id: replyingMessage?.id,
        localReference,
      });

      setReplyingMessage(undefined);
    },
    [
      id,
      currentGroupId,
      connected,
      socket,
      replyingMessage,
      user,
      group,
      participant,
      sortMessages,
    ],
  );

  const buildOptimisticMessage = useCallback(
    (data: Partial<MessageData> & { localReference: string }): MessageData => ({
      id: data.id || data.localReference,
      author: user as UserData,
      group,
      participant,
      message: data.message || "",
      files: data.files || [],
      voice_message: data.voice_message,
      sended: false,
      localReference: data.localReference,
      reply_to: data.reply_to,
      mentions: data.mentions,
      created_at: new Date().toISOString(),
    }),
    [group, participant, user],
  );

  const configureSocketListeners = useCallback(() => {
    onSendedUserMessage(({ msg, localReference }) => {
      setOldMessages((old) =>
        old.map((m) => {
          if (
            (m.localReference && m.localReference === localReference) ||
            m.id === localReference
          ) {
            return {
              ...msg,
              sended: true,
            };
          }
          return m;
        }),
      );
    });

    onNewUserMessage((msg) => {
      if (arrayUtils.has(oldMessages, (m) => m.id === msg.id)) return;
      setOldMessages((old) => sortMessages(_.uniqBy([msg, ...old], "id")));
      handleSetReadMessage(msg.id);
    });

    onNewUserTyping((newUser) => {
      if (
        newUser.id !== user?.id &&
        !arrayUtils.has(typingUsers, (u) => u.id === newUser.id)
      )
        setTypingUsers((old) => [...old, newUser]);
    });

    onDeletedUserTyping((removedId) =>
      setTypingUsers(
        (old) => arrayUtils.removeOne(old, (u) => u.id === removedId) || [],
      ),
    );

    onDeleteUserMessage((res) => {
      if (replyingMessage?.id === res.id) setReplyingMessage(undefined);
      setOldMessages((old) => old.filter((m) => m.id !== res.id));
    });
  }, [
    socket,
    oldMessages,
    typingUsers,
    replyingMessage,
    sortMessages,
    onSendedUserMessage,
  ]);

  const handleSendVoice = async (duration: number, uri: string) => {
    try {
      const localReference = uuid.v4() as string;
      const audioData = new FormData();
      audioData.append("duration", duration);
      audioData.append("attachment", {
        uri,
        name: `attachment_audio.m4a`,
        type: "audio/mp4",
      });

      const optimisticAudio = buildOptimisticMessage({
        localReference,
        voice_message: {
          name: `attachment_audio_${localReference}.m4a`,
          duration,
          size: 0,
          url: uri,
        },
        reply_to: replyingMessage,
      });

      setOldMessages((old) =>
        sortMessages(_.uniqBy([optimisticAudio, ...old], "id")),
      );
      const res = await api.post(
        `/messages/SendAttachment/${id}?type=voice_message`,
        audioData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setOldMessages(
        (old) =>
          arrayUtils.iterator(old, (m) =>
            m.localReference === localReference
              ? {
                  ...m,
                  voice_message: res.data?.voice_message ?? res.data,
                  sended: true,
                }
              : m,
          ) || old,
      );
      handleSendVoiceMessage({
        audio: res.data,
        reply_to_id: replyingMessage?.id ?? "",
        message: "",
        localReference,
      });
      setReplyingMessage(undefined);
    } catch (error) {
      crashlytics().recordError(error as Error, "Send Voice Message Error");
    }
  };

  const handleFileSelector = async () => {
    const res = await fileService.get();
    if (!res.error && res.selectedFile) {
      if (
        arrayUtils.has(files, (f) => f.file.uri === res.selectedFile.file.uri)
      )
        return setIsSelectedFile(true);
      if (res.usageSize) setFilesSizeUsed(res.usageSize);
      setFiles((old) => [
        { file: res.selectedFile.file, type: res.selectedFile.type },
        ...old,
      ]);
    } else if (res.errorType === FileServiceErrors.FILE_SIZE_REACHED_LIMIT) {
      setLargeFile(true);
    }
  };

  const fetchParticipantAndGroup = useCallback(async () => {
    setLoading(true);
    try {
      const [pRes, mRes, listRes] = await Promise.all([
        api.get(`/group/participant/${id}`),
        api.get(`/messages/${id}?_page=0&_limit=${MESSAGES_LIMIT_REQUEST}`),
        api.get(`/group/participants/list/?group_id=${id}&_limit=200`),
      ]);
      if (pRes.status === 200) {
        setParticipant(pRes.data.participant);
        setGroup(pRes.data.participant.group);
      }
      if (listRes.status === 200) setParticipants(listRes.data);
      if (Platform.OS === "android")
        OneSignal.Notifications.removeGroupedNotifications(id);

      if (mRes.data.messages.length < MESSAGES_LIMIT_REQUEST)
        setFetchedAll(true);
      // @ts-ignore
      setOldMessages(sortMessages(_.uniqBy(mRes.data.messages, "id")));
      setPage(1);
    } catch (error) {
      crashlytics().recordError(
        error as Error,
        "Chat: fetchParticipantAndGroup",
      );
    } finally {
      setLoading(false);
    }
  }, [id, sortMessages]);

  const handleMessageSubmit = async (
    message: string,
    selectedFiles: File[],
    mentionIds: string[],
  ) => {
    if (id !== currentGroupId || !connected) return;
    const localReference = uuid.v4() as string;

    const optimisticMsg = buildOptimisticMessage({
      localReference,
      message,
      files: selectedFiles.map((f) => ({
        id: f.file.name,
        original_name: f.file.name,
        name: f.file.name,
        size: f.file.file?.size || 0,
        type: f.type,
        url: f.file.uri,
      })),
      reply_to: replyingMessage,
      mentions: mentionIds,
    });

    setOldMessages((old) =>
      sortMessages(_.uniqBy([optimisticMsg, ...old], "id")),
    );

    if (selectedFiles.length === 0) {
      handleSendMessage({
        withFiles: false,
        reply_to_id: replyingMessage?.id,
        message,
        localReference,
        mentions: mentionIds,
      });
    } else {
      setSendingFile(true);
      const filesData = new FormData();
      selectedFiles.forEach((f) =>
        filesData.append("attachment", {
          name: f.file.name,
          uri: f.file.uri,
          type: MimeTypes.lookup(f.file.name),
        }),
      );
      filesData.append("message", message);
      if (replyingMessage) filesData.append("reply_to_id", replyingMessage.id);
      if (mentionIds.length > 0)
        filesData.append("mentions", JSON.stringify(mentionIds));

      try {
        const res = await api.post(
          `messages/SendAttachment/${id}?type=files`,
          filesData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) =>
              setSendedFileProgress(
                Math.round((e.loaded * 100) / (e.total || 1)),
              ),
          },
        );
        if (res.status === 200)
          handleSendMessage({
            message_id: res.data.message_id,
            message,
            withFiles: true,
            localReference,
            mentions: mentionIds,
          });
      } catch (error) {
        crashlytics().recordError(
          new Error(error as string),
          "Send File Error",
        );
      } finally {
        setFiles([]);
        setSendingFile(false);
        setSendedFileProgress(0);
        setFilesSizeUsed(0);
      }
    }
    setReplyingMessage(undefined);
  };

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<MessageData>) => (
      // @ts-ignore
      <AnimatedMessage index={index} messageId={item.id || item.localReference}>
        <Message
          message={item}
          participant={participant}
          lastMessage={index !== 0 ? oldMessages[index - 1] : null}
          onReplyMessage={setReplyingMessage}
          group={group}
          disableReply={!canSendMessage}
          participants={participants}
        />
      </AnimatedMessage>
    ),
    [oldMessages, participant, group, canSendMessage, participants],
  );

  useEffect(() => {
    if (currentGroupId !== id && connected) handleJoinRoom(id);
    return () => {
      socket?.emit("leave_chat");
      socket?.offAny();
    };
  }, [id]);

  useEffect(() => {
    if (group?.id !== currentGroupId) fetchParticipantAndGroup();
  }, [currentGroupId]);

  useEffect(() => {
    if (!participant || !group) return;
    if (participant.role === ParticipantRoles.OWNER)
      return setCanSendMessage(true);
    const pRoleIdx = ordernedRolesArray.indexOf(participant.role);
    const minRoleIdx = ordernedRolesArray.indexOf(
      getSettingValue(group.group_settings, "minimum_role_for_send_message"),
    );
    setCanSendMessage(pRoleIdx >= minRoleIdx);
  }, [participant, group]);

  useEffect(() => {
    const appCameToForeground =
      prevAppState.current.match(/inactive|background/) &&
      appState === "active";

    if (appCameToForeground) {
      console.log("App voltou para primeiro plano. Sincronizando chat...");

      // Refaz o fetch APENAS no momento exato em que o app abre para recuperar mensagens
      if (group?.id === id) {
        fetchParticipantAndGroup();
      }

      // Garante que o socket reconecte na sala
      if (socket && !connected) {
        handleJoinRoom(id);
        configureSocketListeners();
      }
    }

    // Atualiza a referência para a próxima verificação
    prevAppState.current = appState;
  }, [
    appState,
    group?.id,
    id,
    connected,
    socket,
    handleJoinRoom,
    configureSocketListeners,
    fetchParticipantAndGroup,
  ]);

  useFocusEffect(
    useCallback(() => {
      if (appState === "active" && socket && !connected) {
        handleJoinRoom(id);
        configureSocketListeners();
      }
    }, [
      connected,
      socket,
      appState,
      handleJoinRoom,
      configureSocketListeners,
      id,
    ]),
  );

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom", "left", "right"]}>
      <Alert
        title={t("alerts.file_size.title")}
        content={t("alerts.file_size.content", {
          amount: userConfigs.fileUpload,
        })}
        okButtonAction={() => setLargeFile(false)}
        extraButtonAction={() => {
          analytics().logEvent("IncreaseUpload");
          navigation.navigate("PurchasePremium");
        }}
        extraButtonText={t("alerts.file_size.extra_button_text")}
        extraButton
        visible={largeFile}
      />
      <Alert
        title={t("alerts.same_file.title")}
        content={t("alerts.same_file.content")}
        okButtonAction={() => setIsSelectedFile(false)}
        visible={isSelectedFile}
      />

      <PollModal
        visible={isPollModalVisible}
        onClose={() => setIsPollModalVisible(false)}
        onSubmit={handleCreatePoll}
      />

      <Header
        title={name || group.name}
        onPressTitle={
          group.type === "GROUP"
            ? () => navigation.navigate("GroupInfos", { id })
            : () => navigation.navigate("UserProfile", { id: friendId })
        }
      >
        {group.type === "GROUP" && (
          <HeaderButton
            onPress={() => navigation.navigate("Participants", { id })}
          >
            <Feather name="users" size={22} color="#fff" />
          </HeaderButton>
        )}
        <HeaderButton
          onPress={() => navigation.navigate("GroupConfig", { id })}
        >
          <Feather name="more-vertical" size={22} color="#fff" />
        </HeaderButton>
      </Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
      >
        <Container style={{ flex: 1, position: "relative" }}>
          <Typing typingUsers={typingUsers} />
          <MessageContainer style={{ flex: 1 }}>
            <FlashList
              ref={flashListRef}
              data={oldMessages}
              extraData={oldMessages.length}
              keyExtractor={(item) => item.id || item.localReference || ""}
              drawDistance={MESSAGES_LIMIT_REQUEST * 160}
              estimatedItemSize={200}
              renderItem={renderItem}
              ListFooterComponent={() =>
                fetching && !fetchedAll ? <LoadingIndicator /> : null
              }
              onEndReached={fetchOldMessages}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              disableHorizontalListHeightMeasurement
              onScroll={handleScroll}
            />
          </MessageContainer>

          <AnimatePresence>
            {showScrollToBottom && (
              <MotiView
                from={{ opacity: 0, scale: 0.8, translateY: 10 }}
                animate={{ opacity: 1, scale: 1, translateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, translateY: 10 }}
                transition={{ type: "timing", duration: 200 }}
                style={{
                  position: "absolute",
                  right: 16,
                  bottom: isKeyboardVisible ? 80 : 70,
                  zIndex: 99,
                }}
              >
                <TouchableOpacity
                  onPress={scrollToBottom}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: colors.primary || "#0084ff",
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    justifyContent: "center",
                    alignItems: "center",
                    elevation: 4,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    marginBottom: 15,
                  }}
                >
                  <Feather name="chevron-down" size={24} color="#FFF" />
                </TouchableOpacity>
              </MotiView>
            )}
          </AnimatePresence>

          <ChatInput
            groupId={id}
            canSendMessage={canSendMessage}
            maxMessageLength={userConfigs?.messageLength || 500}
            replyingMessage={replyingMessage}
            sendingFile={sendingFile}
            sendedFileProgress={sendedFileProgress}
            isRecording={isRecording}
            audioDuration={audioDuration}
            onSendMessage={handleMessageSubmit}
            onRecordAudioStart={(hasText) => recordAudio(hasText)}
            onRecordAudioStop={stopRecordAudioAndSubmit}
            onRecordAudioCancel={cancelRecordAudio}
            onFileSelect={handleFileSelector}
            onRemoveFile={(idx) => setFiles(files.filter((_, i) => i !== idx))}
            onRemoveReplying={() => setReplyingMessage(undefined)}
            onTyping={() => handleSetTyping({ action: "ADD" })}
            onTypingTimeout={() => handleSetTyping({ action: "REMOVE" })}
            onOpenPollModal={() => setIsPollModalVisible(true)}
            files={files}
            insetsBottom={insets.bottom}
            isKeyboardVisible={isKeyboardVisible}
          />
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
