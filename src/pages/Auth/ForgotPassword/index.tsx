import React, { useState, useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
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
import Input from "@components/Input";
import Button from "@components/Button";
import Header from "@components/Header";
import api from "@services/api";
import CustomAlert from "@components/Alert";
import { useTranslate } from "@hooks/useTranslate";

const ForgotPassword: React.FC = () => {
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const nav = useNavigation();
  const { t } = useTranslate("Auth.ForgotPassword");

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

  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    content: string;
  }>({
    visible: false,
    title: "",
    content: "",
  });

  const showAlert = (title: string, content: string) => {
    setAlertConfig({
      visible: true,
      title,
      content,
    });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  };

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
      showAlert(t("alerts.error"), t("alerts.code_error"));
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
      showAlert(t("alerts.warn"), t("alerts.length_code"));
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
      showAlert(t("alerts.error"), t("alerts.invalid_code"));
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

      SimpleToast.show(t("toasts.switched_password"), SimpleToast.SHORT);
      nav.goBack();
    } catch (error: any) {
      showAlert(t("alerts.error"), t("alerts.reset_pass_error"));
      setLoading(false);
    }
  };

  return (
    <>
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        content={alertConfig.content}
        okButtonAction={hideAlert}
        extraButton={false}
      />

      <Header backButton title={t("header_title")} />
      <Container>
        {step === "email" && (
          <>
            <TitleContainer>
              <Title>{t("title")}</Title>
              <Subtitle>{t("subtitle")}</Subtitle>
            </TitleContainer>

            <InputContainer>
              <Input
                label={t("email_placeholder")}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </InputContainer>

            <Button
              title={t("next_button")}
              onPress={handleSendEmail}
              loading={loading}
              enabled={!!email.trim()}
            />
          </>
        )}

        {step === "code" && (
          <>
            <TitleContainer>
              <Title>{t("verify_code")}</Title>
              <Subtitle>
                {t("verify_subtitle", { masked: displayEmail })}
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
              title={t("confirm")}
              onPress={handleVerifyCode}
              loading={loading}
              enabled={code.join("").length === 6}
            />
          </>
        )}

        {step === "password" && (
          <>
            <TitleContainer>
              <Title>{t("new_pass_title")}</Title>
              <Subtitle>{t("new_pass_subtitle")}</Subtitle>
            </TitleContainer>

            <InputContainer>
              <Input
                textContentType="newPassword"
                label={t("new_pass")}
                value={newPassword}
                onChangeText={handleSetNewPassword}
                secureTextEntry
              />
              {passError && !!newPassword && (
                <FieldError>{t("pass_rules")}</FieldError>
              )}
            </InputContainer>

            <InputContainer>
              <Input
                textContentType="password"
                label={t("confirm_pass")}
                value={confirmPassword}
                onChangeText={handleSetConfirmNewPassword}
                secureTextEntry
              />
              {confirmPassError && !!confirmPassword && (
                <FieldError>{t("confirm_pass_error")}</FieldError>
              )}
            </InputContainer>

            <Button
              title={t("switch_pass")}
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
