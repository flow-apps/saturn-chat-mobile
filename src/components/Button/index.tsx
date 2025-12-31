import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonText, Container } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  textColor?: string;
  bgColor?: string;
}

const Button = ({ title, textColor, bgColor, ...rest }: ButtonProps) => {
  return (
    <Container bgColor={bgColor} {...rest}>
      <ButtonText textColor={textColor}>{title}</ButtonText>
    </Container>
  );
};

export default Button;
