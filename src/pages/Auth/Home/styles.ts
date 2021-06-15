import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const ImageWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-top: 100px;
`;

export const HeroImage = styled.Image``;

export const Title = styled.Text`
  font-family: ${fonts.heading};
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
  color: ${(props) => props.theme.colors.black};
`;

export const Subtitle = styled.Text`
  font-size: 18px;
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
