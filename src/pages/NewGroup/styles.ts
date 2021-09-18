import styled from "styled-components/native";
import fonts from "../../styles/fonts";
import Input from "../../components/Input";
import AnimatedLottieView from "lottie-react-native";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 15px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const SelectGroupPhotoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 35px;
`;

export const SelectGroupPhoto = styled.TouchableOpacity`
  width: 200px;
  height: 200px;
  border-radius: ${200 / 2}px;
  border: 2px dashed ${(props) => props.theme.colors.dark_gray};
  align-items: center;
  justify-content: center;
`;

export const GroupPhoto = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

export const SelectGroupPhotoTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.dark_heading};
  margin-top: 5px;
`;

export const SelectGroupPhotoSubtitle = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.dark_gray};
  text-align: center;
`;

export const FormContainer = styled.KeyboardAvoidingView`
  flex: 1;
  margin-top: 20px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px;
`;

export const TextArea = styled(Input)`
  max-height: 600px;
  margin-bottom: 20px;
`;

export const SwitcherContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 3px;
`;

export const SwitcherText = styled.Text`
  font-size: 18px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const ButtonWrapper = styled.View`
  margin: -5px 0 10px 0;
`;

export const AdWrapper = styled.View`
  margin-top: 15px;
`;

export const ReachedLimitContainer = styled.View`
  align-items: center;
`;

export const ReachedLimitTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
  margin-bottom: 10px;
`;

export const ReachedLimitDescription = styled.Text`
  text-align: center;
  font-size: 15px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.black};
  margin-top: 10px;
`;

export const ReachedLimitStarContainer = styled.View`
  margin-top: 20px;
`;

export const ReachedLimitStarDescription = styled(ReachedLimitDescription)`
  margin-bottom: 10px;
`;

export const AnimationContainer = styled.View`
  margin-top: 60px;
`;

export const Animation = styled(AnimatedLottieView)`
  width: 300px;
  height: 300px;
`;
