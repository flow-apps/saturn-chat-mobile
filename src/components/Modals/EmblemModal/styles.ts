import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import fonts from '@styles/fonts';

export const Container = styled.Modal`
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: #00000055;
  align-items: center;
  justify-content: center;
`

export const ModalCardContainer = styled.View`
  background-color: ${props => props.theme.colors.shape};
  width: 380px;
  max-width: 500px;
  border-radius: 8px;
  padding: 20px 12px;
`

export const ModalAnimationContainer = styled.View`
  width: 100%;
  height: 200px;
`

export const ModalAnimation = styled(AnimatedLottieView)``

export const ModalTitle = styled.Text`
  text-align: center;
  font-family: ${fonts.heading};
  font-size: 20px;
  color: ${props => props.theme.colors.black};
  margin-bottom: 15px;
`

export const ModalContent = styled.Text`
  font-family: ${fonts.text};
  font-size: 14px;
  color: ${props => props.theme.colors.dark_heading};
  text-align: center;
`

export const ModalButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary};
  padding: 5px;
  border-radius: 25px;
  margin-top: 10px;
`

export const ModalButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-family: ${fonts.text};
  margin-top: 5px;
`
