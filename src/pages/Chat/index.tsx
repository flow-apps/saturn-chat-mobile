import React, { useCallback, useEffect, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import api from "../../services/api";
import avatar from "../../assets/avatar.jpg";
import { Feather, MaterialIcons } from "@expo/vector-icons";
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
} from "./styles";

const imageTypes = ["jpeg", "jpg", "png", "tiff", "tif", ".gif", ".bmp"];

interface File {
  file: DocumentPicker.DocumentResult;
  type: "image" | "other";
}

const Chat: React.FC = () => {
  const [largeFile, setLargeFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [filesSizeUsed, setFilesSizeUsed] = useState(0);
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(false);

  const { colors } = useTheme();
  const { id } = useRoute().params as { id: string };
  const { token, user } = useAuth();

  useEffect(() => {
    async function initChat() {
      setLoading(true);
      const connectedSocket = io("http://192.168.0.112:3000/", {
        path: "/socket.io/",
        jsonp: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ["websocket"],
        query: {
          group_id: id,
          token,
        },
      });
      setSocket(connectedSocket);

      const res = await api.get(`/group/${id}`);

      if (res.status === 200) {
        setGroup(res.data);
      }

      setLoading(false);
    }

    initChat();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("sended_user_message", (msg) =>
      setMessages((oldMessages) => [msg, ...oldMessages])
    );

    socket.on("new_user_message", (msg) => {
      setMessages((old) => [msg, ...old]);
    });

    socket.on("delete_user_message", (msgID) => {
      setMessages((old) => old.filter((msg) => msg.id !== msgID));
    });
  }, [socket]);

  const fetchMessages = useCallback(async () => {
    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=30`);

    if (data.messages.length === 0) {
      setFetching(false);
      return setFetchedAll(true);
    }

    if (page > 0) {
      setMessages((old) => [...old, ...data.messages]);
    } else {
      setMessages(data.messages);
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
          await fetchMessages();
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
          lastMessage={index !== 0 ? messages[index - 1] : ({} as MessageData)}
        />
      );
    },
    [messages]
  );

  const handleSetMessage = useCallback(
    (message: string) => {
      setMessage(message);
    },
    [message]
  );

  function handleShowEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  async function handleMessageSubmit() {
    setMessage("");
    setFiles([]);

    socket?.emit("new_user_message", { message });
  }

  if (loading) return <Loading />;

  return (
    <>
      <Alert
        title="😱 Que coisa pesada!"
        content="Eu não consigo carregar algo tão pesado, tente algo de até 12MB!"
        okButtonAction={() => setLargeFile(false)}
        visible={largeFile}
      />
      <Header title={group.name} backButton groupButtons />
      <Container>
        <MessageContainer>
          <Messages
            data={messages}
            keyExtractor={(item) => String(item.id)}
            onScroll={(event) => handleFetchMoreMessages(event.nativeEvent)}
            maxToRenderPerBatch={15}
            initialNumToRender={15}
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
          {files.length > 0 && (
            <FilesContainer>
              <Files
                data={files}
                keyExtractor={(item) =>
                  item.file.type == "success"
                    ? item.file.name
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
              placeholder="Sua mensagem..."
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
            </OptionsContainer>
          </InputContainer>
        </FormContainer>
      </Container>
    </>
  );
};

export default Chat;
