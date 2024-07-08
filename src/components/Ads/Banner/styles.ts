import styled from 'styled-components/native';
import fonts from '@styles/fonts';
import { MotiView } from "moti"

export const Container = styled(MotiView)`
  margin: 5px 0px;
`;

export const RemoveBanner = styled.TouchableOpacity`
  margin-left: auto;
  margin-bottom: 3px;
`

export const RemoveBannerText = styled.Text`
  font-size: 11px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.secondary};
`

export const BannerContainer = styled.View`
  width: 100%;
  align-items: center;
  border: 2px dashed ${props => props.theme.colors.secondary};
  padding: 5px;
  border-radius: 5px;
`
