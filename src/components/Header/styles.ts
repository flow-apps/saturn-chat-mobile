import { MotiView } from "moti";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.View`
  width: 100%;
  padding: 0px 10px;
  height: ${getStatusBarHeight() + 60}px;
  padding-top: ${getStatusBarHeight()}px;
  background: ${(props) => props.theme.colors.primary};
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const HeaderTitle = styled.Text`
  max-width: 320px;
  font-size: 20px;
  font-family: ${fonts.heading};
  color: #fff;
  margin-left: 5px;
`;

export const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LeftContainer = styled(RightContainer)``;

export const HeaderButton = styled.TouchableOpacity`
  margin: 0px 5px;
`;
