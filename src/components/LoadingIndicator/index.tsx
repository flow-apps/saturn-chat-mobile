import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

const LoadingIndicator: React.FC = () => {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      style={{ margin: 10 }}
      size="large"
      color={colors.primary}
    />
  );
};

export default LoadingIndicator;
