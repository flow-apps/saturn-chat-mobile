import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
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
import { MessageData } from "../../../../@types/interfaces";

interface ReplyingMessageProps {
  replying_message: MessageData;
}

const ReplyingMessage = ({ replying_message }: ReplyingMessageProps) => {
  const [readAll, setReadAll] = useState(false);

  const handleReadMore = () => {
    setReadAll((old) => !old);
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
          <ReplyingMessageAuthorName>{replying_message.author.name}</ReplyingMessageAuthorName>
        </ReplyingMessageAuthorWrapper>
        <ReplyingMessageContentContainer>
          <ReplyingMessageContent numberOfLines={readAll ? undefined : 2}>
            {replying_message.message}
          </ReplyingMessageContent>
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
