import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { useTheme } from "styled-components";
import { Container, Label, MainInput } from "./styles";

interface InputProps extends TextInputProps {
  label?: string;
}

const Input = ({ label, ...rest }: InputProps) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false)

  return (
    <Container
    >
      {label && <Label>{label}</Label>}
      <MainInput
        placeholderTextColor={colors.dark_gray + "88"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused}
        as={TextInput}
        {...rest}
      />

    </Container>
  );
};

export default Input;
