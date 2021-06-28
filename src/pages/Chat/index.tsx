import React, { useCallback, useEffect, useState, useRef } from "react";
import Toast from "react-native-simple-toast";

import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import Alert from "../../components/Alert";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import EmojiPicker from "../../components/EmojiPicker";
import EmojiJS from "emoji-js";

import api from "../../services/api";
import { useRoute } from "@react-navigation/core";
import { ActivityIndicator, NativeScrollEvent } from "react-native";
import { io, Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import { GroupData, MessageData, UserData } from "../../../@types/interfaces";
import { useAuth } from "../../contexts/auth";
import {
  Container,
  EmojiButton,
  File,
  FilesContainer,
  ImageFile,
  OtherFile,
  FormContainer,
  InputContainer,
  MessageContainer,
  MessageInput,
  Messages,
  OptionsButton,
  OptionsContainer,
  SendButton,
  RemoveFileButton,
  Files,
  EmojiBoardContainer,
  AudioContainer,
  AudioButton,
  RecordingAudioContainer,
  RecordingAudioWrapper,
  RecordingAudioText,
  RecordingAudioDuration,
} from "./styles";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
import { HeaderButton } from "../../components/Header/styles";
import { useNavigation } from "@react-navigation/native";
import { millisToTime } from "../../utils/format";

const emoji = new EmojiJS();
const imageTypes = ["jpeg", "jpg", "png", "tiff", "tif", ".gif", ".bmp"];

interface File {
  file: DocumentPicker.DocumentResult;
  type: "image" | "other";
}

const Chat: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [largeFile, setLargeFile] = useState(false);
  const [isSelectedFile, setIsSelectedFile] = useState(false);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [oldMessages, setOldMessages] = useState<MessageData[]>([]);

  const [audioInterval, setAudioInterval] = useState<number>();
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
  const recording = new Audio.Recording();

  const { colors } = useTheme();
  const { id } = useRoute().params as { id: string };
  const { token, user } = useAuth();

  useEffect(() => {
    (async function () {
      setLoading(true);
      const connectedSocket = io("http://192.168.0.112:3000/", {
        path: "/socket.io/",
        jsonp: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ["websocket"],
        query: {
          token,
        },
      });

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
    if (!socket) return;

    socket.on("sended_user_message", (msg) => {
      setOldMessages((old) => [msg, ...old]);
    });

    socket.on("new_user_message", (msg) => {
      setOldMessages((old) => [msg, ...old]);
    });

    socket.on("delete_user_message", (msgID) => {
      setOldMessages((old) => old.filter((msg) => msg.id !== msgID));
    });
  }, [socket]);

  const recordAudio = async () => {
    if (recordingAudio) return;

    try {
      const permission = await Audio.getPermissionsAsync();

      if (!permission.granted) {
        const { granted } = await Audio.requestPermissionsAsync();

        if (!granted) return;
      }

      recording
        .prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        .then(async () => {
          const durationInterval = setInterval(async () => {
            setAudioDuration((old) => old + 1000);
          }, 1000);

          setAudioInterval(durationInterval);
          setRecordingAudio(recording);
        });
    } catch (error) {
      setRecordingAudio(undefined);
      new Error(error);
    }
  };

  const stopRecordAudio = async () => {
    try {
      if (!recordingAudio) return;

      clearInterval(audioInterval);
      await recordingAudio.stopAndUnloadAsync();

      if (recordingAudio._finalDurationMillis < 500) {
        return Toast.show("Aperte e segure para gravar");
      }

      const uri = recordingAudio.getURI();

      console.log(uri);
    } catch (error) {
      new Error(error);
    } finally {
      setAudioInterval(undefined);
      setRecordingAudio(undefined);
      setAudioDuration(0);
    }
  };

  const fetchOldMessages = useCallback(async () => {
    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=50`);

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
  }, [page]);

  const handleFileSelector = useCallback(async () => {
    const file = await DocumentPicker.getDocumentAsync({});

    if (file.type === "success") {
      const fileSize = Math.trunc(file.size / 1000 / 1000);
      const type = file.name.split(".").pop();
      if (fileSize > 12 || filesSizeUsed + fileSize > 12) {
        return setLargeFile(true);
      }

      const isSelected = files.find(
        (f) => f.file.type === "success" && f.file.name === file.name
      );

      if (isSelected) {
        return setIsSelectedFile(true);
      }

      setFilesSizeUsed((used) => used + fileSize);
      setFiles((oldFiles) => [
        { file, type: type && imageTypes.includes(type) ? "image" : "other" },
        ...oldFiles,
      ]);
    }
  }, [files]);

  const removeFile = (position: number) => {
    const filteredFiles = files.filter((f, index) => index !== position);
    setFiles(filteredFiles);
  };

  const handleFetchMoreMessages = useCallback(
    async (event: NativeScrollEvent) => {
      if (fetchedAll) return;

      const { layoutMeasurement, contentOffset, contentSize } = event;
      const paddingToBottom = 1;
      const listHeight = layoutMeasurement.height + contentOffset.y;

      if (listHeight >= contentSize.height - paddingToBottom) {
        if (!fetching) {
          setPage((old) => old + 1);
          await fetchOldMessages();
        }
      }
    },
    [page]
  );

  const renderMessage = useCallback(
    (item: MessageData, index: number) => {
      return (
        <Message
          message={item}
          socket={socket as Socket}
          index={index}
          user={user as unknown as UserData}
          lastMessage={
            index !== 0 ? oldMessages[index - 1] : ({} as MessageData)
          }
        />
      );
    },
    [oldMessages]
  );

  const handleSetMessage = useCallback((message: string) => {
    const emojifiedMessage = emoji.replace_colons(message);
    setMessage(emojifiedMessage);
  }, []);

  const handleGoGroupConfig = useCallback(() => {
    navigation.navigate("GroupConfig", { id });
  }, [id]);

  const handleGoGroupInfos = useCallback(() => {
    navigation.navigate("GroupInfos", { id });
  }, [id]);

  function handleShowEmojiPicker() {
    if (!showEmojiPicker) {
      setShowEmojiPicker(true);
      return Keyboard.dismiss();
    }

    setShowEmojiPicker(false);
    if (messageInputRef.current) messageInputRef.current.focus();
  }

  function handleSelectEmoji(emoji: string) {
    setMessage((old) => old + emoji);
  }

  async function handleMessageSubmit() {
    socket?.emit("new_user_message", {
      message,
    });
    setMessage("");
    setFiles([]);
  }

  if (loading || !socket) return <Loading />;

  return (
    <>
      <Header title={group.name} onPressTitle={handleGoGroupInfos} backButton>
        <HeaderButton onPress={handleGoGroupConfig}>
          <Feather name="more-vertical" size={22} color="#fff" />
        </HeaderButton>
      </Header>
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
      <Container>
        <MessageContainer>
          <Messages
            data={oldMessages}
            keyExtractor={(item) => String(item.id)}
            onScroll={(event) => handleFetchMoreMessages(event.nativeEvent)}
            maxToRenderPerBatch={15}
            initialNumToRender={20}
            removeClippedSubviews
            ListFooterComponent={
              fetching && !fetchedAll ? (
                <ActivityIndicator
                  style={{ margin: 10 }}
                  size="large"
                  color={colors.primary}
                />
              ) : (
                <></>
              )
            }
            renderItem={({ item, index }) => renderMessage(item, index)}
            inverted
          />
        </MessageContainer>
        <FormContainer>
          {recordingAudio && (
            <RecordingAudioContainer>
              <RecordingAudioWrapper>
                <RecordingAudioText>
                  <Feather name="mic" size={20} color={colors.red} /> Gravando
                </RecordingAudioText>
              </RecordingAudioWrapper>
              <RecordingAudioDuration>
                {millisToTime(audioDuration)}
              </RecordingAudioDuration>
            </RecordingAudioContainer>
          )}
          {files.length > 0 && (
            <FilesContainer>
              <Files
                data={files}
                keyExtractor={(item, index) =>
                  item.file.type == "success"
                    ? item.file.name + index
                    : String(Math.random())
                }
                horizontal={true}
                contentContainerStyle={{
                  alignItems: "center",
                }}
                renderItem={({ item, index }) => {
                  return (
                    <File>
                      <RemoveFileButton onPress={() => removeFile(index)}>
                        <Feather name="x" size={14} color={colors.secondary} />
                      </RemoveFileButton>
                      {item.file.type === "success" && item.type === "image" ? (
                        <ImageFile source={{ uri: item.file.uri }} />
                      ) : (
                        <OtherFile>
                          <Feather
                            name="file-text"
                            size={25}
                            color={colors.black}
                          />
                        </OtherFile>
                      )}
                    </File>
                  );
                }}
              />
            </FilesContainer>
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
              maxLength={500}
              multiline
            />
            <OptionsContainer>
              <OptionsButton onPress={handleFileSelector}>
                <Feather name="file" size={24} color={colors.primary} />
              </OptionsButton>
              <SendButton>
                <Feather
                  name="send"
                  size={24}
                  color={colors.primary}
                  onPress={handleMessageSubmit}
                  style={{
                    transform: [
                      {
                        rotate: "45deg",
                      },
                    ],
                  }}
                />
              </SendButton>
              {message.length <= 0 && (
                <AudioContainer>
                  <AudioButton
                    onPressIn={recordAudio}
                    onPressOut={stopRecordAudio}
                  >
                    <Feather name="mic" size={26} color={colors.secondary} />
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
