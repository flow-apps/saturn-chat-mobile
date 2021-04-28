import styled from "styled-components/native";
import fonts from "../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 15px;
`;

export const SelectGroupPhotoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const SelectGroupPhoto = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: ${150 / 2}px;
  border: 2px dashed ${(props) => props.theme.colors.dark_gray};
  align-items: center;
  justify-content: center;
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
  margin-top: -5px;
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
  padding: 12px;
  border: 1px solid ${(props) => props.theme.colors.dark_gray};
  font-family: ${fonts.text};
  font-size: 16px;
  margin-bottom: 20px;
`;

export const SwitcherContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SwitcherText = styled.Text`
  font-size: 18px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
`;
