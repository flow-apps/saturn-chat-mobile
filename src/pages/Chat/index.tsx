import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, NativeScrollEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { io, Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import { MessageData } from "../../../@types/interfaces";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import { GroupData } from "../Home";
import {
  Container,
  EmojiButton,
  FormContainer,
  InputContainer,
  MessageAuthorContainer,
  MessageAuthorName,
  MessageAvatar,
  MessageBox,
  MessageContent,
  MessageContentContainer,
  MessageInput,
  OptionsButton,
  OptionsContainer,
  SendButton,
} from "./styles";

const Chat: React.FC = () => {
  const [largeFile, setLargeFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [sendFile, setSendFile] = useState<DocumentPicker.DocumentResult>();
  const [group, setGroup] = useState<GroupData>({} as GroupData);

  const [page, setPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [fetchedAll, setFetchedAll] = useState(false);

  const { colors } = useTheme();
  const chatScrollRef = useRef() as React.MutableRefObject<FlatList>;
  const { id } = useRoute().params as { id: string };
  const { token, user } = useAuth();

  useEffect(() => {
    async function initChat() {
      setLoading(true);
      const socketIO = io("http://192.168.0.112:3000/", {
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

      setSocket(socketIO);
      // socket.on("new_user_message", (message) => {
      //   setMessages((oldMessages) => [message, ...oldMessages]);
      // });

      socketIO.on("sended_user_message", (msg) => {
        console.log(msg);

        setMessages((oldMessages) => [msg, ...oldMessages]);
      });
      const res = await api.get(`/group/${id}`);

      if (res.status === 200) {
        setGroup(res.data);
      }

      setLoading(false);
    }

    initChat();
  }, []);

  useEffect(() => {
    async function getMessages() {
      await fetchMessages();
    }

    getMessages();
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollToEnd({ animated: false });
    }
  }, [chatScrollRef.current]);

  async function fetchMessages() {
    setFetching(true);
    const { data } = await api.get(`/messages/${id}?_page=${page}&_limit=20`);

    if (data.messages.length <= 0) {
      setFetching(false);
      return setFetchedAll(true);
    }

    if (page > 0) {
      setMessages((old) => [...old, ...data.messages]);
    } else {
      setMessages(data.messages);
    }

    setFetching(false);
  }

  function handleSetMessage(message: string) {
    setMessage(message);
  }

  function handleShowEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  async function handleFileSelector() {
    const file = await DocumentPicker.getDocumentAsync({});

    if (file.type === "success") {
      const fileSize = Math.trunc(file.size / 1024 / 1024);
      if (fileSize > 15) {
        return setLargeFile(true);
      }
      return setSendFile(file);
    }
  }

  async function handleMessageSubmit() {
    setMessage("");
    socket?.emit("new_user_message", { message });
  }

  async function handleFetchMoreMessages(event: NativeScrollEvent) {
    if (fetchedAll) return;

    const { layoutMeasurement, contentOffset, contentSize } = event;
    const paddingToBottom = 1;
    const listHeight = layoutMeasurement.height + contentOffset.y;

    if (listHeight >= contentSize.height - paddingToBottom) {
      setPage((old) => old + 1);
      console.log(`Buscado página ${page}...`);
      await fetchMessages();
    }
  }

  if (loading) return <Loading />;

  return (
    <>
      {largeFile && (
        <Alert
          title="😱 Que coisa pesada!"
          content="Eu não consigo carregar algo tão pesado, tente algo de até 15MB!"
          okButtonAction={() => setLargeFile(false)}
        />
      )}
      <Header title={group.name} backButton groupButtons />
      <Container>
        <FlatList<MessageData>
          data={messages}
          ref={chatScrollRef}
          keyExtractor={(item) => String(item.id)}
          onScroll={(event) => handleFetchMoreMessages(event.nativeEvent)}
          scrollEventThrottle={16}
          removeClippedSubviews
          ListFooterComponent={
            fetching && !fetchedAll ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <></>
            )
          }
          renderItem={({ item }) => (
            <MessageBox isRight={item.author.id === user?.id}>
              <MessageAuthorContainer>
                <MessageAvatar source={{ uri: item.author.avatar.url }} />
                <MessageAuthorName>{item.author.name}</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight={item.author.id === user?.id}>
                <MessageContent isRight={item.author.id === user?.id}>
                  {item.message}
                </MessageContent>
              </MessageContentContainer>
            </MessageBox>
          )}
          inverted
        />
        <FormContainer>
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
              multiline
              onChangeText={handleSetMessage}
              value={message}
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
