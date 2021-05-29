import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components";
import avatar from "../../assets/avatar.jpg";
import Header from "../../components/Header";
import * as DocumentPicker from "expo-document-picker";
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
  MessageContainer,
  MessageContent,
  MessageContentContainer,
  MessageInput,
  OptionsButton,
  OptionsContainer,
  SendButton,
} from "./styles";
import { io, Socket } from "socket.io-client";
import { useRoute } from "@react-navigation/core";
import api from "../../services/api";
import { GroupData } from "../Home";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import { useAuth } from "../../contexts/auth";

const Chat: React.FC = () => {
  const [largeFile, setLargeFile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState([
    { id: 1, author: { name: "Pedro Henrique" }, message: "Oi, tudo bem?" },
    { id: 2, author: { name: "João Carlos" }, message: "Tudo bem e vc?" },
    { id: 3, author: { name: "Carlos José" }, message: "Eae pessoal!" },
  ]);
  const [sendFile, setSendFile] = useState<DocumentPicker.DocumentResult>();
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const { colors } = useTheme();
  const chatScrollRef = useRef() as React.MutableRefObject<FlatList>;
  const { id } = useRoute().params as { id: string };
  const { token } = useAuth();

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
        <ChatContainer
          as={FlatList}
          ref={chatScrollRef}
          inverted
          data={messages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>{item.author.name}</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>{item.message}</MessageContent>
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
