import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  ListRenderItem,
  NativeScrollEvent,
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
import Banner from "../../components/Ads/Banner";

const emoji = new EmojiJS();

interface File {
  file: DocumentPicker.DocumentResult;
  type: string;
}

const recordService = new RecordService();

const Chat: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [sendingFile, setSendingFile] = useState(false);
  const [sendedFileProgress, setSendedFileProgress] = useState(0);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);

  const [audioPermission, setAudioPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState<Audio.Recording>();
  const [audioDuration, setAudioDuration] = useState(0);

  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(false);

  const messageInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const fileService = new FileService(filesSizeUsed);

  const { colors } = useTheme();
  const { id } = useRoute().params as { id: string };
  const { token, user } = useAuth();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const connectedSocket = getWebsocket(token);

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
    connectSockets()
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

    socket.on("delete_user_message", (msgID) => {
      setOldMessages((old) => old.filter((msg) => msg.id !== msgID));
    });

    navigation.addListener("blur", () => {
      socket.off("sended_user_message")
      socket.off("new_user_message")
      socket.off("delete_user_message")
    })

  }, [socket]);

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
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=60`);

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

  const handleFileSelector = useCallback(async () => {
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
  }, [files]);

  const removeFile = (position: number) => {
    const filteredFiles = files.filter((f, index) => index !== position);
    setFiles(filteredFiles);
  };

  const handleFetchMoreMessages = async (event: NativeScrollEvent) => {
    if (fetchedAll) return;

    const { layoutMeasurement, contentOffset, contentSize } = event;
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

  const handleSetMessage = useCallback((message: string) => {
    const emojifiedMessage = emoji.replace_colons(message);
    setMessage(emojifiedMessage);
  }, [message]);

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
    if (!files.length) {
      socket?.emit("new_user_message", {
        message,
      });
    } else {
      setSendingFile(true);
      Toast.show("Enviando arquivos...");
      const filesData = new FormData();

      files.map((file) => {
        if (file.file.type === "success") {
          const type = MimeTypes.lookup(file.file.name);

          filesData.append("attachment", {
            name: file.file.name,
            uri: "file://" + file.file.uri,
            type,
          });
        }
      });

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
        .then((response) => {
          console.log(response);
          socket?.emit("new_message_with_files", {
            message,
            message_id: response.data.message_id,
          });
        })
        .catch((error) => {
          console.log(JSON.stringify(error.request));
        });
      setSendingFile(false);
      setSendedFileProgress(0);
    }
    setFiles([]);
    setMessage("");
  }, [message]);

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
        <MessageContainer>
          <Messages
            data={oldMessages}
            windowSize={18}
            keyExtractor={(item) => item.id}
            onScroll={(event) => handleFetchMoreMessages(event.nativeEvent)}
            ListFooterComponent={
              fetching && !fetchedAll ? <LoadingIndicator /> : <></>
            }
            renderItem={renderMessage}
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
              placeholder={
                recordingAudio ? "Gravando audio..." : "Sua mensagem..."
              }
              onChangeText={handleSetMessage}
              value={message}
              placeholderTextColor={colors.light_gray}
            />
            <OptionsContainer>
              <OptionsButton onPress={handleFileSelector}>
                <Feather name="file" size={24} color={colors.primary} />
              </OptionsButton>
              <SendButton>
                {message.length > 0 || files.length > 0 ? (
                  <Feather
                    name="send"
                    size={24}
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
                    <Feather name="mic" size={24} color={colors.secondary} />
                  </AudioButton>
                </AudioContainer>
              )}
            </OptionsContainer>
          </InputContainer>

          <EmojiBoardContainer>
            <EmojiPicker
              onClick={handleSelectEmoji}
              visible={showEmojiPicker}
            />
          </EmojiBoardContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default Chat;
