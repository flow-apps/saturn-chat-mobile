import React, { useCallback, useEffect, useState } from "react";
import { Keyboard, Platform, KeyboardAvoidingView } from "react-native";
import { useAppState } from "@react-native-community/hooks";
import { useRoute } from "@react-navigation/core";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlashList } from "@shopify/flash-list";
import Feather from "@expo/vector-icons/Feather";
import uuid from "react-native-uuid";
import * as MimeTypes from "react-native-mime-types";
import FormData from "form-data";
import crashlytics from "@react-native-firebase/crashlytics";
import analytics from "@react-native-firebase/analytics";
import _ from "lodash";

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
import { ChatInput } from "@components/ChatInput";
import { Container, MessageContainer } from "./styles";

const MESSAGES_LIMIT_REQUEST = 50;

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
  const appState = useAppState();
  const { t } = useTranslate("Chat");

  // Custom Hooks
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
  const { isRecording, audioDuration, recordAudio, stopRecordAudioAndSubmit } =
    useChatAudio((dur, uri) => handleSendVoice(dur, uri));

  // Estados locais da tela
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
    onSendedUserMessage(({ msg, localReference }) =>
      setOldMessages(
        (old) =>
          arrayUtils.iterator(old, (m) =>
            m.localReference === localReference ? { ...msg, sended: true } : m,
          ) || old,
      ),
    );
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
  }, [socket, oldMessages, typingUsers, replyingMessage, sortMessages]);

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

  useFocusEffect(
    useCallback(() => {
      if (appState === "active" && socket && !connected) {
        handleJoinRoom(id);
        configureSocketListeners();
      }
    }, [connected, socket, appState]),
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
        <Container style={{ flex: 1 }}>
          <Typing typingUsers={typingUsers} />
          <MessageContainer style={{ flex: 1 }}>
            <FlashList
              data={oldMessages}
              extraData={oldMessages}
              // @ts-ignore
              keyExtractor={(item) => item.id || item.localReference}
              drawDistance={MESSAGES_LIMIT_REQUEST * 160}
              estimatedItemSize={200}
              renderItem={({ item, index }) => (
                <Message
                  message={item}
                  participant={participant}
                  lastMessage={index !== 0 ? oldMessages[index - 1] : null}
                  onReplyMessage={setReplyingMessage}
                  group={group}
                  disableReply={!canSendMessage}
                  participants={participants}
                />
              )}
              ListFooterComponent={() =>
                fetching && !fetchedAll ? <LoadingIndicator /> : null
              }
              onEndReached={fetchOldMessages}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              disableHorizontalListHeightMeasurement
            />
          </MessageContainer>

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
            onFileSelect={handleFileSelector}
            onRemoveFile={(idx) => setFiles(files.filter((_, i) => i !== idx))}
            onRemoveReplying={() => setReplyingMessage(undefined)}
            onTyping={() => handleSetTyping({ action: "ADD" })}
            onTypingTimeout={() => handleSetTyping({ action: "REMOVE" })}
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
