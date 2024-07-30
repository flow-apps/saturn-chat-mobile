import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppState } from "@react-native-community/hooks";
import { ListRenderItem, Platform, TextInput } from "react-native";

import perf from "@react-native-firebase/perf";
import crashlytics from "@react-native-firebase/crashlytics";

import { ProgressBar } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Audio from "expo-av/build/Audio";
import { useTheme } from "styled-components";
import {
  FileData,
  GroupData,
  MessageData,
  ParticipantsData,
  UserData,
} from "@type/interfaces";
import { HeaderButton } from "@components/Header/styles";
import { useAuth } from "@contexts/auth";
import uuid from "react-native-uuid";

import * as MimeTypes from "react-native-mime-types";

import FormData from "form-data";
import Alert from "@components/Alert";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Message from "@components/Chat/Message";
import api from "@services/api";
import {
  AdBannerWrapper,
  AudioButton,
  AudioContainer,
  Container,
  FileSendedProgressContainer,
  FileSendedText,
  FormContainer,
  InputContainer,
  MessageContainer,
  MessageInput,
  OptionsButton,
  OptionsContainer,
  SendButton,
} from "./styles";
import Typing from "@components/Chat/Typing";
import RecordingAudio from "@components/Chat/RecordingAudio";
import LoadingIndicator from "@components/LoadingIndicator";
import SelectedFiles from "@components/Chat/SelectedFiles";
import { FileService, FileServiceErrors } from "@services/file";
import { RecordService } from "@services/record";

import analytics from "@react-native-firebase/analytics";
import { useRemoteConfigs } from "@contexts/remoteConfigs";
import { AnimatePresence, MotiView } from "moti";
import SimpleToast from "react-native-simple-toast";
import CurrentReplyingMessage from "@components/Chat/CurrentReplyingMessage";
import { ArrayUtils } from "@utils/array";
import { useWebsocket } from "@contexts/websocket";
import { useChat } from "@contexts/chat";

import FlashList from "@shopify/flash-list/dist/FlashList";
import { useAds } from "@contexts/ads";
import { OneSignal } from "react-native-onesignal";
import { TextInputRef, File } from "./types";
import { useTranslate } from "@hooks/useTranslate";
import { usePremium } from "@contexts/premium";
import Banner from "@components/Ads/Banner";
import { BannerAdSize } from "react-native-google-mobile-ads";

const recordService = new RecordService();

