import React, { memo, useCallback, useMemo, useState } from "react";
import { MessageData, UserData } from "../../../@types/interfaces";
import {
  Container,
  MessageAuthorContainer,
  MessageAuthorName,
  MessageAvatar,
  MessageContent,
  MessageContentContainer,
  MessageOptionsContainer,
} from "./styles";

interface MessageProps {
  user: UserData;
  message: MessageData;
  lastMessage: MessageData;
  index: number;
  onMention?: () => any;
}

const Message = ({
  message,
  lastMessage,
  user,
  index,
  onMention,
}: MessageProps) => {
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

  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Container isRight={message.author.id === user.id}>
        <MessageContentContainer isRight={message.author.id === user.id}>
          <MessageContent
            onLongPress={() => setShowOptions(true)}
            isRight={message.author.id === user.id}
          >
            {message.message}
          </MessageContent>
        </MessageContentContainer>
        {renderAuthor()}
      </Container>
    </>
  );
};

export default memo(Message);
