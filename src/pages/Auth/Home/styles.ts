import styled from "styled-components/native";
import fonts from "@styles/fonts";

import LottieView from "lottie-react-native"

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 12px;
`;

export const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-top: 120px;
`;

export const HeroImage = styled(LottieView)`
  width: 300px;
  height: 300px;
`;

export const Title = styled.Text`
  font-family: ${fonts.heading};
  font-size: 22px;
  text-align: center;
  margin: 10px 0px;
  color: ${(props) => props.theme.colors.secondary};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  text-align: center;
  color: ${(props) => props.theme.colors.black};
`;

export const ButtonsContainer = styled.View`
  justify-content: space-between;
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  margin-bottom: 10px;
`;
