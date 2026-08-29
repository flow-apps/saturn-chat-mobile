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
} from "./styles";
import Header from "@components/Header";
import Input from "@components/Input";
import Button from "@components/Button";
import api from "@services/api";

const ForgotPassword: React.FC = () => {
  const nav = useNavigation();

  const [step, setStep] = useState<"email" | "code" | "password">("email");
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [resetToken, setResetToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleSendEmail = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);
      const response = await api.patch<{ email?: string; message?: string }>(
        "/auth/password/recovery",
        { emailOrNick: email },
      );

      // Armazena o e-mail mascarado retornado pela API apenas para exibição
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

    console.log(fullCode, email);

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
    if (!newPassword || !confirmPassword) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Atenção", "As senhas não coincidem.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Atenção", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      await api.patch("/auth/password/reset", {
        resetToken: resetToken,
        newPass: newPassword,
      });

      SimpleToast.show("Senha alterada com sucesso", SimpleToast.SHORT);
      nav.goBack();
    } catch (error: any) {
      SimpleToast.show("Não foi possível alterar a senha", SimpleToast.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header backButton title="Recuperar senha" />
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
                    // @ts-ignore
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
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <Input
                label="Confirme a nova senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </InputContainer>

            <Button
              title="Alterar Senha"
              onPress={handleResetPassword}
              loading={loading}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
