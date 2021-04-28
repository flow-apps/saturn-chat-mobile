import React from "react";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface SwitchProps {
  value?: boolean;
  onValueChange?: () => void;
}

const Switcher = ({ value = false, onValueChange }: SwitchProps) => {
  const { colors } = useTheme();

  return (
    <Container
      circleSize={30}
      barHeight={23}
      circleActiveColor={colors.secondary}
      circleBorderActiveColor={colors.secondary}
      circleInActiveColor={colors.light_heading}
      circleBorderWidth={0}
      backgroundInactive={colors.dark_gray}
      backgroundActive={colors.light_secondary}
      activeText=""
      inActiveText=""
      value={value}
      onValueChange={onValueChange}
    />
  );
};

export default Switcher;
