import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useMemo, useState } from "react";
import SimpleToast from "react-native-simple-toast";
import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Loading from "@components/Loading";
import api from "@services/api";
import {
  Container,
  FieldError,
  FieldInfo,
  FieldInfoContainer,
  FormContainer,
  InputContainer,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";

const SwitchPassword: React.FC = () => {
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;

  const [loading, setLoading] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [passError, setPassError] = useState(true);
  const [confirmPassError, setConfirmPassError] = useState(true);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("SwitchPassword");

  const handleSetNewPassword = (value: string) => {
    setNewPass(value);

    if (!passwordValidation.test(value)) {
      setPassError(true);
    } else {
      if (value !== confirmNewPass) setConfirmPassError(true);
      else setConfirmPassError(false);

      setPassError(false);
    }
  };

  const handleSetConfirmNewPassword = (value: string) => {
    setConfirmNewPass(value);

    if (newPass !== value) {
      setConfirmPassError(true);
    } else {
      setConfirmPassError(false);
    }
  };

  const handleChangePass = async () => {
    setLoading(true);
    await api
      .patch("/auth/password/switch", {
        currentPass,
        newPass,
      })
      .then((res) => {
        if (res.status === 204) {
          SimpleToast.show(t("toasts.updated_pass"),SimpleToast.SHORT);
          navigation.goBack();
        }
      })
      .catch((err) => {
        if (err.response.status === 403)
          SimpleToast.show(t("toasts.incorrect_pass"),SimpleToast.SHORT);
        else SimpleToast.show(t("toasts.error_pass"),SimpleToast.SHORT);
        setLoading(false);
      });
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <FormContainer>
          <InputContainer>
            <Input
              value={currentPass}
              label={t("labels.current_password")}
              textContentType="password"
              onChangeText={setCurrentPass}
              secureTextEntry
            />
          </InputContainer>
          <InputContainer>
            <Input
              value={newPass}
              label={t("labels.new_password.label")}
              textContentType="password"
              onChangeText={handleSetNewPassword}
              secureTextEntry
            />
            {passError && !!newPass && (
              <FieldError>{t("labels.new_password.error")}</FieldError>
            )}
            <FieldInfoContainer>
              <FieldInfo>{t("labels.new_password.info")}</FieldInfo>
            </FieldInfoContainer>
          </InputContainer>
          <InputContainer>
            <Input
              value={confirmNewPass}
              label={t("labels.confirm_pass.label")}
              textContentType="password"
              onChangeText={handleSetConfirmNewPassword}
              secureTextEntry
            />
            {confirmPassError && !!confirmNewPass && (
              <FieldError>{t("labels.confirm_pass.error")}</FieldError>
            )}
          </InputContainer>
          <Button
            title={t("done")}
            enabled={!passError && !confirmPassError && !!currentPass}
            onPress={handleChangePass}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default SwitchPassword;
