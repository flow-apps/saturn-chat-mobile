import Clipboard from "expo-clipboard";
// import MarkdownIt from "markdown-it";
import React, { memo, useCallback, useState } from "react";
import { Linking } from "react-native";
import Markdown, { MarkdownIt } from "react-native-markdown-display";
import { useTheme } from "styled-components";
import { MessageData, UserData } from "../../../@types/interfaces";
import Alert from "../Alert";
import Toast from "react-native-simple-toast";
import {
  Container,
  MessageAuthorContainer,
  MessageAuthorName,
  MessageAvatar,
  MessageCodeBlock,
  MessageCodeBlockText,
  MessageCodeInline,
  MessageContent,
  MessageContentContainer,
  MessageLink,
} from "./styles";

interface MessageProps {
  user: UserData;
  message: MessageData;
  lastMessage: MessageData;
  index: number;
}

const Message = ({ message, lastMessage, user, index }: MessageProps) => {
  const [showLinkAlert, setShowLinkAlert] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const { colors } = useTheme();

  const renderAuthor = useCallback(() => {
    if (index === 0) {
      return (
        <MessageAuthorContainer>
          <MessageAvatar source={{ uri: message.author.avatar.url }} />
          <MessageAuthorName>{message.author.name}</MessageAuthorName>
        </MessageAuthorContainer>
      );
    }

    const lastAuthorIsEqual = lastMessage.author.id !== message.author.id;

    if (lastAuthorIsEqual) {
      return (
        <MessageAuthorContainer>
          <MessageAvatar source={{ uri: message.author.avatar.url }} />
          <MessageAuthorName>{message.author.name}</MessageAuthorName>
        </MessageAuthorContainer>
      );
    }
  }, [message, lastMessage, index]);

  const alertLink = useCallback((url: string) => {
    setLinkUrl(url);
    setShowLinkAlert(true);
  }, []);

  const openLink = useCallback(async () => {
    if (await Linking.canOpenURL(linkUrl)) {
      await Linking.openURL(linkUrl);
    }

    setLinkUrl("");
    return setShowLinkAlert(false);
  }, [linkUrl]);

  const copyLink = useCallback((url: string) => {
    Clipboard.setString(url);
    Toast.show("Link copiado", Toast.SHORT);
  }, []);

  const closeLink = useCallback(() => {
    setLinkUrl("");
    return setShowLinkAlert(false);
  }, []);

  const markdownRules = MarkdownIt({
    linkify: true,
    typographer: true,
  })
    .disable(["image", "heading", "table", "list", "link", "blockquote", "hr"])
    .use(require("markdown-it-linkscheme"));

  return (
    <>
      <Container key={index} isRight={message.author.id === user.id}>
        <MessageContentContainer isRight={message.author.id === user.id}>
          <Alert
            title="⚠ Cuidado, pode ser perigoso"
            content={`Tem certeza que quer acessar este link? Não podemos garantir sua segurança ao acessá-lo. \n\n${linkUrl}`}
            cancelButtonText="Não"
            okButtonText="Acessar"
            cancelButtonAction={closeLink}
            okButtonAction={openLink}
            visible={showLinkAlert}
          />
          <Markdown
            markdownit={markdownRules}
            mergeStyle
            rules={{
              paragraph: (node, children, parent, styles) => (
                <MessageContent
                  isRight={message.author.id === user.id}
                  key={node.key}
                >
                  {children}
                </MessageContent>
              ),
              link: (node, children, parent, styles) => (
                <MessageLink
                  onPress={() => alertLink(node.attributes.href)}
                  onLongPress={() => copyLink(node.attributes.href)}
                  key={node.key}
                >
                  {children}
                </MessageLink>
              ),
              code_inline: (node, children, parent, styles) => (
                <MessageCodeInline key={node.key}>
                  {node.content}
                </MessageCodeInline>
              ),
              fence: (node, children, parent, styles) => {
                let { content } = node;

                if (
                  typeof node.content === "string" &&
                  node.content.charAt(node.content.length - 1) === "\n"
                ) {
                  content = node.content.substring(0, node.content.length - 1);
                }

                return (
                  <MessageCodeBlock key={node.key}>
                    <MessageCodeBlockText>{content}</MessageCodeBlockText>
                  </MessageCodeBlock>
                );
              },
            }}
          >
            {message.message}
          </Markdown>
        </MessageContentContainer>
        {renderAuthor()}
      </Container>
    </>
  );
};

export default memo(Message);
