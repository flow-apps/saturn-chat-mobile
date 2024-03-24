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
import { MessageData } from "@type/interfaces";
import { millisToTime } from "@utils/format";
import { MotiView } from "moti";
import { useTranslate } from "@hooks/useTranslate";

interface CurrentReplyingMessageProps {
  message: MessageData;
  onRemoveReplying: () => void;
}

const CurrentReplyingMessage = ({
  message,
  onRemoveReplying,
}: CurrentReplyingMessageProps) => {
  const { colors } = useTheme();
  const { t } = useTranslate("Components.Chat.ReplyingMessage");

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
          {t("file_amount", { count: message.files.length })}){" "}
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
    <>
      <MotiView
        from={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 120 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{
          type: "timing",
          duration: 350,
        }}
      >
        <ReplyingMessageContainer>
          <ReplyingMessageContentContainer>
            <ReplyingMessageTitleWrapper>
              <ReplyingMessageTitle>
                <Feather name="corner-up-right" /> {t("replying_text")}
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
      </MotiView>
    </>
  );
};

export default memo(CurrentReplyingMessage, (prev, next) => {
  return prev.message.id === next.message.id;
});
