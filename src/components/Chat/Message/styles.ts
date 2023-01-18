import styled from "styled-components/native";
import fonts from "../../../styles/fonts";
import CachedImage from "../../CachedImage";

interface IMessageProps {
  isRight?: boolean;
  sended?: boolean;
}
export const Container = styled.View<IMessageProps>`
  align-items: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  width: 100%;
  padding: 0 10px;
  margin: 5px 3px 5px;
  /* transform: rotate(180deg); */
`;

export const MessageAuthorContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

export const MessageAvatar = styled(CachedImage)`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  margin-right: 5px;
`;

export const MessageAuthorName = styled.Text`
  font-size: 12px;
  font-family: ${fonts["text-bold"]};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const MessageContentContainer = styled.Pressable<IMessageProps>`
  position: relative;
  background-color: ${(props) =>
    !props.isRight ? props.theme.colors.shape : props.theme.colors.primary};
  opacity: ${props => props.sended ? 1 : 0.5};
  padding: 10px;
  border-radius: 8px;
  min-width: 30%;
  max-width: 85%;
`;

export const MessageContent = styled.Text<IMessageProps>`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => (props.isRight ? "#fff" : props.theme.colors.black)};
  margin: 5px 0px;
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
  margin-bottom: -3px;
`;

export const MessageDate = styled.Text`
  color: ${(props) => props.theme.colors.dark_heading};
  font-family: ${fonts.text};
  font-size: 10px;
`;
