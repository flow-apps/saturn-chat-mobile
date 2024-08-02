import React, { useEffect, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Loading from "@components/Loading";
import formData from "form-data";

import { Feather } from "@expo/vector-icons";
import { Alert, Keyboard, KeyboardAvoidingView, Linking } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useAuth } from "@contexts/auth";
import {
  Avatar,
  ConsentText,
  Container,
  ErrorContainer,
  ErrorText,
  FieldError,
  FieldInfo,
  FieldInfoContainer,
  FormContainer,
  FormField,
  InputsContainer,
  Label,
  Link,
  SearchText,
  SelectAvatarButton,
  SelectAvatarContainer,
  SelectAvatarSubtitle,
  SelectAvatarTitle,
} from "./styles";
import analytics from "@react-native-firebase/analytics";
import config from "../../../config";
import { useTranslate } from "@hooks/useTranslate";
import api from "@services/api";
import {
  emailValidation,
  nicknameValidation,
  passwordValidation,
} from "@utils/regex";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset>();
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(true);

  const [nicknameTimeout, setNicknameTimeout] = useState<NodeJS.Timeout>();
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [fetchingNickname, setFetchingNickname] = useState(false);

  const { colors } = useTheme();
  const { signUp, loading, registerError, internalError } = useAuth();
  const { t } = useTranslate("Auth.CreateAccount");

  const nicknameErrors = {
    400: "O nome de usuário não está conforme os padrões esperados",
    404: "O nome de usuário não foi fornecido",
    1000: "Não foi possível buscar o nome de usuário",
    unavailable: "O nome de usuário não está disponível",
  };

  const checkNickname = async (nick: string) => {
    if (fetchingNickname) return;

    if (!nick.trim().length) {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }

    setFetchingNickname(true);

    await api
      .get(`/users/nickname/check/${nick}`)
      .then((res) => {
        const { is_available } = res.data;

        if (is_available) {
          setNicknameError(false);
          setNicknameErrorMessage("");
        } else {
          setNicknameError(true);
          setNicknameErrorMessage(nicknameErrors.unavailable);
        }
      })
      .catch((error) => {
        const status = error.response.status;

        if (status === 404) {
          setNicknameError(false);
          setNicknameErrorMessage("");
          return;
        }

        setNicknameError(true);
        setNicknameErrorMessage(nicknameErrors[status]);
      })
      .finally(() => setFetchingNickname(false));
  };

  const handleSetEmail = (value: string) => {
    setEmail(value);

    if (!emailValidation.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleSetPassword = (value: string) => {
    setPassword(value);

    if (passwordConfirm !== value) {
      setPassConfirmError(true);
    } else {
      setPassConfirmError(false);
    }

    if (!passwordValidation.test(value)) {
      setPassError(true);
    } else {
      setPassError(false);
    }
  };

  const handleSetNickname = (value: string) => {
    setNickname(value);

    if (!value.length) {
      setNicknameError(false);
      setNicknameErrorMessage("");

      return;
    }

    if (!nicknameValidation.test(value)) {
      setNicknameError(true);
      setNicknameErrorMessage(nicknameErrors[400]);
      if (nicknameTimeout) {
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }
    } else {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }
  };

  useEffect(() => {
    const NICKNAME_TIMEOUT = 500;

    if (nicknameError) return;

    if (!nickname.length) {
      if (nicknameTimeout) {
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }
    }

    if (nicknameTimeout) {
      clearTimeout(nicknameTimeout);

      const newTimeout = setTimeout(async () => {
        await checkNickname(nickname);
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }, NICKNAME_TIMEOUT);

      setNicknameTimeout(newTimeout);
    } else {
      const newTimeout = setTimeout(async () => {
        await checkNickname(nickname);
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }, NICKNAME_TIMEOUT);

      setNicknameTimeout(newTimeout);
    }

    return () => clearTimeout(nicknameTimeout);
  }, [nickname]);

  const handleSetPassConfirm = (value: string) => {
    setPasswordConfirm(value);

    if (password !== value) {
      setPassConfirmError(true);
    } else {
      setPassConfirmError(false);
    }
  };

  const handleSelectAvatar = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();

    if (!granted) {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();

      if (!granted) {
        return Alert.alert("Precisamos da permissão para acessar suas fotos!");
      }
    }

    const photo = await ImagePicker.launchImageLibraryAsync({
      aspect: [600, 600],
      allowsEditing: true,
      quality: 0.7,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      selectionLimit: 1,
    });

    if (!photo.canceled) {
      return setAvatar(photo.assets[0]);
    }
  };

  const handleSubmit = async () => {
    const data = new formData();

    data.append("name", name);
    data.append("email", email);
    data.append("nickname", nickname);
    data.append("password", password);

    if (avatar) {
      const uriParts = avatar?.uri.split(".");
      const fileType = uriParts?.pop();

      data.append("avatar", {
        uri: avatar?.uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    await signUp(data, email);
    await analytics().logEvent("sign_up", {
      method: "email/password",
    });
  };

  const handleGoPrivacyPolicie = async () => {
    await Linking.openURL(`${config.WEBSITE_URL}/privacy`);
  };

  const handleGoGuidelines = async () => {
    await Linking.openURL(`${config.WEBSITE_URL}/guidelines`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView>
            <FormContainer>
              <SelectAvatarContainer>
                <SelectAvatarButton onPress={handleSelectAvatar}>
                  {avatar ? (
                    <Avatar source={{ uri: avatar.uri }} />
                  ) : (
                    <Feather name="camera" size={55} color={colors.secondary} />
                  )}
                </SelectAvatarButton>
                <SelectAvatarTitle>
                  {t("avatar_select_label")}
                </SelectAvatarTitle>
                <SelectAvatarSubtitle>
                  {!avatar ? t("avatar_select_tip") : t("avatar_selected")}
                </SelectAvatarSubtitle>
              </SelectAvatarContainer>
              {registerError && !internalError.has && (
                <ErrorContainer>
                  <ErrorText>{t("register_error")}</ErrorText>
                </ErrorContainer>
              )}
              {registerError && internalError.has && (
                <ErrorContainer>
                  <ErrorText>
                    Ocorreu um erro interno no servidor. Tente mais tarde.{" "}
                    {internalError.reason}
                  </ErrorText>
                </ErrorContainer>
              )}
              <InputsContainer>
                <FormField>
                  <Label>{t("labels.name")}</Label>
                  <Input
                    autoCapitalize="words"
                    placeholder="Ex.: Pedro Henrique"
                    onChangeText={setName}
                    value={name}
                  />
                </FormField>
                <FormField>
                  <Label>{t("labels.email.label")}</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Ex.: usuario@exemplo.com"
                    autoCapitalize="none"
                    onChangeText={handleSetEmail}
                    value={email}
                  />
                  {emailError && (
                    <FieldError>{t("labels.email.error")}</FieldError>
                  )}
                </FormField>
                <FormField>
                  <Label>Nome de usuário</Label>
                  <Input
                    onChangeText={handleSetNickname}
                    value={nickname}
                    autoCapitalize="none"
                    textContentType="nickname"
                    placeholder="pedro_henrique"
                  />
                  {fetchingNickname && <SearchText>Buscando...</SearchText>}
                  {nicknameError && (
                    <FieldError>{nicknameErrorMessage}</FieldError>
                  )}
                  <FieldInfoContainer>
                    <FieldInfo>
                      Deve ser um nome único, contendo apenas números e letras.
                      Apenas os símbolos de hífen (-) e underline (_) estão
                      disponíveis. Se nenhum nome de usuário for fornecido será
                      gerado um automaticamente para você.
                    </FieldInfo>
                  </FieldInfoContainer>
                </FormField>
                <FormField>
                  <Label>{t("labels.password.label")}</Label>
                  <Input
                    onChangeText={handleSetPassword}
                    value={password}
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                  />
                  {passError && (
                    <FieldError>{t("labels.password.error")}</FieldError>
                  )}
                  <FieldInfoContainer>
                    <FieldInfo>{t("labels.password.info")}</FieldInfo>
                  </FieldInfoContainer>
                </FormField>
                <FormField>
                  <Label>{t("labels.password_again.label")}</Label>
                  <Input
                    value={passwordConfirm}
                    onChangeText={handleSetPassConfirm}
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                  />
                  {passConfirmError && password.length > 0 && (
                    <FieldError>{t("labels.password_again.error")}</FieldError>
                  )}
                </FormField>
              </InputsContainer>
              <Button
                enabled={
                  !emailError &&
                  !passError &&
                  !passConfirmError &&
                  !!name &&
                  !nicknameError &&
                  !fetchingNickname
                }
                title={t("register_button")}
                onPress={handleSubmit}
              />
              <ConsentText>
                {t("consent.line_0")}{" "}
                <Link onPress={handleGoPrivacyPolicie}>
                  {t("consent.privacy_policy")}
                </Link>{" "}
                {t("consent.line_1")}{" "}
                <Link onPress={handleGoGuidelines}>
                  {t("consent.guidelines")}
                </Link>
              </ConsentText>
            </FormContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Register;
