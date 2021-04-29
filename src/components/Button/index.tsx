import React, { memo } from "react";
import { ButtonText, Container } from "./styles";

interface ButtonProps {
  title: string;
}

const Button = ({ title }: ButtonProps) => {
  return (
    <Container>
      <ButtonText>{title}</ButtonText>
    </Container>
  );
};

export default memo(Button);
