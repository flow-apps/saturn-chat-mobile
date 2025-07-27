import styled from "styled-components/native";
import LottieView from "lottie-react-native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const AnimationView = styled.View`
  flex: 1;
  width: 100px;
  height: 100px;
`;

export const Lottie = styled(LottieView)`
  width: 100%;
  height: 100%;
`;
