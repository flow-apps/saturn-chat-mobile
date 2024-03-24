import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  Container,
  ReplyingMessageAuthorWrapper,
  ReplyingMessageAuthorName,
  ReplyingMessageWrapper,
  ReplyingTitle,
  ReplyingTitleContainer,
  ReplyingMessageContentContainer,
  ReplyingMessageContent,
  ReadMoreButton,
  ReadMoreText,
} from "./styles";
import { MessageData } from "@type/interfaces";
import { millisToTime } from "@utils/format";
import { useTranslate } from "@hooks/useTranslate";

interface ReplyingMessageProps {
  replying_message: MessageData;
}

const ReplyingMessage = ({ replying_message }: ReplyingMessageProps) => {
  const [readAll, setReadAll] = useState(false);

  const {} = useTranslate("")

  const handleReadMore = () => {
    setReadAll((old) => !old);
  };

  const getMessageContent = () => {
    const { files, message, voice_message } = replying_message;

    if (files?.length) {
      if (message) {
        return (
          <ReplyingMessageContent numberOfLines={readAll ? undefined : 2}>
            <Feather name="file" /> ({files.length} arquivos) {message}
          </ReplyingMessageContent>
        );
      } else {
        return (
          <ReplyingMessageContent>
            <Feather name="file" /> {files.length} arquivos
          </ReplyingMessageContent>
        );
      }
    }

    if (voice_message) {
      return (
        <ReplyingMessageContent>
          <Feather name="mic" /> Mensagem de voz (
          {millisToTime(voice_message.duration)})
        </ReplyingMessageContent>
      );
    }

    return (
      <ReplyingMessageContent numberOfLines={readAll ? undefined : 2}>
        {message}
      </ReplyingMessageContent>
    );
  };

  return (
    <Container>
      <ReplyingTitleContainer>
        <ReplyingTitle>
          <Feather name="corner-up-right" /> Respondendo:
        </ReplyingTitle>
      </ReplyingTitleContainer>
      <ReplyingMessageWrapper>
        <ReplyingMessageAuthorWrapper>
          <ReplyingMessageAuthorName>
            {replying_message.author.name}
          </ReplyingMessageAuthorName>
        </ReplyingMessageAuthorWrapper>
        <ReplyingMessageContentContainer>
          {getMessageContent()}
          {replying_message.message.length > 72 && (
            <ReadMoreButton onPress={handleReadMore}>
              <ReadMoreText>
                {readAll ? "[Ler menos]" : "[Ler mais]"}
              </ReadMoreText>
            </ReadMoreButton>
          )}
        </ReplyingMessageContentContainer>
      </ReplyingMessageWrapper>
    </Container>
  );
};

export default ReplyingMessage;
