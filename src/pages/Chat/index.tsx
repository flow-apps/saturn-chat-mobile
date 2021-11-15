import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
} from "react-native";

import EmojiJS from "emoji-js";
import perf from "@react-native-firebase/perf";
import crashlytics from "@react-native-firebase/crashlytics";

import { ProgressBar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import {
  GroupData,
  MessageData,
  ParticipantsData,
  UserData,
} from "../../../@types/interfaces";
import { HeaderButton } from "../../components/Header/styles";
import { useAuth } from "../../contexts/auth";
import uuid from "react-native-uuid";

import * as DocumentPicker from "expo-document-picker";
import * as MimeTypes from "react-native-mime-types";

import FormData from "form-data";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Message from "../../components/Chat/Message";
import api from "../../services/api";
import {
  AudioButton,
  AudioContainer,
  Container,
  FileSendedProgressContainer,
  FileSendedText,
  FormContainer,
  InputContainer,
  MessageContainer,
  MessageInput,
  Messages,
  OptionsButton,
  OptionsContainer,
  ReplyingMessage,
  ReplyingMessageAuthorName,
  ReplyingMessageAuthorNameWrapper,
  ReplyingMessageContainer,
  ReplyingMessageContentContainer,
  ReplyingMessageRemoveButton,
  ReplyingMessageRemoveContainer,
  ReplyingMessageTitle,
  ReplyingMessageTitleWrapper,
  ReplyingMessageWrapper,
  SendButton,
} from "./styles";
import Typing from "../../components/Chat/Typing";
import RecordingAudio from "../../components/Chat/RecordingAudio";
import LoadingIndicator from "../../components/LoadingIndicator";
import SelectedFiles from "../../components/Chat/SelectedFiles";
import { FileService, FileServiceErrors } from "../../services/file";
import { RecordService } from "../../services/record";

import { getWebsocket } from "../../services/websocket";
import { useAds } from "../../contexts/ads";
import { useFirebase } from "../../contexts/firebase";
import { useRemoteConfigs } from "../../contexts/remoteConfigs";
import { MotiView, useAnimationState } from "moti";

const emoji = new EmojiJS();

interface File {
  file: DocumentPicker.DocumentResult;
  type: string;
}

const recordService = new RecordService();

const Chat: React.FC = () => {
  const messageInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: string };

  const { Interstitial } = useAds();
  const { analytics } = useFirebase();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { userConfigs } = useRemoteConfigs();

  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendedFileProgress, setSendedFileProgress] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);
  const [typingUsers, setTypingUsers] = useState<UserData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number>();

  const [audioPermission, setAudioPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState<Audio.Recording>();
  const [audioDuration, setAudioDuration] = useState(0);

  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>();
  const [socket, setSocket] = useState<Socket>(getWebsocket());

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(false);
  const fileService = new FileService(filesSizeUsed, userConfigs.fileUpload);

  const toggleAnimationRecordingAudioState = useAnimationState({
    recording: {
      opacity: 1,
      translationY: 0,
    },
    stopped: {
      opacity: 0,
      translationY: 20,
    },
  });

  const toggleAnimationTypingState = useAnimationState({
    typing: {
      opacity: 1,
      height: 40,
    },
    stopTyping: {
      opacity: 0,
      height: 0,
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const isReady = await Interstitial.getIsReadyAsync();
      if (isReady) await Interstitial.showAdAsync();

      const connectedSocket = socket || getWebsocket();

      connectedSocket.emit("connect_in_chat", id);
      connectedSocket.on("connect", () => {
        setSocket(connectedSocket);
      });

      const groupRes = await api.get(`/group/${id}`);
      const participantRes = await api.get(`/group/participant/${id}`);

      if (groupRes.status === 200) setGroup(groupRes.data);
      if (participantRes.status === 200) {
        setParticipant(participantRes.data.participant);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    fetchOldMessages();
  }, []);

  useEffect(() => {
    connectSockets();
  }, [socket]);

  const connectSockets = useCallback(() => {
    if (!socket) return;

    socket.on("sended_user_message", ({ msg, localReference }) => {
      setOldMessages((old) =>
        old.map((m) =>
          m.localReference === localReference ? { ...msg, sended: true } : m
        )
      );
    });
    socket.on("new_user_message", (msg) => {
      setOldMessages((old) => [msg, ...old]);
      socket.emit("set_read_message", msg.id);
    });

    socket.on("new_user_typing", (user: UserData) => {
      setTypingUsers((old) => [...old, user]);
    });

    socket.on("deleted_user_typing", (userID) => {
      const filteredUsers = typingUsers.filter((tu) => tu.id !== userID);
      setTypingUsers(filteredUsers);
    });

    socket.on("delete_user_message", (msgID) => {
      setOldMessages((old) => old.filter((msg) => msg.id !== msgID));
    });

    socket.on("deleted_group", (groupID) => {
      if (route.name === "Chat") navigation.navigate("Groups");
    });

    navigation.addListener("blur", () => {
      socket.emit("leave_chat");
      socket.offAny();
    });
  }, [socket]);

  const handleTypingTimeout = () => {
    toggleAnimationTypingState.transitionTo("stopTyping");
    setIsTyping(false);
    socket?.emit("remove_user_typing", { typing: false, userID: user?.id });
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      toggleAnimationTypingState.transitionTo("typing");

      socket?.emit("add_user_typing", { typing: true });
      const timeout = setTimeout(handleTypingTimeout, 5000);

      setTypingTimeout(timeout);
      return;
    }
    clearTimeout(typingTimeout);
    const timeout = setTimeout(handleTypingTimeout, 5000);
    setTypingTimeout(timeout);
  };

  const recordAudio = async () => {
    if (recordingAudio) return;

    try {
      const record = await recordService.start({
        onDurationUpdate(duration) {
          setAudioDuration(duration);
        },
      });

      if (record) {
        setRecordingAudio(record.recording);
      }
      toggleAnimationRecordingAudioState.transitionTo("recording");
    } catch (error: any) {
      setRecordingAudio(undefined);
      new Error(error);
    }
  };

  const stopRecordAudio = async () => {
    try {
      toggleAnimationRecordingAudioState.transitionTo("stopped");
      if (!recordingAudio) return;

      await recordService.finish({
        audio: recordingAudio,
        async onRecordFinish({ duration, audioURI, audioInfos, extension }) {
          setRecordingAudio(undefined);
          setAudioDuration(0);

          const audioData = new FormData();
          const localReference = uuid.v4() as string;

          audioData.append("duration", duration);
          audioData.append("size", audioInfos.size);
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
              message,
              voice_message: {
                duration,
                size: Number(audioInfos.size),
                url: audioInfos.uri,
              },
              files: [],
              sended: false,
              localReference,
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

          socket?.emit("new_voice_message", {
            audio: sendedAudio.data,
            message,
            localReference,
          });
        },
      });
    } catch (error: any) {
      new Error(error);
    }
  };

  const fetchOldMessages = async () => {
    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=40`);

    if (data.messages.length === 0) {
      setFetching(false);
      return setFetchedAll(true);
    }

    if (page > 0) {
      setOldMessages((old) => [...old, ...data.messages]);
    } else {
      setOldMessages(data.messages);
    }

    setFetching(false);
  };

  const handleFileSelector = async () => {
    const fileRes = await fileService.get();

    if (!fileRes.error) {
      if (fileRes.selectedFile?.file.type !== "success") return;

      const file = fileRes.selectedFile;
      const isSelected = files.find(
        (f) =>
          f.file.type !== "cancel" &&
          f.file.name === file.file.name &&
          f.file.lastModified === f.file.lastModified
      );

      if (isSelected) return setIsSelectedFile(true);
      if (fileRes.usageSize) setFilesSizeUsed(fileRes.usageSize);

      setFiles((oldFiles) => [
        { file: file.file, type: file.type },
        ...oldFiles,
      ]);

      return;
    }

    const errorType = fileRes.errorType;

    if (errorType === FileServiceErrors.FILE_SIZE_REACHED_LIMIT)
      return setLargeFile(true);
  };

  const removeFile = (position: number) => {
    const file = files.filter((f, index) => index === position).shift();

    if (file?.file.type !== "success") return;

    const fileSize = Math.trunc(file.file.size / 1000 / 1000);
    const filteredFiles = files.filter((f, index) => index !== position);
    setFiles(filteredFiles);
    setFilesSizeUsed((used) => used - fileSize);
  };

  const handleFetchMoreMessages = async (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    if (fetchedAll) return;

    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 5;
    const listHeight = layoutMeasurement.height + contentOffset.y;

    if (listHeight >= contentSize.height - paddingToBottom) {
      if (!fetching) {
        setPage((old) => old + 1);
        await fetchOldMessages();
      }
    }
  };

  const handleSetMessage = useCallback(
    (message: string) => {
      const emojifiedMessage = emoji.replace_colons(message);
      setMessage(emojifiedMessage);
    },
    [message]
  );

  const handleGoGroupConfig = useCallback(() => {
    navigation.navigate("GroupConfig", { id });
  }, [id]);

  const handleGoGroupParticipants = useCallback(() => {
    navigation.navigate("Participants", { id });
  }, [id]);

  const handleGoGroupInfos = useCallback(() => {
    navigation.navigate("GroupInfos", { id });
  }, [id]);

  const handleGoStar = () => {
    analytics.logEvent("IncreaseUpload");
    navigation.navigate("PurchasePremium");
  };

  const handleMessageSubmit = useCallback(async () => {
    if (files.length === 0 && message.length === 0) return;

    const localReference = uuid.v4() as string;
    setMessage("");
    handleTypingTimeout();

    setOldMessages((old) => [
      {
        id: localReference,
        author: user as UserData,
        group,
        message,
        files: files.map((file) => ({
          id: file.file.type === "success" ? file.file.name : "",
          original_name: file.file.type === "success" ? file.file.name : "",
          name: file.file.type === "success" ? file.file.name : "",
          size: file.file.type === "success" ? file.file.file?.size || 0 : 0,
          type: file.file.type === "success" ? file.type : "",
          url: file.file.type === "success" ? file.file.uri : "",
        })),
        sended: false,
        localReference,
        created_at: new Date().toISOString(),
      },
      ...old,
    ]);

    if (files.length === 0) {
      const trace = perf().newTrace("send_message_without_file");

      await trace.start();
      socket?.emit("new_user_message", { message, localReference });
      await trace.stop();
    }

    if (files.length > 0) {
      setSendingFile(true);
      const filesData = new FormData();
      const trace = await perf().newTrace("send_message_with_files");

      files.map((file) => {
        if (file.file.type === "success") {
          const type = MimeTypes.lookup(file.file.name);

          filesData.append("attachment", {
            name: file.file.name,
            uri: file.file.uri,
            type,
          });
        }
      });
      setFiles([]);

      filesData.append("message", message);

      await trace.start();
      api
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
            socket?.emit("new_message_with_files", {
              message_id: res.data.message_id,
              localReference,
            });
          }
        })
        .catch((error) => {
          crashlytics()?.recordError(error, "Send File Error");
        });

      await trace.stop();
    }

    setSendingFile(false);
    setSendedFileProgress(0);
  }, [message, files]);

  const renderMessage = useCallback(
    ({ item, index }: ListRenderItem<MessageData> | any) => {
      const lastMessage =
        index !== 0 ? oldMessages[index - 1] : ({} as MessageData);

      return (
        <Message
          message={item}
          socket={socket as Socket}
          index={index}
          user={user as unknown as UserData}
          participant={participant as any}
          lastMessage={lastMessage}
          onReplyMessage={() => {}}
        />
      );
    },
    [oldMessages.length]
  );
  const memoizedRenderMessage = useMemo(() => renderMessage, [oldMessages]);
  const getItemID = (item: MessageData) => item.id;
  const renderFooter = () =>
    fetching && !fetchedAll ? <LoadingIndicator /> : <></>;

  if (loading || !socket) return <Loading />;

  return (
    <>
      <Alert
        title="😱 Que coisa pesada!"
        content={`Eu não consigo carregar algo tão pesado, tente algo de até ${userConfigs.fileUpload}MB!`}
        okButtonAction={() => setLargeFile(false)}
        extraButtonAction={handleGoStar}
        extraButtonText="Obter plano Star"
        extraButton
        visible={largeFile}
      />
      <Alert
        title="🤔 Já vi isso antes"
        content="Você já escolheu este arquivo para ser enviado!"
        okButtonAction={() => setIsSelectedFile(false)}
        visible={isSelectedFile}
      />
      <Alert
        title="🙂 Por favor"
        content="Eu preciso de permissão para usar seu microfone, assim eu poderei gravar áudios"
        okButtonAction={() => setAudioPermission(false)}
        visible={audioPermission}
      />
      <Header title={group.name} onPressTitle={handleGoGroupInfos} backButton>
        <HeaderButton onPress={handleGoGroupParticipants}>
          <Feather name="users" size={22} color="#fff" />
        </HeaderButton>
        <HeaderButton onPress={handleGoGroupConfig}>
          <Feather name="more-vertical" size={22} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <MotiView state={toggleAnimationTypingState}>
          <Typing typingUsers={typingUsers} />
        </MotiView>
        <MessageContainer>
          <Messages
            data={oldMessages}
            extraData={oldMessages}
            style={{ scaleY: -1 }}
            keyExtractor={getItemID}
            onScroll={handleFetchMoreMessages}
            ListFooterComponent={renderFooter}
            windowSize={30}
            scrollEventThrottle={41}
            updateCellsBatchingPeriod={100}
            renderItem={memoizedRenderMessage}
            removeClippedSubviews
          />
        </MessageContainer>
        <FormContainer>
          {recordingAudio && (
            <MotiView state={toggleAnimationRecordingAudioState}>
              <RecordingAudio audioDuration={audioDuration} />
            </MotiView>
          )}
          {files.length > 0 && !sendingFile && (
            <SelectedFiles files={files} onFileRemove={removeFile} />
          )}
          {sendingFile && (
            <FileSendedProgressContainer>
              <FileSendedText>
                <Feather name="upload" size={16} /> {sendedFileProgress}%
                enviado
              </FileSendedText>
              <ProgressBar
                progress={sendedFileProgress / 100}
                color={colors.primary}
                style={{ minWidth: "100%", height: 10, borderRadius: 10 }}
              />
            </FileSendedProgressContainer>
          )}

          {/* <ReplyingMessageContainer>
            <ReplyingMessageContentContainer>
              <ReplyingMessageTitleWrapper>
                <ReplyingMessageTitle>
                  <Feather name="corner-up-right" /> Você está respondendo:
                </ReplyingMessageTitle>
              </ReplyingMessageTitleWrapper>
              <ReplyingMessageAuthorNameWrapper>
                <ReplyingMessageAuthorName>
                  Pedro Henrique
                </ReplyingMessageAuthorName>
              </ReplyingMessageAuthorNameWrapper>
              <ReplyingMessageWrapper>
                <ReplyingMessage
                  numberOfLines={1}
                >
                  Olá, este é o teste de como as pessoas vão ver as mensagens
                  que estão respondendo enquanto digitam. Este teste também
                  serve para ver o tamanho máximo que isso ocupa na tela, para
                  não atrapalhar a visualização da mensagem
                </ReplyingMessage>
              </ReplyingMessageWrapper>
            </ReplyingMessageContentContainer>
            <ReplyingMessageRemoveContainer>
              <ReplyingMessageRemoveButton>
                <Feather name="x" size={25} color={colors.black} />
              </ReplyingMessageRemoveButton>
            </ReplyingMessageRemoveContainer>
          </ReplyingMessageContainer> */}

          <InputContainer>
            <MessageInput
              ref={messageInputRef}
              as={TextInput}
              placeholderTextColor={colors.light_gray}
              placeholder={
                recordingAudio ? "Gravando audio..." : "Sua mensagem..."
              }
              onChangeText={handleSetMessage}
              onTextInput={handleTyping}
              value={message}
            />
            <OptionsContainer>
              <OptionsButton onPress={handleFileSelector}>
                <Feather name="file" size={24} color={colors.primary} />
              </OptionsButton>
              {message.length > 0 || files.length > 0 ? (
                <SendButton>
                  <Feather
                    name="send"
                    size={30}
                    color={colors.primary}
                    onPress={handleMessageSubmit}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </SendButton>
              ) : (
                <AudioContainer>
                  <AudioButton
                    onPressIn={recordAudio}
                    onPressOut={stopRecordAudio}
                  >
                    <Feather name="mic" size={30} color={colors.secondary} />
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
