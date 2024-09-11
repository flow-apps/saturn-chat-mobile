import React from "react";
import {
  ButtonContainer,
  ButtonsContainer,
  ButtonText,
  Container,
} from "./styles";
import { useTheme } from "styled-components";

interface IHorizontalRadioProps {
  buttons: {
    key: string;
    value: any;
  }[];
  onChangeValue: (newValue: any) => void;
  currentValue: any;
}

const HorizontalRadio: React.FC<IHorizontalRadioProps> = ({
  buttons,
  currentValue,
  onChangeValue,
}) => {
  const { colors } = useTheme();

  return (
    <Container horizontal>
      <ButtonsContainer>
        {buttons.map((button) => (
          <ButtonContainer
            style={{
              borderColor:
                currentValue === button.value ? colors.primary : colors.shape,
            }}
            onPress={() => onChangeValue(button.value)}
          >
            <ButtonText>{button.key}</ButtonText>
          </ButtonContainer>
        ))}
      </ButtonsContainer>
    </Container>
  );
};

export default HorizontalRadio;
