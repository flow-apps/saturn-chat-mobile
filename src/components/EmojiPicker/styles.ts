import { memo } from "react";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
  height: 200px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 12px;
`;

export const EmojiContainer = memo(styled.TouchableOpacity`
  flex: 1;
  width: 35px;
  margin-right: 5px;
`);

export const Emoji = styled.Text`
  font-size: 26px;
`;
