import { memo } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  height: 200px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 12px;
`;

export const EmojiContainer = memo(styled.TouchableOpacity`
  width: ${Dimensions.get("window").width / 10}px;
  margin-right: 5px;
`);

export const EmojiTitle = styled.Text`
  font-family: ${fonts.heading};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 10px;
`;

export const Emoji = memo(styled.Text`
  font-size: 26px;
`);
