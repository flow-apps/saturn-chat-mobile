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
  margin-top: 5px;
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

export const MessageContentContainer = styled(RectButton)<IMessageProps>`
  position: relative;
  background-color: ${(props) =>
    !props.isRight
      ? props.theme.colors.light_gray
      : props.theme.colors.primary};
  padding: 15px;
  border-radius: 15px;
  width: 80%;
`;

export const MessageContent = styled.Text<IMessageProps>`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) =>
    props.isRight ? props.theme.colors.white : props.theme.colors.black};
`;

export const MessageCodeBlock = styled.Text`
  font-size: 20px;
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
