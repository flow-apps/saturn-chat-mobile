import React from "react";
import { Switch } from "react-native";
import { useTheme } from "styled-components";

interface SwitcherProps {
  currentValue: boolean;
  onChangeValue: (value: boolean) => any;
}

const Switcher = ({ currentValue, onChangeValue }: SwitcherProps) => {
  const { colors } = useTheme();

  return (
    <Switch
      onValueChange={onChangeValue}
      value={currentValue}
      style={{ transform: [{ scale: 1.3 }] }}
      thumbColor={currentValue ? colors.secondary : colors.light_gray}
      trackColor={{ true: colors.light_secondary, false: colors.dark_gray }}
    />
  );
};

export default Switcher;
