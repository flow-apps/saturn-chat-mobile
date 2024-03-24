import styled from 'styled-components/native';
import fonts from '@styles/fonts';
import { MotiView } from "moti"

export const Container = styled(MotiView)`
`;

export const RemoveBanner = styled.TouchableOpacity`
  margin-left: auto;
  margin-bottom: 3px;
`

export const RemoveBannerText = styled.Text`
  font-size: 10px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.secondary};
`

export const BannerContainer = styled.View`
  width: 100%;
  align-items: center;
  border: 1px solid ${props => props.theme.colors.secondary};
  padding: 5px;
  border-radius: 5px;
`
