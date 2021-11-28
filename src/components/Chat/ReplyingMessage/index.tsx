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

const ReplyingMessage: React.FC = () => {
  const [readAll, setReadAll] = useState(false);

  const text = "Olá";

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
          <ReplyingMessageAuthorName>Pedro Henrique</ReplyingMessageAuthorName>
        </ReplyingMessageAuthorWrapper>
        <ReplyingMessageContentContainer>
          <ReplyingMessageContent numberOfLines={readAll ? undefined : 2}>
            {text}
          </ReplyingMessageContent>
          {text.length > 72 && (
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
