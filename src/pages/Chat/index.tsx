import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
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
import { Alert } from "react-native";
import { useRoute } from "@react-navigation/core";
import api from "../../services/api";
import { GroupData } from "../Home";

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [sendFile, setSendFile] = useState<string>("");
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const { colors } = useTheme();
  const chatScrollRef = useRef() as React.MutableRefObject<ScrollView>;
  const { id } = useRoute().params as { id: string };

  useEffect(() => {
    async function initChat() {
      const socketIO = io("http://192.168.0.112:3000/", {
        path: "/socket.io/",
        jsonp: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        transports: ["websocket"],
        query: {
          group_id: id,
        },
      });

      setSocket(socketIO);

      const res = await api.get(`/group/${id}`);

      if (res.status === 200) {
        setGroup(res.data);
      }
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
      if (fileSize > 20) {
        return Alert.alert(
          "😱 Que arquivo grande!",
          `O arquivo não pode ser maior que 20MB!`
        );
      }
      return setSendFile(file.uri);
    }
  }

  return (
    <>
      <Header title={group.name} backButton groupButtons />
      <Container>
        <ChatContainer
          as={ScrollView}
          ref={chatScrollRef}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          <MessageContainer>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox isRight>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer isRight>
                <MessageContent isRight>Boa tarde, tudo bem?</MessageContent>
              </MessageContentContainer>
            </MessageBox>
            <MessageBox>
              <MessageAuthorContainer>
                <MessageAvatar source={avatar} />
                <MessageAuthorName>Pedro Henrique</MessageAuthorName>
              </MessageAuthorContainer>
              <MessageContentContainer>
                <MessageContent>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris imperdiet, nunc vitae hendrerit pellentesque, odio
                  mauris fermentum lorem, vitae tempor lorem mauris sit amet
                  mauris. Suspendisse aliquet suscipit magna non tristique.
                  Integer ornare sollicitudin fermentum.
                </MessageContent>
              </MessageContentContainer>
            </MessageBox>
          </MessageContainer>
        </ChatContainer>
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
