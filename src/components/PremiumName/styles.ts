import styled from 'styled-components/native';
import { PremiumNameProps } from '.';
import fonts from '@styles/fonts';

interface EmblemProps {
  isPremium: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NameContainer = styled.View``

export const Name = styled.Text<PremiumNameProps>`
  font-size: ${props => props.nameSize || 16}px;
  font-family: ${props => fonts[props.fontFamily || "heading"]};

  color: ${props => props.color || props.theme.colors.black};
`

export const EmblemContainer = styled.TouchableOpacity<EmblemProps>`
  display: ${props => props.isPremium ? "flex" : "none"};
  margin-right: 5px;
`
