import styled from "styled-components/native";
import fonts from "../../../styles/fonts";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
`;

export const WelcomeContainer = styled.View`
  flex: 1;
  margin-top: 30px;
`;

export const WelcomeTitle = styled.Text`
  font-size: 30px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.dark_heading};
`;

export const FormContainer = styled.View`
  flex: 1;
  margin-top: 50px;
`;

export const FieldsContainer = styled.View``;

export const FieldContainer = styled.View`
  flex: 1;
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.light_heading};
`;

export const ForgotPassword = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  margin-top: 10px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.primary};
`;

export const CreateAccountContainer = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 20px;
`;

export const CreateAccountText = styled.Text`
  text-align: center;
  font-size: 14px;
  font-family: ${fonts.heading};
  color: ${(props) => props.theme.colors.secondary};
`;
