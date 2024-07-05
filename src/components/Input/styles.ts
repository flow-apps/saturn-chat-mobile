import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const Container = styled.View``;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const MainInput = styled.TextInput<{ focused: boolean }>`
  font-family: ${fonts.text};
  padding: 5px 4px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.focused
      ? props.theme.colors.secondary
      : props.theme.colors.dark_gray};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.background};
  margin: 8px 0px;
  width: 100%;
  flex: 1;
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.colors.light_heading};
  font-size: 18px;
  font-family: ${fonts.heading};
`;

export const ShowPasswordContainer = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 5px;
`;
