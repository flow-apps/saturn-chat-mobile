import React from 'react';
import { RadioButton } from 'react-native-paper/lib/module/components/RadioButton';
import { useTheme } from 'styled-components';

interface RadioProps {
  value: string;
  selectedValue: string;
  color?: string;
  onValueChange: (value: string) => void
}

const Radio = ({ color, value, selectedValue, onValueChange }: RadioProps) => {

  const { colors } = useTheme()

  return (
    <RadioButton 
      value={value}
      status={selectedValue === value ? "checked" : "unchecked"}
      uncheckedColor={color || colors.light_gray}
      color={color || colors.secondary}
      onPress={() => onValueChange(value)}
    />
  );
}

export default Radio;