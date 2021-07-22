import styled from "styled-components/native";
import fonts from "../../styles/fonts";

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

export const Input = styled.TextInput`
  border-radius: 10px;
  padding: 15px;
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  font-family: ${fonts.text};
  font-size: 16px;
  margin-bottom: 20px;
  max-height: 400px;
  color: ${(props) => props.theme.colors.black};
`;

export const TextArea = styled(Input)`
  max-height: 600px;
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
`
