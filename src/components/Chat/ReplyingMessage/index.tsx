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

  const { t } = useTranslate("Components.Chat.ReplyingMessage");

  const handleReadMore = () => {
    setReadAll((old) => !old);
  };

  const getMessageContent = () => {
    const { files, message, voice_message } = replying_message;

    if (files?.length) {
      if (message) {
        return (
          <ReplyingMessageContent numberOfLines={readAll ? undefined : 2}>
            <Feather name="file" /> ({files.length}{" "}
            {t("files", { count: files.length })}) {message}
          </ReplyingMessageContent>
        );
      } else {
        return (
          <ReplyingMessageContent>
            <Feather name="file" /> {files.length}{" "}
            {t("files", { count: files.length })}
          </ReplyingMessageContent>
        );
      }
    }

    if (voice_message) {
      return (
        <ReplyingMessageContent>
          <Feather name="mic" /> {t("voice_message")} (
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
          <Feather name="corner-up-right" /> {t("replying")}
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
          {replying_message.message.length > 80 && (
            <ReadMoreButton onPress={handleReadMore}>
              <ReadMoreText>
                {readAll ? `[${t("read_less")}]` : `[${t("read_more")}]`}
              </ReadMoreText>
            </ReadMoreButton>
          )}
        </ReplyingMessageContentContainer>
      </ReplyingMessageWrapper>
    </Container>
  );
};

export default ReplyingMessage;
