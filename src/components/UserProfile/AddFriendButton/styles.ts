import { DefaultTheme } from "styled-components";
import { FriendsStates } from "../../../../@types/enums";
import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

const selectButtonBorderColor = (theme: DefaultTheme, state?: string) => {
  if (!state) {
    return theme.colors.primary;
  } else if (state === FriendsStates.REQUESTED) {
    return theme.colors.secondary;
  } else {
    return "transparent";
  }
};

export const Container = styled.View``;

export const FriendButton = styled.TouchableOpacity<{ state?: FriendsStates }>`
  padding: 10px 15px;
  border: 2px solid
    ${(props) => selectButtonBorderColor(props.theme, props.state)};
  border-radius: 30px;
  background-color: ${(props) => {
    if (!props.state || props.state === FriendsStates.REQUESTED) {
      return "transparent";
    } else {
      return props.theme.colors.primary;
    }
  }}; ;
`;

export const FriendButtonText = styled.Text<{ state?: FriendsStates }>`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
`;
