import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.shape};
  padding: 20px;
  width: 100%;
`;

export const ActionTitle = styled.Text`
  margin-bottom: 15px;
  font-family: ${fonts.heading};
  color: ${props => props.theme.colors.dark_heading};
  font-size: 16px;
`

export const ActionsContainer = styled.View`
  flex-direction: row;
`

export const ActionButtonContainer = styled.View`
  margin: 0 30px;
`

export const ActionButton = styled.TouchableOpacity<{ color: string }>`
  background-color: ${props => props.color};
  padding: 12px 20px;
  border-radius: 30px;
`

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: ${fonts.text};
`
