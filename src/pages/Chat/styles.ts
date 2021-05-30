import { memo } from "react";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface IMessageProps {
  isRight?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const KeyBoardAvoid = styled.KeyboardAvoidingView``;

export const ChatContainer = styled.FlatList`
  flex: 1;
  margin-bottom: -5px;
  padding: 20px 5px 0px 5px;
`;

export const FormContainer = styled.View`
  padding: 0 12px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  padding: 12px;
  border-radius: 15px;
  margin: 10px 0 25px 0;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EmojiButton = styled.TouchableOpacity``;

export const OptionsButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

export const SendButton = styled.TouchableOpacity``;

export const MessageInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-family: ${fonts.text};
  margin: 0px 10px;
  max-height: 120px;
`;

export const MessageContainer = styled.View`
  flex: 1;
  padding: 0px 5px 0px 5px;
`;

export const MessageBox = memo(styled.View<IMessageProps>`
  align-items: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  width: 100%;
  padding: 0 10px;
  margin: 5px 0;
`);

export const MessageAuthorContainer = memo(styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`);

export const MessageAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 5px;
`;

export const MessageAuthorName = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const MessageContentContainer = memo(styled.View<IMessageProps>`
  background-color: ${(props) =>
    !props.isRight
      ? props.theme.colors.light_gray
      : props.theme.colors.primary};
  padding: 15px;
  border-radius: 15px;
  width: 80%;
`);

export const MessageContent = styled.Text<IMessageProps>`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) =>
    props.isRight ? props.theme.colors.white : props.theme.colors.black};
`;
