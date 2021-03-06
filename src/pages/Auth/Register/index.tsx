import React, { useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import formData from "form-data";

import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
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
import { useFirebase } from "../../../contexts/firebase";
import config from "../../../config";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<ImageInfo>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(true);

  const { colors } = useTheme();
  const { signUp, loading, registerError } = useAuth();
  const { analytics } = useFirebase();

  const passwordValidation = useMemo(() => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g, []);
  const emailValidation = useMemo(() => /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/g, [])

  function handleSetName(value: string) {
    setName(value);
  }

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
        return Alert.alert("Precisamos da permiss??o para acessar suas fotos!");
      }
    }

    const photo = await ImagePicker.launchImageLibraryAsync({
      aspect: [600, 600],
      allowsEditing: true,
      quality: 0.7,
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!photo.cancelled) {
      return setAvatar(photo);
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

    await signUp(data);
    await analytics.logEvent("sign_up", {
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
      <Header  title="Criar conta" />
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
                    ? "???? Lembrando: Voc?? deve selecionar uma imagem com no m??ximo 5MB."
                    : "???? Esta foto est?? perfeita!"}
                </SelectAvatarSubtitle>
              </SelectAvatarContainer>
              {registerError && (
                <ErrorContainer>
                  <ErrorText>
                    Erro ao se registrar, provavelmente o email j?? est?? em uso,
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
                    onChangeText={handleSetName}
                    value={name}
                  />
                </FormField>
                <FormField>
                  <Label>Email</Label>
                  <Input
                    keyboardType="email-address"
                    placeholder="Ex.: usuario@exemplo.com"
                    onChangeText={handleSetEmail}
                    value={email}
                  />
                  {emailError && (
                    <FieldError>Esse email n??o ?? v??lido</FieldError>
                  )}
                </FormField>
                <FormField>
                  <Label>Digite uma senha</Label>
                  <Input
                    passwordRules="required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
                    onChangeText={handleSetPassword}
                    value={password}
                    secureTextEntry
                  />
                  {passError && (
                    <FieldError>
                      A senha n??o segue os padr??es seguran??a
                    </FieldError>
                  )}
                  <FieldInfoContainer>
                    <FieldInfo>
                      Sua senha deve conter: no m??nimo 8 caracteres (sendo ao
                      menos 1 letra mai??sculo), pelo menos 1 n??mero e pelo menos
                      1 s??mbolo
                    </FieldInfo>
                  </FieldInfoContainer>
                </FormField>
                <FormField>
                  <Label>Confirme sua senha</Label>
                  <Input
                    value={passwordConfirm}
                    onChangeText={handleSetPassConfirm}
                    secureTextEntry
                  />
                  {passConfirmError && password.length > 0 && (
                    <FieldError>As senhas n??o combinam</FieldError>
                  )}
                </FormField>
              </InputsContainer>
              <Button
                enabled={!emailError && !passError && !passConfirmError}
                title="Criar conta"
                onPress={handleSubmit}
              />
              <ConsentText>
                Ao clicar em "Criar conta" voc?? aceita a nossa{" "}
                <Link onPress={handleGoPrivacyPolicie}>
                  Politica de Privacidade
                </Link>{" "}
                e tamb??m nossas{" "}
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
