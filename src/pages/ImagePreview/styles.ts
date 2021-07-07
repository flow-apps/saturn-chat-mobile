import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: #111;
  z-index: -5;
`;

export const ImageContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Image = styled(Animated.Image)`
  width: 100%;
  height: 100%;
`;
