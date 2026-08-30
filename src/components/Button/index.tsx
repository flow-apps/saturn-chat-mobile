import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonText, Container } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  textColor?: string;
  bgColor?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  textColor,
  bgColor,
  loading = false,
  enabled = true,
  ...rest
}) => {
  return (
    <Container bgColor={bgColor} enabled={enabled && !loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={textColor || "#FFF"} />
      ) : (
        <ButtonText textColor={textColor}>{title}</ButtonText>
      )}
    </Container>
  );
};

export default Button;
