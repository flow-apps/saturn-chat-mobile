import React, { memo } from "react";
import {
  ReplyingMessage,
  ReplyingMessageAuthorName,
  ReplyingMessageAuthorNameWrapper,
  ReplyingMessageContainer,
  ReplyingMessageContentContainer,
  ReplyingMessageRemoveButton,
  ReplyingMessageRemoveContainer,
  ReplyingMessageTitle,
  ReplyingMessageTitleWrapper,
  ReplyingMessageWrapper,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { MessageData } from "../../../../@types/interfaces";
import { millisToTime } from "../../../utils/format";
import MessageMark from "../../Markdown/MessageMark";

interface CurrentReplyingMessageProps {
  message: MessageData;
  onRemoveReplying: () => void;
}

const CurrentReplyingMessage = ({
  message,
  onRemoveReplying,
}: CurrentReplyingMessageProps) => {
  const { colors } = useTheme();

  const renderMessageContent = () => {
    if (message.voice_message) {
      return (
        <ReplyingMessage textBreakStrategy="balanced" numberOfLines={2}>
          🎤 Mensagem de voz ({millisToTime(message.voice_message.duration)})
        </ReplyingMessage>
      );
    }

    if (message.files?.length) {
      return (
        <ReplyingMessage textBreakStrategy="balanced" numberOfLines={2}>
          (📂{"  "}
          {message.files.length} arquivos){" "}
          {message.message ? message.message : ""}
        </ReplyingMessage>
      );
    }

    if (message.message) {
      return (
        <ReplyingMessage textBreakStrategy="balanced" numberOfLines={2}>
          {message.message}
        </ReplyingMessage>
      );
    }
  };

  return (
    <ReplyingMessageContainer>
      <ReplyingMessageContentContainer>
        <ReplyingMessageTitleWrapper>
          <ReplyingMessageTitle>
            <Feather name="corner-up-right" /> Você está respondendo:
          </ReplyingMessageTitle>
        </ReplyingMessageTitleWrapper>
        <ReplyingMessageAuthorNameWrapper>
          <ReplyingMessageAuthorName>
            {message.author.name}
          </ReplyingMessageAuthorName>
        </ReplyingMessageAuthorNameWrapper>
        <ReplyingMessageWrapper>
          {renderMessageContent()}
        </ReplyingMessageWrapper>
      </ReplyingMessageContentContainer>
      <ReplyingMessageRemoveContainer>
        <ReplyingMessageRemoveButton onPress={onRemoveReplying}>
          <Feather name="x" size={25} color={colors.black} />
        </ReplyingMessageRemoveButton>
      </ReplyingMessageRemoveContainer>
    </ReplyingMessageContainer>
  );
};

export default memo(CurrentReplyingMessage, (prev, next) => {
  return prev.message.id === next.message.id;
});
