import React, { memo } from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { ButtonText, Container } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
}

const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <Container {...rest}>
      <ButtonText>{title}</ButtonText>
    </Container>
  );
};

export default memo(Button);
