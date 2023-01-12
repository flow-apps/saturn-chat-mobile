import React, { memo, useCallback } from "react";
import {
  Container,
  MessageOptionsContainer,
  MessageOptionsModal,
  Option,
  OptionText,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { MessageData } from "../../../@types/interfaces";
import { useAuth } from "../../contexts/auth";
import { TouchableOpacity, StatusBar } from "react-native";
import { ParticipantRoles } from "../../../@types/enums";

export interface IOptions {
  content: string;
  action: () => unknown;
  onlyOwner: boolean;
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
            <MessageOptionsModal>
              <StatusBar barStyle="light-content" />
              {options.map((option, index) =>
                (option.onlyOwner && message.author.id === user?.id) ||
                option.authorizedRoles[0] === "ALL" ||
                option.authorizedRoles.includes(participant_role) ? (
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
