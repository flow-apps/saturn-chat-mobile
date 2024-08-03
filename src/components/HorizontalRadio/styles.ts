import fonts from '@styles/fonts';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
`;

export const ButtonContainer = styled.TouchableOpacity`
  padding: 10px 25px;
  background-color: ${props => props.theme.colors.shape};
  color: ${(props) => props.theme.colors.black};
  margin-right: 10px;
  border-radius: 25px;
  border: 1.5px solid ${props => props.theme.colors.shape};
  font-family: ${fonts.text};
`

export const ButtonText = styled.Text``;
