import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
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
  FormInput,
  SwitcherContainer,
  SwitcherText,
  ButtonWrapper,
  TextArea,
  AdWrapper,
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
import Loading from "../../components/Loading";
import Banner from "../../components/Ads/Banner";
import { useAds } from "../../contexts/ads";
import { useFirebase } from "../../contexts/firebase";
import { verifyBetweenValues } from "../../utils";

const NewGroup: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [groupPhoto, setGroupPhoto] = useState<ImageInfo>();
  const [groupPhotoPreview, setGroupPhotoPreview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isPublicGroup, setIsPublicGroup] = useState(true);

  const [isSendable, setIsSendable] = useState(false)

  const { analytics } = useFirebase();
  const { Interstitial } = useAds();
  const { colors } = useTheme();
  const navigator = useNavigation();

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
    data.append("tags", tags);

    setCreating(true);
    api
      .post("/groups", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          const isReady = await Interstitial.getIsReadyAsync();
          if (isReady) await Interstitial.showAdAsync();

          await analytics.logEvent("created_group", {
            group_id: response.data.id,
          });

          navigator.navigate("Groups");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setCreating(false));
  }

  function handleCheckFields() {
    if (verifyBetweenValues(name.length, 0, 100))
      return setIsSendable(true)
    setIsSendable(false)
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
    });

    if (!photo.cancelled) {
      setGroupPhotoPreview(photo.uri);
      return setGroupPhoto(photo);
    }
  }

  if (creating) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Novo grupo" />
      <Container>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <AdWrapper>
              <Banner />
            </AdWrapper>
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
                  "Recomendamos uma imagem de 600x600 e de no máximo 5MB"}
              </SelectGroupPhotoSubtitle>
            </SelectGroupPhotoContainer>
            <Form>
              <FormContainer
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <FormInput
                  label="Nome do grupo"
                  placeholder="máx. 100 caracteres"
                  maxLength={100}
                  selectionColor={colors.secondary}
                  returnKeyType="go"
                  value={name}
                  onChangeText={setName}
                  onTextInput={handleCheckFields}
                />
                <TextArea
                  label="Descreva seu grupo"
                  multiline
                  selectionColor={colors.secondary}
                  placeholder="máx. 500 caracteres"
                  maxLength={500}
                  value={description}
                  onChangeText={setDescription}
                  onTextInput={handleCheckFields}
                />
                <TextArea
                  label="Tags do grupo"
                  multiline
                  selectionColor={colors.secondary}
                  placeholder="separe por vírgula"
                  value={tags}
                  onChangeText={setTags}
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
                  <Button enabled={isSendable} title="Criar grupo" onPress={handleCreateGroup} />
                </ButtonWrapper>
              </FormContainer>
            </Form>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </>
  );
};

export default NewGroup;
