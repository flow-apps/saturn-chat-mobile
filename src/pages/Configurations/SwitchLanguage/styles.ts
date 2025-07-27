import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.secondary};
  font-size: 20px;
  font-family: ${fonts.heading};
  text-align: center;
  margin: 20px 0px;
`

export const Content = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.black};
  margin-top: 20px;
`
