import React, { memo, useCallback, useState } from "react";

import isSameMinute from "date-fns/isSameMinute";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { convertToTimeZone } from "date-fns-timezone";

import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
import { Socket } from "socket.io-client";
import { useTheme } from "styled-components";
import { MessageData, UserData } from "../../../../@types/interfaces";

import Clipboard from "expo-clipboard";
import * as Localize from "expo-localization";

import Markdown, { MarkdownIt, RenderRules } from "react-native-markdown-display";
import Alert from "../../Alert";
import Toast from "react-native-simple-toast";
import AudioPlayer from "../AudioPlayer";
import FilePreview from "../FilePreview";
import MessageOptions from "../../MessageOptions";
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
  MessageDate,
  MessageDateContainer,
  MessageLink,
} from "./styles";
import { useMemo } from "react";
import { RenderRule } from "markdown-it/lib/renderer";

interface MessageProps {
  user: UserData;
  message: MessageData;
  lastMessage: MessageData;
  index: number;
  socket: Socket;
}

const markdownRules = MarkdownIt({
  linkify: true,
  typographer: true,
})
  .disable(["image", "heading", "table", "list", "link", "blockquote", "hr"])
  .use(require("markdown-it-linkscheme"));

const Message = ({
  message,
  lastMessage,
  user,
  index,
  socket,
}: MessageProps) => {
  const [showLinkAlert, setShowLinkAlert] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [msgOptions, setMsgOptions] = useState(false);

  const renderRules = useMemo(() => {

    const rules: RenderRules = {
      paragraph: (node, children) => (
        <MessageContent
          isRight={message.author.id === user.id}
          key={node.key}
        >
          {children}
        </MessageContent>
      ),
      link: (node, children) => (
        <MessageLink
          onPress={() => alertLink(node.attributes.href)}
          onLongPress={() => copyLink(node.attributes.href)}
          key={node.key}
        >
          {children}
        </MessageLink>
      ),
      code_inline: (node) => (
        <MessageCodeInline key={node.key}>
          {node.content}
        </MessageCodeInline>
      ),
      fence: (node) => {
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
    }

    return rules
  }, [message, lastMessage, user, index])

  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleGoUserProfile = (userID: string) => {
    navigation.navigate("UserProfile", { id: userID });
  };

  const renderAuthor = useCallback(() => {
    if (index === 0 || lastMessage.author.id !== message.author.id) {
      return (
        <MessageAuthorContainer
          onPress={() => handleGoUserProfile(message.author.id)}
        >
          {message.author.avatar ? (
            <MessageAvatar
              defaultSource={require("../../../assets/avatar-placeholder.png")}
              source={{ uri: message.author.avatar.url }}
              width={22}
              height={22}
            />
          ) : (
            <MessageAvatar
              source={require("../../../assets/avatar-placeholder.png")}
              width={22}
              height={22}
            />
          )}
          <MessageAuthorName>{message.author.name}</MessageAuthorName>
        </MessageAuthorContainer>
      );
    }
  }, [message, lastMessage, index]);

  const renderDate = () => {
    if (index === 0) {
      return (
        <MessageDateContainer>
          <MessageDate>{formatHour(message.created_at)}</MessageDate>
        </MessageDateContainer>
      );
    } else {
      const date = (date: string) => parseISO(date);
      const same = isSameMinute(
        date(message.created_at),
        date(lastMessage.created_at)
      );

      if (!same) {
        return (
          <MessageDateContainer>
            <MessageDate>{formatHour(message.created_at)}</MessageDate>
          </MessageDateContainer>
        );
      } else {
        return <></>;
      }
    }
  };

  const formatHour = useCallback((date: string) => {
    const isoDate = parseISO(date);
    const tzDate = convertToTimeZone(isoDate, {
      timeZone: Localize.timezone,
    });

    return format(tzDate, "dd/MM/yy, HH:mm");
  }, []);

  const deleteMessage = useCallback(() => {
    socket.emit("delete_user_message", message.id);
  }, []);

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

  const renderFiles = useCallback(() => {
    if(message.files) {
      return message.files.map((file) => {
        return (
          <FilePreview
            key={file.id}
            name={file.original_name}
            url={file.url}
            size={file.size}
            type={file.type}
          />
        );
      })
    }
  }, [message.files])

  const handleCloseMsgOptions = () => setMsgOptions(false)

  return (
    <>
      <Container key={index} isRight={message.author.id === user.id}>
        <MessageContentContainer
          isRight={message.author.id === user.id}
          onLongPress={() => setMsgOptions(true)}
        >
          <Alert
            title="⚠ Cuidado, pode ser perigoso"
            content={`Tem certeza que quer acessar este link? Não podemos garantir sua segurança ao acessá-lo. \n\n${linkUrl}`}
            cancelButtonText="Não"
            okButtonText="Acessar"
            cancelButtonAction={closeLink}
            okButtonAction={openLink}
            visible={showLinkAlert}
          />
          <MessageOptions
            close={handleCloseMsgOptions}
            visible={msgOptions}
            message={message}
            options={[
              {
                iconName: "corner-up-right",
                content: "Responder",
                action: () => {},
                onlyOwner: false,
              },
              {
                iconName: "trash-2",
                content: "Excluir mensagem",
                action: deleteMessage,
                color: colors.red,
                onlyOwner: true,
              },
            ]}
          />
          <Markdown
            markdownit={markdownRules}
            rules={renderRules}
            mergeStyle
          >
            {message.message}
          </Markdown>
          {message.voice_message && (
            <AudioPlayer audio={message.voice_message} />
          )}
          {renderFiles()}
        </MessageContentContainer>
        {renderDate()}
        {renderAuthor()}
      </Container>
    </>
  );
};

export default memo(Message, (prev, next) => {
  return prev.message.id !== next.message.id;
});
