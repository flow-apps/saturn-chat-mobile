import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 12px;
`;


export const AvatarContainer = styled.View`
  position: relative;
  width: 100%;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin: 15px 0px;
  z-index: -1;
`;

export const AvatarImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: ${150 / 2}px;
`;

export const SwitchAvatarButton = styled.TouchableOpacity`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: ${150 / 2}px;
  z-index: 5;
  background-color: #00000055;
  align-items: center;
  justify-content: center;
`;

export const SwitchAvatarButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: ${fonts.text};
`

export const FormContainer = styled.View``

export const FieldsContainer = styled.View`
  margin-bottom: 15px;
`

export const FieldContainer = styled.View`
  margin-bottom: 15px;
`
