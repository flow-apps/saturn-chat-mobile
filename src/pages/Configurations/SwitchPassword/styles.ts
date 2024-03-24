import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  `;

export const FormContainer = styled.View`
  margin-top: 20px;
  padding: 10px;
`;

export const InputContainer = styled.View`
  margin-bottom: 15px;
`;

export const FieldError = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.red};
`;

export const FieldInfoContainer = styled.View`
  margin-top: 5px;
`;

export const FieldInfo = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
`;

