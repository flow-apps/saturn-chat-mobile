import styled from 'styled-components/native';
import fonts from '../../../styles/fonts';

type BannerProps = {
  premium: boolean
}

export const Container = styled.View<BannerProps>`
  display: ${props => props.premium ? "none" : "flex"};
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
`
