import styled from "styled-components/native";
import fonts from "@styles/fonts";

import LottieView from "lottie-react-native"

export const BoardImage = styled(LottieView)`
  width: 300px;
  height: 300px;
`

export const BoardTitle = styled.Text`
  font-size: 22px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  margin-bottom: 15px;
`

export const BoardSubTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.light_heading};
  text-align: center;
`

export const ActionButton = styled.TouchableOpacity`
  padding: 12px;
`

export const ActionButtonText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.primary}
`
