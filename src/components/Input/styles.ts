import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
`;

export const MainInput = styled.TextInput<{ focused: boolean }>`
  font-family: ${fonts.text};
  font-size: 16px;
  padding: 5px 4px;  
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.focused ? props.theme.colors.secondary : props.theme.colors.dark_gray};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 8px;
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.light_heading};
  font-size: 18px;
  font-family: ${fonts.heading};
`
