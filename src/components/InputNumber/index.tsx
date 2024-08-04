import React from "react";
import {
  ActionButtonContainer,
  Container,
  InfinityText,
  InputField,
} from "./styles";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

interface IInputNumberProps {
  currentValue: number;
  onChangeValue: (newValue: number) => void;
  min?: number;
  max?: number;
  infinity?: boolean;
  step?: number;
}

const InputNumber: React.FC<IInputNumberProps> = ({
  onChangeValue,
  currentValue,
  infinity,
  min,
  max,
}) => {
  const add = () => {

    if (infinity)
      return;

    if (max && currentValue + 1 >= max) {
      onChangeValue(currentValue + 1);
    } else if (!max) {
      onChangeValue(currentValue + 1);
    }
  };
  const sub = () => {
    if (infinity)
      return;

    if (min && currentValue - 1 >= min) {
      onChangeValue(currentValue - 1);
    } else if (!min) {
      onChangeValue(currentValue - 1);
    }
  };

  const { colors } = useTheme()

  return (
    <Container>
      <ActionButtonContainer onPress={sub}>
        <Feather name="minus" size={25} color={colors.primary} />
      </ActionButtonContainer>
      {infinity ? (
        <InfinityText>
          <MaterialCommunityIcons name="infinity" size={18} />
        </InfinityText>
      ) : (
        <InputField
          keyboardType="number-pad"
          onChangeText={(text: string) => onChangeValue(Number(text))}
          value={String(currentValue)}
        />
      )}
      <ActionButtonContainer onPress={add}>
        <Feather name="plus" size={25} color={colors.primary} />
      </ActionButtonContainer>
    </Container>
  );
};

export default InputNumber;
