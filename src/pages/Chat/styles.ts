import styled from "styled-components/native";
import fonts from "@styles/fonts";
import { FlatList, Platform } from "react-native";

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == "ios" ? "padding" : "padding",
})`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
`;

export const Messages = styled.FlatList`
` as unknown as typeof FlatList;

export const MessageContainer = styled.View`
  flex: 1;
  padding: 0px 5px 0px 5px;
  transform: rotate(180deg);
`;
