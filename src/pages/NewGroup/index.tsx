import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Header from "../../components/Header";
import perf from "@react-native-firebase/perf";

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
  AnimationContainer,
  Animation,
  ReachedLimitContainer,
  ReachedLimitTitle,
  ReachedLimitDescription,
  ReachedLimitStarContainer,
  ReachedLimitStarDescription,
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
import { useFirebase } from "../../contexts/firebase";
import { verifyBetweenValues } from "../../utils";
import { UserData } from "../../../@types/interfaces";
import { useRemoteConfigs } from "../../contexts/remoteConfigs";
import _ from "lodash";

const NewGroup: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupPhoto, setGroupPhoto] = useState<ImageInfo>();
  const [groupPhotoPreview, setGroupPhotoPreview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isPublicGroup, setIsPublicGroup] = useState(true);
  const [user, setUser] = useState<UserData>({} as UserData);

  const [isSendable, setIsSendable] = useState(false);

  const { analytics } = useFirebase();
  const { colors } = useTheme();
  const { userConfigs, allConfigs } = useRemoteConfigs();
  const premium = false;
  const navigator = useNavigation();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/users/@me");

      if (res.status === 200) {
        setUser(res.data);
      }

      setLoading(false);
    })();
  }, []);

  const handleGoPremium = () => {
    navigator.navigate("PurchasePremium");
  };

  const handleCreateGroup = async () => {
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    if (groupPhoto) {
      const uriParts = groupPhoto?.uri.split(".");
      const fileType = uriParts?.pop();

      data.append("group_avatar", {
        uri: groupPhoto?.uri,
        name: `group_avatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    data.append("privacy", isPublicGroup ? "PUBLIC" : "PRIVATE");
    data.append("tags", tags);

    setCreating(true);
    const trace = await perf()?.startTrace("create_group");
    await trace.start();
    api
      .post("/groups", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          navigator.navigate("Groups");
          trace.putMetric("group_id", response.data.id);
          await analytics.logEvent("created_group", {
            group_id: response.data.id,
          });
        }
      })
      .finally(async () => {
        await trace.stop();
        setCreating(false);
      });
  };

  const handleCheckFields = () => {
    if (verifyBetweenValues(name.length, 0, 100)) return setIsSendable(true);
    setIsSendable(false);
  };

  const handleSetPublic = () => {
    setIsPublicGroup(!isPublicGroup);
  };

  const handleSelectGroupPhoto = async () => {
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
  };

  if (creating || loading) {
    return <Loading />;
  }

  if (user && user.groups && user.groups.length >= userConfigs.amountGroups) {
    return (
      <Container>
        <ReachedLimitContainer>
          <AnimationContainer>
            <Animation
              source={require("../../assets/crying.json")}
              autoPlay
              loop
            />
          </AnimationContainer>
          <ReachedLimitTitle>
            Você atingiu o limite de {userConfigs.amountGroups} grupos!
          </ReachedLimitTitle>
          <ReachedLimitDescription>
            Esse limite é estipulado para que todos possam criar suas comunidades
            no Saturn Chat e também para evitar problemas chatos
            como spam.
          </ReachedLimitDescription>
          {!premium && (
            <ReachedLimitStarContainer>
              <ReachedLimitStarDescription>
                Você também pode se tornar uma Estrela e criar até{" "}
                {allConfigs.premium_max_groups} grupos com{" "}
                {allConfigs.premium_max_participants} participantes em cada grupo.
              </ReachedLimitStarDescription>
              <Button
                title="Tornar-se Estrela"
                bgColor={colors.secondary}
                onPress={handleGoPremium}
              />
            </ReachedLimitStarContainer>
          )}
        </ReachedLimitContainer>
      </Container>
    );
  }

  return (
    <>
      <Header title="Novo grupo" backButton={false} />
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
                  <Button
                    enabled={isSendable}
                    title="Criar grupo"
                    onPress={handleCreateGroup}
                  />
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
