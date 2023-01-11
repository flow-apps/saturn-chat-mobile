import React, {
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppState } from "@react-native-community/hooks";
import {
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
} from "react-native";

import perf from "@react-native-firebase/perf";
import crashlytics from "@react-native-firebase/crashlytics";

import { ProgressBar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import {
  FileData,
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
  SendButton,
} from "./styles";
import Typing from "../../components/Chat/Typing";
import RecordingAudio from "../../components/Chat/RecordingAudio";
import LoadingIndicator from "../../components/LoadingIndicator";
import SelectedFiles from "../../components/Chat/SelectedFiles";
import { FileService, FileServiceErrors } from "../../services/file";
import { RecordService } from "../../services/record";

import { useAds } from "../../contexts/ads";
import analytics from "@react-native-firebase/analytics";
import { useRemoteConfigs } from "../../contexts/remoteConfigs";
import { AnimatePresence, MotiView } from "moti";
import SimpleToast from "react-native-simple-toast";
import CurrentReplyingMessage from "../../components/Chat/CurrentReplyingMessage";
import { useAudioPlayer } from "../../contexts/audioPlayer";
import { ArrayUtils } from "../../utils/array";
import { useWebsocket } from "../../contexts/websocket";
import { useChat } from "../../contexts/chat";

interface File {
  file: DocumentPicker.DocumentResult;
  type: string;
}

const recordService = new RecordService();

const Chat: React.FC = () => {
  const messageInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { id, name, friendId } = route.params as {
    id: string;
    name?: string;
    friendId: string;
  };
  const arrayUtils = new ArrayUtils();

  const { Interstitial } = useAds();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { userConfigs } = useRemoteConfigs();

  const [message, setMessage] = useState<string>("");
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
  const [fetching, setFetching] = useState(true);
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
  } = useChat();

  const { unloadAudio, currentAudioName, playAndPauseAudio } = useAudioPlayer();
  const appState = useAppState();

  useEffect(() => {
    if (appState === "active") {
      if (!socket) 
        return;
      
      handleJoinRoom(id);
      configureSocketListeners();
    }
    return () => {
      if (socket) {
        socket.emit("leave_chat");
      }
    };
  }, [appState, socket]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const groupRes = await api.get(`/group/${id}`);
      if (groupRes.status === 200) setGroup(groupRes.data);

      await fetchOldMessages();
      setLoading(false);
    })();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      setLoading(true);
      const participantRes = await api.get(`/group/participant/${id}`);
      if (participantRes.status === 200)
        setParticipant(participantRes.data.participant);

      setLoading(false);
    })();
  }, []);

  const configureSocketListeners = useCallback(() => {
    onSendedUserMessage(({ msg, localReference }) => {
      setOldMessages((old) =>
        arrayUtils.iterator(old, (m) =>
          m.localReference === localReference ? { ...msg, sended: true } : m
        )
      );
    });

    onNewUserMessage((msg) => {
      setOldMessages((old) => [msg, ...old]);
      handleSetReadMessage(msg.id);
    });

    onNewUserTyping((newUser) => {
      if (newUser.id === user?.id) return;

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
      if (result.voice_message) {
        await unloadAudio(result.voice_message.name);
      }

      if (result.files) {
        const processedMessages = arrayUtils.iterator(
          result.files,
          async (file) => {
            if (file.type === "audio") {
              await unloadAudio(file.name);
            }
          }
        );
        await Promise.all(processedMessages);
      }

      if (replyingMessage?.id === result.id) {
        setReplyingMessage(undefined);
      }

      setOldMessages((old) => old.filter((msg) => msg.id !== result.id));
    });

    socket.on("deleted_group", (groupID) => {
      if (route.name === "Chat") navigation.navigate("Groups");
    });

    socket.on("kicked_group", (data) => {
      if (user?.id === data.user_id && route.name === "Chat") {
        navigation.navigate("Groups");
      }
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
    if (recordingAudio) return;

    try {
      if (currentAudioName) await playAndPauseAudio(currentAudioName);

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
          SimpleToast.show("Enviando mensagem de voz...");

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
              participant,
              voice_message: {
                name: `attachment_audio_${localReference}${extension}`,
                duration,
                size: Number(audioInfos.size),
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
            message,
            localReference,
          });
          setReplyingMessage(undefined);
        },
      });
    } catch (error: any) {
      new Error(error);
    }
  };

  const fetchOldMessages = useCallback(async () => {
    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=30`);

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
  }, [page, fetchedAll, fetching]);

  const handleFileSelector = async () => {
    const fileRes = await fileService.get();

    if (!fileRes.error) {
      if (fileRes.selectedFile?.file.type !== "success") return;

      const newFile = fileRes.selectedFile;
      const isSelected = arrayUtils.has(files, (f) => {
        if (f.file?.type === "cancel") {
          return false;
        }

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
    const listHeight = layoutMeasurement.height + contentOffset.y;

    if (listHeight >= contentSize.height) {
      if (!fetching) {
        setPage((old) => old + 1);
        await fetchOldMessages();
      }
    }
  };

  const handleSetMessage = useCallback(
    (newMessage: string) => {
      if (newMessage.length >= userConfigs.messageLength) {
        return SimpleToast.show("Limite de 500 caracteres atingido!");
      }

      setMessage(newMessage);
    },
    [message]
  );

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

  const handleGoStar = () => {
    analytics().logEvent("IncreaseUpload");
    navigation.navigate("PurchasePremium");
  };

  const handleReplyMessage = async (message: MessageData) => {
    setReplyingMessage(message);
  };

  const handleRemoveReplyingMessage = async () => {
    setReplyingMessage(undefined);
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
        participant,
        files: files.map((file) => {
          if (file.file.type !== "success") return {} as FileData;
          return {
            id: file.file.name,
            original_name: file.file.name,
            name: file.file.name,
            size: file.file.file?.size || 0,
            type: file.type,
            url: file.file.uri,
          };
        }),
        sended: false,
        localReference,
        reply_to: replyingMessage,
        created_at: new Date().toISOString(),
      },
      ...old,
    ]);

    if (files.length === 0) {
      const trace = perf().newTrace("send_message_without_file");

      await trace.start();
      handleSendMessage({
        withFiles: false,
        reply_to_id: replyingMessage?.id,
        message,
        localReference,
      });
      await trace.stop();
    }

    if (files.length > 0) {
      setSendingFile(true);
      const filesData = new FormData();
      const trace = perf().newTrace("send_message_with_files");

      arrayUtils.iterator(files, (file) => {
        if (file.file.type === "success") {
          const type = MimeTypes.lookup(file.file.name);

          filesData.append("attachment", {
            name: file.file.name,
            uri: file.file.uri,
            type,
          });
        }
      });

      filesData.append("message", message);
      if (replyingMessage) filesData.append("reply_to_id", replyingMessage?.id);

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
    }

    setSendingFile(false);
    setSendedFileProgress(0);
    setReplyingMessage(undefined);
  }, [message, files]);

  const renderMessage = useCallback(({
    item,
    index,
  }: ListRenderItem<MessageData> | any) => {
    const lastMessage = index !== 0 ? oldMessages[index - 1] : null;

    return (
      <Message
        message={item}
        participant={participant as ParticipantsData}
        lastMessage={lastMessage}
        onReplyMessage={handleReplyMessage}
      />
    );
  }, [oldMessages])

  const getItemID = (item: MessageData) => item.id;
  const renderFooter = () =>
    fetching && !fetchedAll ? <LoadingIndicator /> : <></>;

  const disableLargeFile = () => setLargeFile(false);
  const disableIsSelectedFile = () => setIsSelectedFile(false);
  const disableAudioPermission = () => setAudioPermission(false);

  if (loading || !socket) return <Loading />;

  return (
    <>
      <Alert
        title="😱 Que coisa pesada!"
        content={`Eu não consigo carregar algo tão pesado, tente algo de até ${userConfigs.fileUpload}MB!`}
        okButtonAction={disableLargeFile}
        extraButtonAction={handleGoStar}
        extraButtonText="Obter plano Star"
        extraButton
        visible={largeFile}
      />
      <Alert
        title="🤔 Já vi isso antes"
        content="Você já escolheu este arquivo para ser enviado!"
        okButtonAction={disableIsSelectedFile}
        visible={isSelectedFile}
      />
      <Alert
        title="🙂 Por favor"
        content="Eu preciso de permissão para usar seu microfone, assim eu poderei gravar áudios"
        okButtonAction={disableAudioPermission}
        visible={audioPermission}
      />
      <Header
        title={name || group.name}
        onPressTitle={
          group.type === "GROUP" ? handleGoGroupInfos : handleGoFriendInfos
        }
      >
        {group.type === "GROUP" ? (
          <HeaderButton onPress={handleGoGroupParticipants}>
            <Feather name="users" size={22} color="#fff" />
          </HeaderButton>
        ) : (
          <></>
        )}
        <HeaderButton onPress={handleGoGroupConfig}>
          <Feather name="more-vertical" size={22} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <Typing typingUsers={typingUsers} />
        <MessageContainer>
          <Messages
            data={oldMessages}
            extraData={oldMessages.length}
            keyExtractor={getItemID}
            renderItem={renderMessage}
            onScroll={handleFetchMoreMessages}
            ListFooterComponent={renderFooter}
            updateCellsBatchingPeriod={1000}
            windowSize={18}
            inverted
            contentContainerStyle={{ minHeight: "100%" }}
          />
        </MessageContainer>
        <FormContainer>
          <AnimatePresence>
            {recordingAudio && (
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
              placeholderTextColor={colors.dark_heading}
              placeholder={
                recordingAudio ? "Gravando audio..." : "Sua mensagem..."
              }
              onChangeText={handleSetMessage}
              onTextInput={handleTyping}
              defaultValue={message}
              maxLength={userConfigs?.messageLength || 500}
            />
            <OptionsContainer>
              <OptionsButton onPress={handleFileSelector}>
                <Feather name="file" size={24} color={colors.primary} />
              </OptionsButton>
              {message.length > 0 || files.length > 0 ? (
                <SendButton>
                  <Feather
                    name="send"
                    size={26}
                    color={colors.primary}
                    onPress={handleMessageSubmit}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </SendButton>
              ) : (
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
