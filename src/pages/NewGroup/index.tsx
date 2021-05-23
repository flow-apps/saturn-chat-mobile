import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../../components/Header";

import {
  Container,
  SelectGroupPhotoContainer,
  SelectGroupPhoto,
  GroupPhoto,
  SelectGroupPhotoTitle,
  SelectGroupPhotoSubtitle,
  FormContainer,
  Form,
  Input,
  SwitcherContainer,
  SwitcherText,
  ButtonWrapper,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import Switcher from "../../components/Switcher";
import api from "../../services/api";
import { useNavigation } from "@react-navigation/core";
import FormData from "form-data";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

const NewGroup: React.FC = () => {
  const [groupPhoto, setGroupPhoto] = useState<ImageInfo>();
  const [groupPhotoPreview, setGroupPhotoPreview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isPublicGroup, setIsPublicGroup] = useState(true);
  const { colors } = useTheme();
  const navigator = useNavigation();

  const descriptionInput = useRef() as any;

  async function handleCreateGroup() {
    const data = new FormData();

    const uriParts = groupPhoto?.uri.split(".");
    const fileType = uriParts?.pop();

    data.append("name", name);
    data.append("description", description);
    data.append("group_avatar", {
      uri: groupPhoto?.uri,
      name: `group_avatar.${fileType}`,
      type: `image/${fileType}`,
    });
    data.append("privacy", isPublicGroup ? "PUBLIC" : "PRIVATE");

    api
      .post("/groups", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigator.navigate("Groups");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSetPublic() {
    setIsPublicGroup(!isPublicGroup);
  }

  async function handleSelectGroupPhoto() {
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
      setGroupPhotoPreview(photo.uri);
      return setGroupPhoto(photo);
    }
  }

  return (
    <>
      <Header title="Novo grupo" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SelectGroupPhotoContainer>
              <SelectGroupPhoto
                style={{
                  borderWidth: groupPhotoPreview ? 0 : 2,
                }}
                onPress={handleSelectGroupPhoto}
              >
                {groupPhotoPreview ? (
                  <GroupPhoto source={{ uri: groupPhotoPreview }} />
                ) : (
                  <Feather name="camera" size={55} color={colors.secondary} />
                )}
              </SelectGroupPhoto>
              <SelectGroupPhotoTitle>
                {!groupPhotoPreview
                  ? "🖼 Escolha uma foto legal"
                  : "🌟 Essa foto está perfeita!"}
              </SelectGroupPhotoTitle>
              <SelectGroupPhotoSubtitle>
                {!groupPhotoPreview &&
                  "Recomendamos uma imagem de 300x300 e de no máximo 5MB"}
              </SelectGroupPhotoSubtitle>
            </SelectGroupPhotoContainer>
            <FormContainer
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Form>
                <Input
                  placeholder="Nome do grupo (máx. 100 caracteres)"
                  maxLength={100}
                  returnKeyType="go"
                  onSubmitEditing={() => descriptionInput.current.focus()}
                  value={name}
                  onChangeText={setName}
                />
                <Input
                  placeholder="Descrição do grupo (máx. 500 caracteres)"
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  ref={descriptionInput}
                  value={description}
                  onChangeText={setDescription}
                />
                <SwitcherContainer>
                  <SwitcherText>
                    <Feather
                      name="users"
                      size={30}
                      color={colors.light_heading}
                    />{" "}
                    Tornar público
                  </SwitcherText>
                  <Switcher
                    onChangeValue={handleSetPublic}
                    currentValue={isPublicGroup}
                  />
                </SwitcherContainer>
                <ButtonWrapper>
                  <Button title="Cria Grupo" onPress={handleCreateGroup} />
                </ButtonWrapper>
              </Form>
            </FormContainer>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default NewGroup;
