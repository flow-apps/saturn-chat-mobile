import React, { memo, useCallback, useMemo } from "react";
import { TouchableOpacity, StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useAuth } from "@contexts/auth";
import { IMessageOptionsProps, IOptions } from "./types";
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

const MessageOptions = ({
  visible,
  close,
  message,
  options = [],
  participant_role,
  group,
}: IMessageOptionsProps) => {
  const { user } = useAuth();

  const handleExecAction = useCallback(
    (action?: () => void) => {
      close();
      if (action) {
        action();
      }
    },
    [close],
  );

  const canShowOptionChecker = useCallback(
    (option: IOptions) => {
      const roles = option.authorizedRoles;
      const groupType = group?.type;
      const authorId = message?.author?.id;
      const currentUserId = user?.id;

      if (!option.showInDM && groupType === "DIRECT") return false;
      if (
        option.onlyOwner &&
        authorId !== currentUserId &&
        groupType === "DIRECT"
      )
        return false;
      if (roles?.[0] === "ALL") return true;
      if (
        option.onlyOwner &&
        authorId !== currentUserId &&
        !roles?.includes(participant_role)
      )
        return false;
      if (!option.showForAuthor && authorId === currentUserId) return false;

      return true;
    },
    [group?.type, message?.author?.id, participant_role, user?.id],
  );

  const visibleOptions = useMemo(() => {
    return options.filter((option) => canShowOptionChecker(option));
  }, [options, canShowOptionChecker]);

  if (!visible) return null;

  return (
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
              <UserName>{message.author?.name}</UserName>
              {!!message.message && (
                <MessageText textBreakStrategy="highQuality" numberOfLines={3}>
                  {message.message}
                </MessageText>
              )}
            </MessageInfos>
          </MessageInfosContainer>

          <MessageOptionsModal>
            <StatusBar barStyle="light-content" />
            {visibleOptions.map((option) => (
              <Option
                // @ts-ignore
                key={option.id || option.content}
                onPress={() => handleExecAction(option.action)}
              >
                <OptionText color={option.color}>
                  {option.iconName && (
                    <Feather name={option.iconName} size={18} />
                  )}{" "}
                  {option.content}
                </OptionText>
              </Option>
            ))}
          </MessageOptionsModal>
        </MessageOptionsContainer>
      </TouchableOpacity>
    </Container>
  );
};

export default memo(MessageOptions);
