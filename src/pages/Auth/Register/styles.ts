import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export const FormContainer = styled.View`
  margin-top: 50px;
  padding: 15px;
`;

export const SelectAvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const SelectAvatarButton = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: ${200 / 2}px;
  border: 2px dashed ${(props) => props.theme.colors.dark_gray};
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

export const SelectAvatarTitle = styled.Text`
  font-size: 20px;
  font-family: ${fonts.heading};
  margin-top: 10px;
  color: ${(props) => props.theme.colors.dark_heading};
`;

export const SelectAvatarSubtitle = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const InputsContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const FormField = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

export const FieldError = styled.Text`
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.red};
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.dark_heading};
`;

export const FieldInfoContainer = styled.View`
  margin-top: 5px;
`;

export const FieldInfo = styled.Text`
  font-size: 14px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.light_heading};
`;
