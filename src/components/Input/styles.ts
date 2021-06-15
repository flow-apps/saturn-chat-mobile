import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.TextInput`
  border-radius: 10px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${(props) => props.theme.colors.black};
`;
