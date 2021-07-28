import styled from 'styled-components/native';
import LottieView from "lottie-react-native"
import fonts from '../../../styles/fonts';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.shape};
  padding: 5px;
`;

export const TypingContainer = styled.View`
  flex-direction: row;
  max-width: 100%;
`

export const TypingLeftSide = styled.View`
  justify-content: center;
  width: 50px;
`

export const TypingRightSide = styled.View`
  align-items: center;
  justify-content: center;
`

export const TypingAnimation = styled(LottieView)`
  flex: 1;
  margin-left: -15px;
`

export const TypingUsersContainer = styled.View`
`

export const TypingUsersText = styled.Text`
  max-width: ${Dimensions.get("screen").width - 35}px;
  font-size: 14px;
  font-family: ${fonts.text};
  margin-top: 5px;
  margin-left: -25px;
  color: ${props => props.theme.colors.black};
`
