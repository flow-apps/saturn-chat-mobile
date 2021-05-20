import React from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Container } from "./styles";

interface InputProps extends TextInputProps {}

const Input = ({ ...rest }: InputProps) => {
  return <Container as={TextInput} {...rest} />;
};

export default Input;