const Chat: React.FC = () => {
  const messageInputRef = useRef<TextInputRef>(null);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id, name, friendId } = route.params as {
    id: string;
    name?: string;
    friendId: string;
  };
  const arrayUtils = new ArrayUtils();

  const { colors } = useTheme();
  const { user } = useAuth();
  const { userConfigs } = useRemoteConfigs();

  const [isTypingMessage, setIsTypingMessage] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendedFileProgress, setSendedFileProgress] = useState(0);
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);
  const [typingUsers, setTypingUsers] = useState<UserData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const [replyingMessage, setReplyingMessage] = useState<MessageData>();

  const [audioPermission, setAudioPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState<Audio.Recording>();
  const [audioDuration, setAudioDuration] = useState(0);

  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>(
    {} as ParticipantsData
  );

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [fetchedAll, setFetchedAll] = useState(false);
  const fileService = new FileService(filesSizeUsed, userConfigs.fileUpload);

  const { socket } = useWebsocket();
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
  } = useChat();

  const appState = useAppState();
  const { t } = useTranslate("Chat");

  const configureSocketListeners = useCallback(() => {
    onSendedUserMessage(({ msg, localReference }) => {
      setOldMessages((old) =>
        arrayUtils.iterator(old, (m) =>
          m.localReference === localReference ? { ...msg, sended: true } : m
        )
      );
    });

    onNewUserMessage((msg) => {
      if (arrayUtils.has(oldMessages, (oldMsg) => oldMsg.id === msg.id)) return;

      setOldMessages((old) => [msg, ...old]);
      handleSetReadMessage(msg.id);
    });

    onNewUserTyping((newUser) => {
      if (
        newUser.id === user?.id ||
        arrayUtils.has(typingUsers, (tp) => tp.id === newUser.id)
      )
        return;

      setTypingUsers((old) => [...old, newUser]);
    });

    onDeletedUserTyping((removedUserID) => {
      const filteredUsers = arrayUtils.removeOne(
        typingUsers,
        (user) => user.id === removedUserID
      );
      setTypingUsers(filteredUsers);
    });

    onDeleteUserMessage(async (result) => {
      if (replyingMessage?.id === result.id) {
        setReplyingMessage(undefined);
      }

      setOldMessages((old) => old.filter((msg) => msg.id !== result.id));
    });
  }, [socket]);

  const handleTypingTimeout = () => {
    setIsTyping(false);
    handleSetTyping({ action: "REMOVE" });
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);

      handleSetTyping({ action: "ADD" });

      const timeout = setTimeout(handleTypingTimeout, 3000);

      setTypingTimeout(timeout);
      return;
    }
    clearTimeout(typingTimeout);
    const timeout = setTimeout(handleTypingTimeout, 3000);
    setTypingTimeout(timeout);
  };

  const recordAudio = async () => {
    const hasMessage = !!(messageInputRef.current.value || "");

    if (recordingAudio || hasMessage) return;

    try {
      const record = await recordService.start({
        onDurationUpdate(duration) {
          setAudioDuration(duration);
        },
      });

      if (record) {
        setRecordingAudio(record.recording);
      }
    } catch (error: any) {
      setRecordingAudio(undefined);
      new Error(error);
    }
  };

  const stopRecordAudioAndSubmit = async () => {
    if (!recordingAudio) return;

    try {
      setAudioDuration(0);
      setRecordingAudio(undefined);

      await recordService.finish({
        audio: recordingAudio,
        async onRecordFinish({ duration, audioURI, audioInfos, extension }) {
          SimpleToast.show(t("toasts.sending_voice"), SimpleToast.SHORT);

          const audioData = new FormData();
          const localReference = uuid.v4() as string;

          audioData.append("duration", duration);
          audioData.append("attachment", {
            uri: audioURI,
            name: `attachment_audio${extension}`,
            type: `audio/${extension.replace(".", "")}`,
          });

          setOldMessages((old) => [
            {
              id: localReference,
              author: user as UserData,
              group,
              message: "",
              participant,
              voice_message: {
                name: `attachment_audio_${localReference}${extension}`,
                duration,
                size: 0,
                url: audioInfos.uri,
              },
              files: [],
              sended: false,
              localReference,
              reply_to: replyingMessage,
              created_at: new Date().toISOString(),
            },
            ...old,
          ]);

          const sendedAudio = await api.post(
            `/messages/SendAttachment/${id}?type=voice_message`,
            audioData,
            {
              headers: {
                "Content-Type": `multipart/form-data`,
              },
            }
          );

          handleSendVoiceMessage({
            audio: sendedAudio.data,
            reply_to_id: replyingMessage?.id,
            message: "",
            localReference,
          });
          setReplyingMessage(undefined);
        },
      });
    } catch (error: any) {
      new Error(error);
    }
  };

  const handleFileSelector = async () => {
    const fileRes = await fileService.get();

    if (!fileRes.error) {
      const newFile = fileRes.selectedFile;
      const isSelected = arrayUtils.has(files, (f) => {
        return (
          f.file.uri === newFile.file.uri || f.file?.name === newFile.file.name
        );
      });

      if (isSelected) return setIsSelectedFile(true);
      if (fileRes.usageSize) setFilesSizeUsed(fileRes.usageSize);

      setFiles((oldFiles) => [
        { file: newFile.file, type: newFile.type },
        ...oldFiles,
      ]);

      return;
    }

    const errorType = fileRes.errorType;

    if (errorType === FileServiceErrors.FILE_SIZE_REACHED_LIMIT)
      return setLargeFile(true);
  };

  const removeFile = (position: number) => {
    const file = arrayUtils.findFirst(files, (f, index) => index === position);

    const fileSize = Math.trunc(file.file.size / 1000 / 1000);
    const filteredFiles = files.filter((f, index) => index !== position);
    setFiles(filteredFiles);
    setFilesSizeUsed((used) => used - fileSize);
  };

  const fetchOldMessages = async () => {
    if (fetching || fetchedAll) return;

    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=15`);

    if (data.messages.length === 0) {
      setFetching(false);
      setFetchedAll(true);
      return;
    }

    if (page > 0) {
      setOldMessages((old) => [...old, ...data.messages]);
    } else {
      setOldMessages(data.messages);
    }

    setPage((old) => old + 1);
    setFetching(false);
  };

  const handleSetMessage = (newMessage: string) => {
    if (newMessage.length >= userConfigs.messageLength) {
      return SimpleToast.show(
        t("limit_char", { count: userConfigs.messageLength }),
        SimpleToast.SHORT
      );
    }

    if (newMessage.length > 0 && !isTypingMessage) {
      setIsTypingMessage(true);
    } else if (newMessage.length <= 0 && isTypingMessage) {
      setIsTypingMessage(false);
    }

    messageInputRef.current.value = newMessage;
    handleTyping();
  };

  const handleGoGroupConfig = () => {
    navigation.navigate("GroupConfig", { id });
  };

  const handleGoGroupParticipants = () => {
    navigation.navigate("Participants", { id });
  };

  const handleGoGroupInfos = () => {
    navigation.navigate("GroupInfos", { id });
  };

  const handleGoFriendInfos = () => {
    navigation.navigate("UserProfile", { id: friendId });
  };

  const handleGoStar = async () => {
    await analytics().logEvent("IncreaseUpload");
    navigation.navigate("PurchasePremium");
  };

  const handleReplyMessage = async (message: MessageData) => {
    setReplyingMessage(message);
  };

  const handleRemoveReplyingMessage = async () => {
    setReplyingMessage(undefined);
  };

  const handleMessageSubmit = async () => {
    const messageRefValue = messageInputRef.current.value;
    const message = messageRefValue?.slice(0) || "";

    if (messageRefValue) {
      messageInputRef.current.clear();
      messageInputRef.current.value = "";
    }

    if (files.length === 0 && !message) return;

    const localReference = uuid.v4() as string;

    handleTypingTimeout();

    setOldMessages((old) => [
      {
        id: localReference,
        author: user as UserData,
        group,
        message,
        participant,
        files: files.map((file) => ({
          id: file.file.name,
          original_name: file.file.name,
          name: file.file.name,
          size: file.file.file?.size || 0,
          type: file.type,
          url: file.file.uri,
        })),
        sended: false,
        localReference,
        reply_to: replyingMessage,
        created_at: new Date().toISOString(),
      },
      ...old,
    ]);

    if (files.length === 0) {
      const trace = perf().newTrace("send_message_without_file");

      setIsTypingMessage(false);

      await trace.start();
      handleSendMessage({
        withFiles: false,
        reply_to_id: replyingMessage?.id,
        message,
        localReference,
      });

      if (replyingMessage) {
        setReplyingMessage(undefined);
      }
      await trace.stop();
    } else {
      setSendingFile(true);
      const filesData = new FormData();
      const trace = perf().newTrace("send_message_with_files");

      arrayUtils.iterator(files, (file) => {
        const type = MimeTypes.lookup(file.file.name);

        filesData.append("attachment", {
          name: file.file.name,
          uri: file.file.uri,
          type,
        });
      });

      filesData.append("message", message);
      if (replyingMessage) filesData.append("reply_to_id", replyingMessage?.id);

      await trace.start();

      await api
        .post(`messages/SendAttachment/${id}?type=files`, filesData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const totalSended = Math.round((event.loaded * 100) / event.total);
            setSendedFileProgress(totalSended);
          },
        })
        .then((res) => {
          if (res.status === 200) {
            handleSendMessage({
              message_id: res.data.message_id,
              withFiles: true,
              localReference,
            });
          }
        })
        .catch((error) => {
          crashlytics()?.recordError(new Error(error), "Send File Error");
          console.log(JSON.stringify(error));
        });

      await trace.stop();

      setFiles([]);
      setSendingFile(false);
      setSendedFileProgress(0);
      setFilesSizeUsed(0);
    }

    if (replyingMessage) {
      setReplyingMessage(undefined);
    }
  };

  const renderMessage = useCallback(
    ({ item, index }: ListRenderItem<MessageData> | any) => {
      const lastMessage = index !== 0 ? oldMessages[index - 1] : null;

      return (
        <Message
          message={item}
          participant={participant as ParticipantsData}
          lastMessage={lastMessage}
          onReplyMessage={handleReplyMessage}
        />
      );
    },
    [oldMessages.length]
  );

  const renderFooter = () =>
    fetching && !fetchedAll ? <LoadingIndicator /> : <></>;

  const disableLargeFile = () => setLargeFile(false);
  const disableIsSelectedFile = () => setIsSelectedFile(false);
  const disableAudioPermission = () => setAudioPermission(false);

  useEffect(() => {
    (async () => {
      if (appState === "active") {
        setLoading(true);
        handleJoinRoom(id);

        if (page > 0) {
          setPage(0);
        }
  
        if (fetchedAll) {
          setFetchedAll(false);
        }
  
        await fetchOldMessages();
        setLoading(false);
      }
    })()

    return () => {
      if (socket) {
        socket.emit("leave_chat");
        socket.offAny();
        handleTypingTimeout();
      }
    };
  }, [appState, socket]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (Platform.OS === "android") {
        OneSignal.Notifications.removeGroupedNotifications(id);
      }

      if (!group.id) {
        const groupRes = await api.get(`/group/${id}`);

        if (groupRes.status === 200) {
          setGroup(groupRes.data);
        }
      }

      await fetchOldMessages();

      setPage(0);
      setLoading(false);
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      const participantRes = await api.get(`/group/participant/${id}`);
      if (participantRes.status === 200)
        setParticipant(participantRes.data.participant);

      configureSocketListeners();

      setLoading(false);
    })();
  }, []);

  if (loading || !socket || !connected) return <Loading />;

  return (
    <>
      <Alert
        title={t("alerts.file_size.title")}
        content={t("alerts.file_size.content", {
          amount: userConfigs.fileUpload,
        })}
        okButtonAction={disableLargeFile}
        extraButtonAction={handleGoStar}
        extraButtonText={t("alerts.file_size.extra_button_text")}
        extraButton
        visible={largeFile}
      />
      <Alert
        title={t("alerts.same_file.title")}
        content={t("alerts.same_file.content")}
        okButtonAction={disableIsSelectedFile}
        visible={isSelectedFile}
      />
      <Alert
        title={t("alerts.mic_perm.title")}
        content={t("alerts.mic_perm.content")}
        okButtonAction={disableAudioPermission}
        visible={audioPermission}
      />
      <Header
        title={name || group.name}
        onPressTitle={
          group.type === "GROUP" ? handleGoGroupInfos : handleGoFriendInfos
        }
      >
        {group.type === "GROUP" && (
          <HeaderButton onPress={handleGoGroupParticipants}>
            <Feather name="users" size={22} color="#fff" />
          </HeaderButton>
        )}
        {group.type === "GROUP" && (
          <HeaderButton onPress={handleGoGroupConfig}>
            <Feather name="more-vertical" size={22} color="#fff" />
          </HeaderButton>
        )}
      </Header>
      <AdBannerWrapper>
        <Banner />
      </AdBannerWrapper>

      <Container>
        <Typing typingUsers={typingUsers} />
        <MessageContainer>
          <FlashList
            data={oldMessages}
            extraData={oldMessages.length}
            keyExtractor={(item) => item.id}
            viewabilityConfig={{
              minimumViewTime: 500,
            }}
            drawDistance={15 * 120}
            estimatedItemSize={120}
            renderItem={renderMessage}
            ListFooterComponent={renderFooter}
            onEndReached={fetchOldMessages}
            onEndReachedThreshold={0.4}
            showsVerticalScrollIndicator={false}
            disableHorizontalListHeightMeasurement
          />
        </MessageContainer>
        <FormContainer>
          <AnimatePresence>
            {recordingAudio && (
              <MotiView
                from={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 40 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "timing",
                  duration: 250,
                }}
              >
                <RecordingAudio audioDuration={audioDuration} />
              </MotiView>
            )}
          </AnimatePresence>

          {files.length > 0 && !sendingFile && (
            <SelectedFiles files={files} onFileRemove={removeFile} />
          )}

          {sendingFile && (
            <FileSendedProgressContainer>
              <FileSendedText>
                <Feather name="upload" size={16} /> {sendedFileProgress}%{" "}
                {t("sent")}
              </FileSendedText>
              <ProgressBar
                progress={sendedFileProgress / 100}
                color={colors.primary}
                style={{ minWidth: "100%", height: 10, borderRadius: 10 }}
              />
            </FileSendedProgressContainer>
          )}

          <AnimatePresence>
            {replyingMessage && (
              <CurrentReplyingMessage
                message={replyingMessage}
                onRemoveReplying={handleRemoveReplyingMessage}
              />
            )}
          </AnimatePresence>

          <InputContainer>
            <MessageInput
              ref={messageInputRef}
              as={TextInput}
              cursorColor={colors.secondary}
              placeholderTextColor={colors.dark_heading}
              onChangeText={handleSetMessage}
              maxLength={userConfigs?.messageLength || 500}
              placeholder={recordingAudio ? t("drop_send") : t("type_message")}
            />
            <OptionsContainer>
              <OptionsButton onPress={handleFileSelector}>
                <Feather name="file" size={24} color={colors.primary} />
              </OptionsButton>
              {(isTypingMessage || files.length > 0) && (
                <SendButton>
                  <Feather
                    name="send"
                    size={26}
                    color={colors.primary}
                    onPress={handleMessageSubmit}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </SendButton>
              )}
              {!isTypingMessage && files.length <= 0 && (
                <AudioContainer>
                  <AudioButton
                    onPressIn={recordAudio}
                    onPressOut={stopRecordAudioAndSubmit}
                  >
                    <Feather name="mic" size={26} color={colors.secondary} />
                  </AudioButton>
                </AudioContainer>
              )}
            </OptionsContainer>
          </InputContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default Chat;
