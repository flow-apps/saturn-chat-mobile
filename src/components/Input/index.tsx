import React from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface InputProps extends TextInputProps {}

const Input = ({ ...rest }: InputProps) => {
  const { colors } = useTheme();

  return (
    <Container
      placeholderTextColor={colors.dark_gray}
      as={TextInput}
      {...rest}
    />
  );
};

export default Input;
