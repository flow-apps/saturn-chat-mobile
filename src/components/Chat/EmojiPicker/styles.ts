import { memo } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

interface IContainerProps {
  visible: boolean;
}

export const Container = styled.View<IContainerProps>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  height: 200px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 12px;
  border-radius: 12px;
`;

export const TopOptionsContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
`;

export const TopOption = styled.TouchableOpacity`
  margin-right: 15px;
`;

export const EmojiContainer = memo(styled.TouchableOpacity`
  width: ${Dimensions.get("window").width / 10}px;
  margin-right: 5px;
`);

export const LastEmojisContainer = styled.View`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 10px;
`;

export const LastEmojis = styled.ScrollView``;

export const Emoji = memo(styled.Text`
  font-size: 26px;
`);
