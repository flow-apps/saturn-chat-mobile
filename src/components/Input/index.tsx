import React from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Label, MainInput } from "./styles";

interface InputProps extends TextInputProps {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  const { colors } = useTheme();

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <MainInput
        placeholderTextColor={colors.dark_gray}
        as={TextInput}
        {...rest}
      />
    </Container>
  );
};

export default Input;
