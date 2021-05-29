import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  width: 100%;
  height: 57px;
  margin-top: ${getStatusBarHeight()}px;
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  width: 320px;
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.white};
`;

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LeftContainer = styled(RightContainer)``;

export const Button = styled.TouchableOpacity`
  margin-right: 15px;
`;
