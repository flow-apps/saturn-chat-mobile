import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
`;

export const ParticipantOptionsContainer = styled.View``;

export const ParticipantOptionsTitle = styled.Text`
  color: ${props => props.theme.colors.black};
  font-family: ${fonts.hero};
  font-size: 20px;
  margin: 10px 0;
` 

export const ParticipantOptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const ParticipantOptions = styled.View`
  margin-top: 15px;
`

export const OptionNameWrapper = styled.View``

export const OptionInputWrapper =  styled.View``

export const OptionName = styled.Text<{ color?: string }>`
  color: ${props => props.color || props.theme.colors.black};
  font-family: ${fonts.text};
  font-size: 16px;
`
