import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { io, Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import avatar from "../../assets/avatar.jpg";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import { GroupData } from "../Home";
import {
  ChatContainer,
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
import { MessageData } from "../../../@types/interfaces";

const Chat: React.FC = () => {
  const [largeFile, setLargeFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [sendFile, setSendFile] = useState<DocumentPicker.DocumentResult>();
  const [group, setGroup] = useState<GroupData>({} as GroupData);
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

      socketIO.on("new_user_message", (message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
      });

      // socket.on("new_sended_user_message", (message) => {
      //   setMessages((oldMessages) => [...oldMessages, message]);
      // });

      const res = await api.get(`/group/${id}`);

      if (res.status === 200) {
        setGroup(res.data);
      }
      setLoading(false);
    }

    initChat();
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollToEnd({ animated: false });
    }
  }, [chatScrollRef.current]);

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
    socket.emit("new_user_message", { message });
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
          ref={chatScrollRef}
          data={messages}
          keyExtractor={(item) => String(item.id)}
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
