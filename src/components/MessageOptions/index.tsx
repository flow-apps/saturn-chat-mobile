import React, { memo, useCallback } from "react";
import {
  Container,
  MessageAvatar,
  MessageInfos,
  MessageInfosContainer,
  MessageOptionsContainer,
  MessageOptionsModal,
  MessageText,
  Option,
  OptionText,
  UserName,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { MessageData } from "../../../@types/interfaces";
import { useAuth } from "../../contexts/auth";
import { TouchableOpacity, StatusBar } from "react-native";
import { ParticipantRoles } from "../../../@types/enums";
import { View } from "moti";

export interface IOptions {
  content: string;
  action: () => unknown;
  onlyOwner: boolean;
  showInDM: boolean;
  iconName?: keyof typeof Feather.glyphMap;
  color?: string;
  authorizedRoles: ParticipantRoles[] | string[];
}

interface IMessageOptionsProps {
  visible: boolean;
  message: MessageData;
  options: IOptions[];
  participant_role: ParticipantRoles;
  close: () => void;
}

const MessageOptions = ({
  visible,
  close,
  message,
  options = [],
  participant_role,
}: IMessageOptionsProps) => {
  const { user } = useAuth();
  const handleExecAction = useCallback((action: () => any) => {
    close();

    if (action) {
      action();
    }
  }, []);

  const canShowOptionChecker = (option: IOptions) => {
    const roles = option.authorizedRoles;
    const groupType = message.group.type;
    const authorId = message.author.id;

    if (!option.showInDM && groupType === "DIRECT") {
      return false;
    }

    if (option.onlyOwner && authorId !== user.id && groupType === "DIRECT") {
      return false;
    }

    if (roles[0] === "ALL") {
      return true;
    }

    if (
      option.onlyOwner &&
      authorId !== user.id &&
      !roles.includes(participant_role)
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
      <Container
        visible={visible}
        onRequestClose={close}
        onDismiss={close}
        animationType="fade"
        statusBarTranslucent
        transparent
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={close}
          style={{ flex: 1 }}
        >
          <MessageOptionsContainer>
            <MessageInfosContainer>
              <MessageAvatar uri={message.author?.avatar?.url} />
              <MessageInfos>
                <UserName>{message.author.name}</UserName>
                  <MessageText
                    ellipsizeMode="tail"
                    lineBreakMode="tail"
                    numberOfLines={1}
                    textBreakStrategy="highQuality"
                  >
                    {!!message.voice_message && "🎤 Mensagem de voz"}
                    {message.files.length > 0 &&
                      `(${message.files.length} arquivos) `}
                    {!!message.message && message.message}
                  </MessageText>
              </MessageInfos>
            </MessageInfosContainer>
            <MessageOptionsModal>
              <StatusBar barStyle="light-content" />
              {options.map((option, index) =>
                canShowOptionChecker(option) ? (
                  <Option
                    key={index}
                    onPress={() => handleExecAction(option.action)}
                  >
                    <OptionText color={option.color}>
                      {option.iconName && (
                        <Feather name={option.iconName} size={18} />
                      )}{" "}
                      {option.content}
                    </OptionText>
                  </Option>
                ) : (
                  !option.onlyOwner && (
                    <Option
                      key={index}
                      onPress={() => handleExecAction(option.action)}
                    >
                      <OptionText color={option.color}>
                        {option.iconName && (
                          <Feather name={option.iconName} size={18} />
                        )}{" "}
                        {option.content}
                      </OptionText>
                    </Option>
                  )
                )
              )}
            </MessageOptionsModal>
          </MessageOptionsContainer>
        </TouchableOpacity>
      </Container>
    </>
  );
};

export default MessageOptions;
