import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components/native";
import fonts from "@styles/fonts";

export const Container = styled.View<{
  bgColor?: string;
  $useSafeArea?: boolean;
}>`
  width: 100%;
  padding: 0 15px;
  height: ${(props) =>
    props.$useSafeArea ? getStatusBarHeight(true) + 60 : 60}px;
  padding-top: ${(props) =>
    props.$useSafeArea ? getStatusBarHeight() : 0}px;
  background: ${(props) => props.bgColor || props.theme.colors.primary};
`;

export const HeaderContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const HeaderTitleContainer = styled.View`
  justify-content: center;
  flex: 1;
`;

export const HeaderTitle = styled.Text<{ goBack?: boolean }>`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: #fff;
  ${props => props.goBack ? "flex: 1": ""}
`;

export const RightContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
`;

export const HeaderButton = styled.TouchableOpacity`
  margin: 0 8px;
`;
