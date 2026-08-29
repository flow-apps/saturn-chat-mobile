import React, { useState, useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import SimpleToast from "react-native-simple-toast";

import {
  Container,
  InputContainer,
  Subtitle,
  Title,
  TitleContainer,
  CodeContainer,
  CodeInput,
  FieldError,
  FieldInfo,
  FieldInfoContainer,
} from "./styles";
import Header from "@components/Header";
import Input from "@components/Input";
import Button from "@components/Button";
import api from "@services/api";

const ForgotPassword: React.FC = () => {
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const nav = useNavigation();

  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState(true);
  const [confirmPassError, setConfirmPassError] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleSetNewPassword = (value: string) => {
    setNewPassword(value);

    if (!passwordValidation.test(value)) {
      setPassError(true);
    } else {
      if (value !== confirmPassword) setConfirmPassError(true);
      else setConfirmPassError(false);

      setPassError(false);
    }
  };

  const handleSetConfirmNewPassword = (value: string) => {
    setConfirmPassword(value);

    if (newPassword !== value) {
      setConfirmPassError(true);
    } else {
      setConfirmPassError(false);
    }
  };

  const handleSendEmail = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      const response = await api.patch<{ email?: string; message?: string }>(
        "/auth/password/recovery",
        { emailOrNick: email },
      );

      setDisplayEmail(response.data.email || email);
      setStep("code");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.response?.data?.message ||
          "Ocorreu um erro ao solicitar o código.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, "");

    if (cleanText.length > 1) {
      const pastedCode = cleanText.slice(0, 6).split("");
      const newCode = [...code];

      pastedCode.forEach((char, i) => {
        newCode[i] = char;
      });

      setCode(newCode);

      const nextFocusIndex = Math.min(pastedCode.length, 5);
      inputRefs.current[nextFocusIndex]?.focus();
      return;
    }

    if (cleanText) {
      const newCode = [...code];
      newCode[index] = cleanText;
      setCode(newCode);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const newCode = [...code];

      if (code[index]) {
        newCode[index] = "";
        setCode(newCode);
      }

      if (index > 0) {
        if (!code[index]) {
          newCode[index - 1] = "";
          setCode(newCode);
        }
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      Alert.alert("Atenção", "Informe o código de 6 dígitos completo.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.patch<{ reset_token: string }>(
        "/auth/password/recovery/verify",
        {
          emailOrNick: email,
          code: fullCode,
        },
      );

      setResetToken(response.data.reset_token);
      setStep("password");
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Código inválido ou expirado.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await api.patch("/auth/password/reset", {
        resetToken,
        newPass: newPassword,
      });

      SimpleToast.show("Senha alterada com sucesso!", SimpleToast.SHORT);
      nav.goBack();
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.response?.data?.message || "Não foi possível redefinir a senha.",
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        backButton
        title="Recuperar senha"
        onPressBack={() => {
          if (step === "password") {
            setStep("code");
          } else if (step === "code") {
            setStep("email");
          } else {
            nav.goBack();
          }
        }}
      />
      <Container>
        {step === "email" && (
          <>
            <TitleContainer>
              <Title>Perdeu sua senha?</Title>
              <Subtitle>
                Não se preocupe! Ajudaremos você a retomar o acesso à sua conta
                em poucos minutos.
              </Subtitle>
            </TitleContainer>

            <InputContainer>
              <Input
                label="E-mail ou Nome de usuário"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </InputContainer>

            <Button
              title="Próximo"
              onPress={handleSendEmail}
              loading={loading}
              enabled={!!email.trim()}
            />
          </>
        )}

        {step === "code" && (
          <>
            <TitleContainer>
              <Title>Código de verificação</Title>
              <Subtitle>
                Insira o código de 6 dígitos enviado para {displayEmail}.
              </Subtitle>
            </TitleContainer>

            <InputContainer>
              <CodeContainer>
                {code.map((digit, index) => (
                  <CodeInput
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    onChangeText={(text) => handleCodeChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={6}
                    selectTextOnFocus
                  />
                ))}
              </CodeContainer>
            </InputContainer>

            <Button
              title="Confirmar"
              onPress={handleVerifyCode}
              loading={loading}
              enabled={code.join("").length === 6}
            />
          </>
        )}

        {step === "password" && (
          <>
            <TitleContainer>
              <Title>Crie uma nova senha</Title>
              <Subtitle>
                Sua nova senha deve ser diferente das senhas utilizadas
                anteriormente.
              </Subtitle>
            </TitleContainer>

            <InputContainer>
              <Input
                label="Nova senha"
                value={newPassword}
                onChangeText={handleSetNewPassword}
                secureTextEntry
              />
              {passError && !!newPassword && (
                <FieldError>
                  A senha deve conter ao menos 8 caracteres, 1 letra maiúscula,
                  1 minúscula, 1 número e 1 caractere especial.
                </FieldError>
              )}
              <FieldInfoContainer>
                <FieldInfo>
                  Mínimo de 8 caracteres contendo maiúscula, minúscula, número e
                  símbolo.
                </FieldInfo>
              </FieldInfoContainer>
            </InputContainer>

            <InputContainer>
              <Input
                label="Confirme a nova senha"
                value={confirmPassword}
                onChangeText={handleSetConfirmNewPassword}
                secureTextEntry
              />
              {confirmPassError && !!confirmPassword && (
                <FieldError>As senhas não coincidem.</FieldError>
              )}
            </InputContainer>

            <Button
              title="Alterar Senha"
              onPress={handleResetPassword}
              loading={loading}
              enabled={!passError && !confirmPassError && !!newPassword}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
