import React, { useState } from "react";
import Header from "../../../components/Header";
import { Feather } from "@expo/vector-icons";
import {
  AvatarContainer,
  AvatarImage,
  Container,
  SwitchAvatarButton,
  SwitchAvatarButtonText,
  FormContainer,
  FieldContainer,
  SwitcherContainer,
  SwitcherText,
  TextArea,
} from "./styles";

import * as ImagePicker from "expo-image-picker";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Switcher from "../../../components/Switcher";
import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../services/api";
import { GroupData } from "../../../../@types/interfaces";
import Loading from "../../../components/Loading";
import SimpleToast from "react-native-simple-toast";
import { Platform } from "react-native";
import { Alert } from "react-native";
import FormData from "form-data";

const EditGroup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<GroupData>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublicGroup, setIsPublicGroup] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string | undefined>();

  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as any;

  const handleIsPublic = (value: boolean) => {
    setIsPublicGroup(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await api
      .patch(`/group/${id}`, {
        name,
        description,
        privacy: isPublicGroup ? "PUBLIC" : "PRIVATE",
        tags,
      })
      .then(() => {
        SimpleToast.show("Grupo editado com sucesso!");
        navigation.goBack();
      });
    setLoading(false);
  };

  const handleSwitchAvatar = async () => {
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
      SimpleToast.show("Atualizando avatar...");
      const uriParts = photo.uri.split(".");
      const fileType = uriParts.pop();
      const data = new FormData();

      data.append("group_avatar", {
        uri: photo.uri,
        name: `group_avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      await api
        .patch(`/group/avatar/${id}`, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then(() => {
          setNewAvatar(photo.uri);
          SimpleToast.show("Avatar atualizado");
        });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await api.get(`/group/${id}`);

      if (response.status === 200) {
        setGroup(response.data);

        setName(response.data.name);
        setDescription(response.data.description);
        setTags(response.data.tags.join(", "));
        handleIsPublic(response.data.privacy === "PUBLIC");
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Editar grupo" backButton />
      <Container>
        <FormContainer>
          <AvatarContainer>
            <SwitchAvatarButton onPress={handleSwitchAvatar} activeOpacity={0.6}>
              <SwitchAvatarButtonText>
                <Feather name="camera" size={32} /> {"\n"}
                Trocar avatar
              </SwitchAvatarButtonText>
            </SwitchAvatarButton>
            <AvatarImage
              source={{ uri: newAvatar ? newAvatar : group?.group_avatar.url }}
            />
          </AvatarContainer>
          <FieldContainer>
            <Input placeholder="Nome" value={name} onChangeText={setName} />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
            />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              placeholder="Tags"
              value={tags}
              onChangeText={setTags}
            />
          </FieldContainer>
          <FieldContainer>
            <SwitcherContainer>
              <SwitcherText>
                <Feather name="users" size={25} /> Tornar público
              </SwitcherText>
              <Switcher
                currentValue={isPublicGroup}
                onChangeValue={handleIsPublic}
              />
            </SwitcherContainer>
          </FieldContainer>
          <Button title="Concluir" onPress={handleSubmit} />
        </FormContainer>
      </Container>
    </>
  );
};

export default EditGroup;
