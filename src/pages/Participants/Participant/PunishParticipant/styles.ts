import AnimatedLottieView from "lottie-react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import fonts from "../../../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  `;

export const PunishContentContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 10px;
`;

export const PunishTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts["text-bold"]};
  color: ${(props) => props.theme.colors.dark_heading};
  text-align: center;
`;

export const PunishAnimationWrapper = styled.View`
  width: 100%;
  height: 300px;
  margin: -15px 0px;
`;

export const PunishAnimation = styled(AnimatedLottieView)``;

export const PunishDescription = styled.Text`
  text-align: center;
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${(props) => props.theme.colors.light_heading};
`;

export const PunishNotifyContainer = styled.View`
  margin-top: 25px;
  margin-left: -5px;
`

export const PunishNotifyInput = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PunishLabel = styled.Text`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${props => props.theme.colors.black};
  margin-top: 5px;
`

export const ButtonsContainer = styled.View`
  width: 100%;
  margin-top: 10px;
`

export const ButtonAction = styled(RectButton)<{ color?: string }>`
  background-color: ${props => props.color || props.theme.colors.primary};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`

export const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-family: ${fonts.heading};
  font-size: 14px;
`
