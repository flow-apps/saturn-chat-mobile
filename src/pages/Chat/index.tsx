import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Keyboard,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TextInput,
} from "react-native";

import EmojiJS from "emoji-js";

import { ProgressBar } from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import { GroupData, MessageData, UserData } from "../../../@types/interfaces";
import { HeaderButton } from "../../components/Header/styles";
import { useAuth } from "../../contexts/auth";

import * as DocumentPicker from "expo-document-picker";
import * as MimeTypes from "react-native-mime-types";

import FormData from "form-data";
import Toast from "react-native-simple-toast";
import Alert from "../../components/Alert";
import EmojiPicker from "../../components/Chat/EmojiPicker";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Message from "../../components/Chat/Message";
import api from "../../services/api";
import {
  AudioButton,
  AudioContainer,
  Container,
  EmojiBoardContainer,
  EmojiButton,
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
import RecordingAudio from "../../components/Chat/RecordingAudio";
import LoadingIndicator from "../../components/LoadingIndicator";
import SelectedFiles from "../../components/Chat/SelectedFiles";
import { FileService, FileServiceErrors } from "../../services/file";
import { RecordService } from "../../services/record";

import { getWebsocket } from "../../services/websocket";
import { useAds } from "../../contexts/ads";
import Typing from "../../components/Chat/Typing";

const emoji = new EmojiJS();

interface File {
  file: DocumentPicker.DocumentResult;
  type: string;
}

const recordService = new RecordService();

const Chat: React.FC = () => {

  const messageInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const { Interstitial } = useAds();
  const { colors } = useTheme();
  const route = useRoute()
  const { id } = route.params as { id: string };
  const { token, user } = useAuth();

  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendedFileProgress, setSendedFileProgress] = useState(0);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);
  const [typingUsers, setTypingUsers] = useState<UserData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number>();

  const [audioPermission, setAudioPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState<Audio.Recording>();
  const [audioDuration, setAudioDuration] = useState(0);

  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [socket, setSocket] = useState<Socket>(getWebsocket(token));

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(false);

  const fileService = new FileService(filesSizeUsed);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const isReady = await Interstitial.getIsReadyAsync();
      if (isReady) await Interstitial.showAdAsync();

      const connectedSocket = !socket ? getWebsocket(token) : socket

      connectedSocket.emit("connect_in_chat", id);
      connectedSocket.on("connect", () => {
        setSocket(connectedSocket);
      });

      const res = await api.get(`/group/${id}`);
      if (res.status === 200) setGroup(res.data);

      Keyboard.addListener("keyboardDidShow", () => setShowEmojiPicker(false));

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

    socket.on("sended_user_message", (msg) => {
      setOldMessages((old) => [msg, ...old]);
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

      if (route.name === "Chat")
        navigation.navigate("Groups")
    })

    navigation.addListener("blur", () => {
      socket.offAny();
    });
  }, [socket]);

  const handleTypingTimeout = () => {
    setIsTyping(false);
    socket?.emit("remove_user_typing", { typing: false, userID: user?.id });
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);

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
    } catch (error) {
      setRecordingAudio(undefined);
      new Error(error);
    }
  };

  const stopRecordAudio = async () => {
    try {
      if (!recordingAudio) return;

      await recordService.finish({
        audio: recordingAudio,
        async onRecordFinish({ duration, audioURI, audioInfos, extension }) {
          const audioData = new FormData();

          setRecordingAudio(undefined);
          setAudioDuration(0);

          audioData.append("duration", duration);
          audioData.append("size", audioInfos.size);
          audioData.append("attachment", {
            uri: audioURI,
            name: `attachment_audio${extension}`,
            type: `audio/${extension.replace(".", "")}`,
          });

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
          });
        },
      });
    } catch (error) {
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
        (f) => f.file.type !== "cancel" && f.file.name === file.file.name
      );

      if (isSelected) return setIsSelectedFile(true);
      if (fileRes.usageSize)
        setFilesSizeUsed((used) => used + fileRes.usageSize);      
      
      setFiles((oldFiles) => [
        { file: file.file, type: file.type },
        ...oldFiles,
      ]);      

      return;
    }

    const errorType = fileRes.errorType;

    if (errorType === FileServiceErrors.FILE_SIZE_REACHED_LIMIT)
      return setLargeFile(true);
  }

  const removeFile = (position: number) => {
    const filteredFiles = files.filter((f, index) => index !== position);
    setFiles(filteredFiles);
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
          lastMessage={lastMessage}
        />
      );
    },
    [oldMessages]
  );

  const memoizedRenderMessage = useMemo(() => renderMessage, [oldMessages]);

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

  const handleShowEmojiPicker = useCallback(() => {
    if (!showEmojiPicker) {
      setShowEmojiPicker(true);
      return Keyboard.dismiss();
    }

    setShowEmojiPicker(false);
    if (messageInputRef.current) messageInputRef.current.focus();
  }, [showEmojiPicker]);

  function handleSelectEmoji(emoji: string) {
    setMessage((old) => old + emoji);
  }

  const handleMessageSubmit = useCallback(async () => {
    handleTypingTimeout();

    if (files.length <= 0 && message.length === 0) return
    
    if (files.length <= 0) {
      socket?.emit("new_user_message", { message });
      setMessage("");
      return
    }
    
    if (files.length > 0) {
      setSendingFile(true);
      Toast.show("Enviando arquivos...");
      const filesData = new FormData();      

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

      const response = await api
        .post(`messages/SendAttachment/${id}?type=files`, filesData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            const totalSended = Math.round((event.loaded * 100) / event.total);
            setSendedFileProgress(totalSended);
          },
        })
        
      if (response.status === 200) {
        console.log(response.data);
        socket?.emit("new_message_with_files", {
          message,
          message_id: response.data.message_id,
        });
      }
      setSendingFile(false);
      setSendedFileProgress(0);
      setFiles([]);
      setMessage("")
    }

  }, [message]);

  const getItemID = (item: MessageData) => item.id;
  const renderFooter = () =>
    fetching && !fetchedAll ? <LoadingIndicator /> : <></>;

  if (loading || !socket) return <Loading />;

  return (
    <>
      <Alert
        title="😱 Que coisa pesada!"
        content="Eu não consigo carregar algo tão pesado, tente algo de até 12MB!"
        okButtonAction={() => setLargeFile(false)}
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
        <Typing typingUsers={typingUsers} />
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
            renderItem={memoizedRenderMessage}
            removeClippedSubviews
          />
        </MessageContainer>
        <FormContainer>
          {recordingAudio && <RecordingAudio audioDuration={audioDuration} />}
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
          <InputContainer>
            <EmojiButton onPress={handleShowEmojiPicker}>
              {!showEmojiPicker ? (
                <Feather name="smile" size={24} color={colors.secondary} />
              ) : (
                <MaterialIcons
                  name="keyboard"
                  size={24}
                  color={colors.secondary}
                />
              )}
            </EmojiButton>
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
              <SendButton>
                {message.length > 0 || files.length > 0 ? (
                  <Feather
                    name="send"
                    size={28}
                    color={colors.primary}
                    onPress={handleMessageSubmit}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                ) : (
                  <></>
                )}
              </SendButton>
              {message.length <= 0 && files.length <= 0 && (
                <AudioContainer>
                  <AudioButton
                    onPressIn={recordAudio}
                    onPressOut={stopRecordAudio}
                  >
                    <Feather name="mic" size={28} color={colors.secondary} />
                  </AudioButton>
                </AudioContainer>
              )}
            </OptionsContainer>
          </InputContainer>

          {showEmojiPicker ? (
            <EmojiBoardContainer>
              <EmojiPicker
                onClick={handleSelectEmoji}
                visible={showEmojiPicker}
              />
            </EmojiBoardContainer>
          ) : (
            <></>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default Chat;
