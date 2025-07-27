import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Loading from "@components/Loading";
import analytics from "@react-native-firebase/analytics";

import { useAuth } from "@contexts/auth";
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
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigator = useNavigation<StackNavigationProp<any>>();

  const { signIn, loginError, internalError, loading } = useAuth();
  const { t } = useTranslate("Auth.Login");

  function handleNavigateSignUp() {
    navigator.navigate("Register");
  }

  async function handleLogin() {
    await signIn(email, password);
    await analytics().logEvent("login", {
      method: "email/password",
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <WelcomeContainer>
            <WelcomeTitle>{t("title")}</WelcomeTitle>
          </WelcomeContainer>
          {loginError && !internalError.has && (
            <ErrorContainer>
              <ErrorText>{t("login_error")}</ErrorText>
            </ErrorContainer>
          )}
          {loginError && internalError.has && (
            <ErrorContainer>
              <ErrorText>
                Ocorreu um erro interno no servidor. Tente mais tarde. {internalError.reason}
              </ErrorText>
            </ErrorContainer>
          )}
          <FormContainer>
            <FieldsContainer>
              <FieldContainer>
                <Label>
                  <Feather name="at-sign" size={16} /> {t("email")}
                </Label>
                <Input
                  placeholder="seu@email.com"
                  onChangeText={setEmail}
                  value={email}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                />
              </FieldContainer>
              <FieldContainer>
                <Label>
                  <Feather name="lock" size={16} /> {t("password")}
                </Label>
                <Input
                  onChangeText={setPassword}
                  value={password}
                  textContentType="password"
                  passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
                  autoCapitalize="none"
                  secureTextEntry
                />
                <ForgotPassword>
                  <ForgotPasswordText>
                    {t("forgot_password")}
                  </ForgotPasswordText>
                </ForgotPassword>
              </FieldContainer>
            </FieldsContainer>
            <Button title={t("login_button")} onPress={handleLogin} />
            <CreateAccountContainer onPress={handleNavigateSignUp}>
              <CreateAccountText>{t("register_button")}</CreateAccountText>
            </CreateAccountContainer>
          </FormContainer>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Login;
