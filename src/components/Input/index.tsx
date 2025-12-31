import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { useTheme } from "styled-components";
import {
  Container,
  InputContainer,
  Label,
  MainInput,
  ShowPasswordContainer,
} from "./styles";
import { Feather } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label?: string;
}

const Input = ({
  label,
  textContentType,
  secureTextEntry,
  keyboardType,
  ...rest
}: InputProps) => {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <MainInput
          placeholderTextColor={colors.dark_heading + "88"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          focused={focused}
          as={TextInput}
          textContentType={textContentType}
          secureTextEntry={!showPassword}
          keyboardType={
            showPassword && textContentType === "password"
              ? "visible-password"
              : keyboardType
          }
          {...rest}
        />

        {textContentType === "password" && (
          <ShowPasswordContainer onPress={() => setShowPassword((old) => !old)}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={colors.black}
            />
          </ShowPasswordContainer>
        )}
      </InputContainer>
    </Container>
  );
};

export default Input;
