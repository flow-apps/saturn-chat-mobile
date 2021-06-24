import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../contexts/auth";
import {
  Container,
  CreateAccountContainer,
  CreateAccountText,
  ErrorContainer,
  ErrorText,
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigator = useNavigation();
  const { signIn, error, loading } = useAuth();

  function handleNavigateSignUp() {
    navigator.navigate("Register");
  }

  async function handleLogin() {
    await signIn(email, password);
  }

  return (
    <>
      <Header title="Faça o login" backButton />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <WelcomeContainer>
            <WelcomeTitle>Olá,{"\n"}Bem-vindo de volta</WelcomeTitle>
          </WelcomeContainer>
          {error && (
            <ErrorContainer>
              <ErrorText>
                Erro ao fazer login, verifique seus dados ou crie uma conta
              </ErrorText>
            </ErrorContainer>
          )}
          <FormContainer>
            <FieldsContainer>
              <FieldContainer>
                <Label>
                  <Feather name="at-sign" size={16} /> Email
                </Label>
                <Input
                  placeholder="seu@email.com"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                />
              </FieldContainer>
              <FieldContainer>
                <Label>
                  <Feather name="lock" size={16} /> Senha
                </Label>
                <Input
                  onChangeText={setPassword}
                  value={password}
                  passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                  secureTextEntry
                />
                <ForgotPassword>
                  <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
                </ForgotPassword>
              </FieldContainer>
            </FieldsContainer>
            <Button title="Entrar" onPress={handleLogin} />
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
