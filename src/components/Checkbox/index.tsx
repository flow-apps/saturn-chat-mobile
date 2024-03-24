import React from "react";
import { Checkbox } from "react-native-paper";
import { useTheme } from "styled-components";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CheckBox = ({ checked, onChange }: CheckboxProps) => {
  const { colors } = useTheme();

  return (
    <Checkbox
      color={colors.secondary}
      status={checked ? "checked" : "unchecked"}
      uncheckedColor={colors.light_gray}
      onPress={onChange}
    />
  );
};

export default CheckBox;
