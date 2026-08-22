import fonts from "@styles/fonts";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 15px;
`;

export const Title = styled.Text`
  font-family: ${fonts["hero"]};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.black};
  margin: 15px 0%;
`;

export const Subtitle = styled.Text`
  font-family: ${fonts["text"]};
  color: ${({ theme }) => theme.colors.black};
`;

export const FormContainer = styled.View``;

export const InputContainer = styled.View`
  margin: 10px 0px;
`;
