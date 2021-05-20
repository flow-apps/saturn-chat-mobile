import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import {
  Container,
  CreateAccountContainer,
  CreateAccountText,
  FieldContainer,
  FieldsContainer,
  ForgotPassword,
  ForgotPasswordText,
  FormContainer,
  Label,
  WelcomeContainer,
  WelcomeTitle,
} from "./styles";

const Login: React.FC = () => {
  const navigator = useNavigation();

  function handleNavigateSignUp() {
    navigator.navigate("Register");
  }

  return (
    <>
      <Header title="Faça o login" backButton />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <WelcomeContainer>
            <WelcomeTitle>Olá,{"\n"}Bem-vindo de volta</WelcomeTitle>
          </WelcomeContainer>
          <FormContainer>
            <FieldsContainer>
              <FieldContainer>
                <Label>
                  <Feather name="at-sign" size={16} /> Email
                </Label>
                <Input keyboardType="email-address" />
              </FieldContainer>
              <FieldContainer>
                <Label>
                  <Feather name="lock" size={16} /> Senha
                </Label>
                <Input
                  passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                  secureTextEntry
                />
                <ForgotPassword>
                  <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
                </ForgotPassword>
              </FieldContainer>
            </FieldsContainer>
            <Button title="Entrar" />
            <CreateAccountContainer onPress={handleNavigateSignUp}>
              <CreateAccountText>
                É novo por aqui? Crie uma conta!
              </CreateAccountText>
            </CreateAccountContainer>
          </FormContainer>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Login;
