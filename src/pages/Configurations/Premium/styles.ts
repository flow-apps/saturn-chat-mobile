import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';

import LottieView from "lottie-react-native"
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const ContentWrapper = styled.View`
  padding: 0px 15px;
`

export const StarContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: -40px 0px 25px 0px;
`

export const StarAnimation = styled(LottieView)`
  width: 300px;
  height: 300px;
  margin-bottom: -75px;
`

export const StarTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.secondary};
`

export const TitleWrapper = styled.View``

export const Title = styled.Text`
  font-family: ${fonts.hero};
  font-size: 20px;
  line-height: 28px;
  color: ${props => props.theme.colors.black};
`;

export const SubtitleWrapper = styled.View``

export const Subtitle = styled.Text`
  font-size: 15px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.light_heading};
  margin-top: 5px;
`

export const BuyWrapper = styled.View`
  margin: 10px 0px;
`

export const BuyBonusText = styled.Text`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  font-family: ${fonts.heading};
  font-size: 15px;
  margin-bottom: 5px;
`

export const BuyButton = styled(RectButton)`
  background-color: ${props => props.theme.colors.green};
  padding: 10px;
  border-radius: 5px;
`

export const BuyButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-family: ${fonts.text};
`

export const VantagesWrapper = styled.View`
  margin-top: 5px;
`

export const VantagesTitle = styled.Text`
  font-family: ${fonts.hero};
  font-size: 18px;
  color: ${props => props.theme.colors.black};
  margin: 10px 0px;
`

export const VantagesContainer = styled.View``

export const VantageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`

export const VantageIconContainer = styled.View`
`

export const VantageIcon = styled.Text`
`

export const VantageContent = styled.Text`
  font-family: ${fonts.text};
  font-size: 16px;
  color: ${props => props.theme.colors.black};
  margin: 0px 15px;
  margin-top: 5px;
`
