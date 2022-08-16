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

import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { MessageData } from "../../../../@types/interfaces";
import { millisToTime } from "../../../utils/format";

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
          <Feather name="mic" size={13} /> Mensagem de voz (
          {millisToTime(message.voice_message.duration)})
        </ReplyingMessage>
      );
    }

    if (message.files?.length) {
      return (
        <ReplyingMessage textBreakStrategy="balanced" numberOfLines={2}>
          (<Feather name="file-minus" size={13} /> {message.files.length}{" "}
          {message.files.length === 1 ? "arquivo" : "arquivos"}){" "}
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
          <Feather name="x-circle" size={25} color={colors.red} />
        </ReplyingMessageRemoveButton>
      </ReplyingMessageRemoveContainer>
    </ReplyingMessageContainer>
  );
};

export default memo(CurrentReplyingMessage, (prev, next) => {
  return prev.message.id === next.message.id;
});
