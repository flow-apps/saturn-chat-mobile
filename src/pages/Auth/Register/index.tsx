import React, { useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import formData from "form-data";

import { Feather } from "@expo/vector-icons";
import { Alert, Keyboard, KeyboardAvoidingView, Linking } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useAuth } from "../../../contexts/auth";
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
  SelectAvatarButton,
  SelectAvatarContainer,
  SelectAvatarSubtitle,
  SelectAvatarTitle,
} from "./styles";
import analytics from "@react-native-firebase/analytics";
import config from "../../../config";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<ImagePicker.ImagePickerAsset>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(true);

  const { colors } = useTheme();
  const { signUp, loading, registerError } = useAuth();

  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  function handleSetEmail(value: string) {
    setEmail(value);

    if (!emailValidation.test(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function handleSetPassword(value: string) {
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
  }

  function handleSetPassConfirm(value: string) {
    setPasswordConfirm(value);

    if (password !== value) {
      setPassConfirmError(true);
    } else {
      setPassConfirmError(false);
    }
  }

  async function handleSelectAvatar() {
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
  }

  async function handleSubmit() {
    const data = new formData();

    data.append("name", name);
    data.append("email", email);
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
  }

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
      <Header title="Criar conta" />
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
                  Escolha uma foto de perfil
                </SelectAvatarTitle>
                <SelectAvatarSubtitle>
                  {!avatar
                    ? "💡 Lembrando: Você deve selecionar uma imagem com no máximo 5MB."
                    : "🖼 Esta foto está perfeita!"}
                </SelectAvatarSubtitle>
              </SelectAvatarContainer>
              {registerError && (
                <ErrorContainer>
                  <ErrorText>
                    Erro ao se registrar, provavelmente o email já está em uso,
                    tente fazer login
                  </ErrorText>
                </ErrorContainer>
              )}
              <InputsContainer>
                <FormField>
                  <Label>Nome</Label>
                  <Input
                    autoCapitalize="words"
                    placeholder="Ex.: Pedro Henrique"
                    onChangeText={setName}
                    value={name}
                  />
                </FormField>
                <FormField>
                  <Label>Email</Label>
                  <Input
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Ex.: usuario@exemplo.com"
                    autoCapitalize="none"
                    onChangeText={handleSetEmail}
                    value={email}
                  />
                  {emailError && (
                    <FieldError>Esse email não é válido</FieldError>
                  )}
                </FormField>
                <FormField>
                  <Label>Digite uma senha</Label>
                  <Input
                    onChangeText={handleSetPassword}
                    value={password}
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                  />
                  {passError && (
                    <FieldError>
                      A senha não segue os padrões segurança
                    </FieldError>
                  )}
                  <FieldInfoContainer>
                    <FieldInfo>
                      Sua senha deve conter: no mínimo 8 caracteres (sendo ao
                      menos 1 letra maiúsculo), pelo menos 1 número e pelo menos
                      1 símbolo
                    </FieldInfo>
                  </FieldInfoContainer>
                </FormField>
                <FormField>
                  <Label>Confirme sua senha</Label>
                  <Input
                    value={passwordConfirm}
                    onChangeText={handleSetPassConfirm}
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                  />
                  {passConfirmError && password.length > 0 && (
                    <FieldError>As senhas não combinam</FieldError>
                  )}
                </FormField>
              </InputsContainer>
              <Button
                enabled={
                  !emailError && !passError && !passConfirmError && !!name
                }
                title="Criar conta"
                onPress={handleSubmit}
              />
              <ConsentText>
                Ao clicar em "Criar conta" você aceita a nossa{" "}
                <Link onPress={handleGoPrivacyPolicie}>
                  Politica de Privacidade
                </Link>{" "}
                e também nossas{" "}
                <Link onPress={handleGoGuidelines}>
                  Diretrizes da Comunidade
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
