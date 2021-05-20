import React from "react";
import { Switch } from "react-native-switch";
import { useTheme } from "styled-components";

interface SwitcherProps {
  currentValue: boolean;
  onChangeValue: () => unknown;
}

const Switcher = ({ currentValue, onChangeValue }: SwitcherProps) => {
  const { colors } = useTheme();

  return (
    <Switch
      circleSize={30}
      barHeight={23}
      changeValueImmediately={true}
      circleActiveColor={colors.secondary}
      circleBorderActiveColor={colors.secondary}
      circleInActiveColor={colors.light_heading}
      circleBorderWidth={0}
      backgroundInactive={colors.dark_gray}
      backgroundActive={colors.light_secondary}
      activeText=""
      inActiveText=""
      onValueChange={onChangeValue}
      value={currentValue}
    />
  );
};

export default Switcher;
