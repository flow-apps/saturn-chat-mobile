import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

interface IMessageProps {
  isRight?: boolean;
}
export const Container = styled.View<IMessageProps>`
  align-items: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  width: 100%;
  padding: 0 10px;
  margin: 5px 0;
`;

export const MessageAuthorContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

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

export const MessageContentContainer = styled.TouchableOpacity<IMessageProps>`
  position: relative;
  background-color: ${(props) =>
    !props.isRight ? props.theme.colors.shape : props.theme.colors.primary};
  padding: 12px;
  border-radius: 10px;
  min-width: 30%;
  max-width: 85%;
`;

export const MessageContent = styled.Text<IMessageProps>`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => (props.isRight ? "#fff" : props.theme.colors.black)};
`;

export const MessageCodeBlock = styled.View`
  background-color: ${(props) => props.theme.colors.light_primary};
  padding: 12px;
  border-radius: 8px;
  border: 0.5px solid #fff;
`;

export const MessageCodeBlockText = styled(MessageContent)`
  color: #fff;
  font-size: 12px;
  font-family: ${fonts.code};
`;

export const MessageCodeInline = styled(MessageContent)`
  font-family: ${fonts.code};
  background-color: ${(props) => props.theme.colors.light_primary};
  color: #fff;
`;

export const MessageLink = styled(MessageContent)`
  color: ${(props) => props.theme.colors.secondary};
`;

export const MessageOptionsContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #00000088;
`;

export const MessageDateContainer = styled.View`
  margin-top: 5px;
`;

export const MessageDate = styled.Text`
  color: ${(props) => props.theme.colors.dark_heading};
  font-family: ${fonts.text};
  font-size: 12px;
`;
