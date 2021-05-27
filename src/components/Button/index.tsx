import React, { memo } from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonText, Container } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  transparent?: boolean;
  textColor?: string;
}

const Button = ({ title, transparent, textColor, ...rest }: ButtonProps) => {
  return (
    <Container transparent={transparent} {...rest}>
      <ButtonText textColor={textColor}>{title}</ButtonText>
    </Container>
  );
};

export default Button;
