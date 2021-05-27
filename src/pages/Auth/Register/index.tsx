import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { useAuth } from "../../../contexts/auth";
import {
  Avatar,
  Container,
  FieldError,
  FieldInfo,
  FieldInfoContainer,
  FormContainer,
  FormField,
  InputsContainer,
  Label,
  SelectAvatarButton,
  SelectAvatarContainer,
  SelectAvatarSubtitle,
  SelectAvatarTitle,
} from "./styles";
import formData from "form-data";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<ImageInfo>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passConfirmError, setPassConfirmError] = useState(false);

  const { colors } = useTheme();
  const { signUp } = useAuth();
  const passwordValidation =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
  const emailValidation = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/g;

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
    });

    if (!photo.cancelled) {
      return setAvatar(photo);
    }
  }

  async function handleSubmit() {
    const data = new formData();
    const uriParts = avatar?.uri.split(".");
    const fileType = uriParts?.pop();

    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", {
      uri: avatar?.uri,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    });

    return signUp(data as unknown as FormData);
  }

  return (
    <>
      <Header backButton title="Criar conta" />
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
                    <FieldError>Esse email não é válido</FieldError>
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
                    secureTextEntry
                  />
                  {passConfirmError && (
                    <FieldError>As senhas não combinam</FieldError>
                  )}
                </FormField>
              </InputsContainer>
              <Button title="Criar conta" onPress={handleSubmit} />
            </FormContainer>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default Register;