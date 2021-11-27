import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Switcher from "../../../components/Switcher";
import FormData from "form-data";
import SimpleToast from "react-native-simple-toast";
import api from "../../../services/api";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { GroupData } from "../../../../@types/interfaces";
import {
  AvatarContainer,
  AvatarImage,
  Container,
  FieldContainer,
  FormContainer,
  SwitchAvatarButton,
  SwitchAvatarButtonText,
  SwitcherContainer,
  SwitcherText,
  TextArea,
} from "./styles";
import { verifyBetweenValues } from "../../../utils";

const EditGroup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<GroupData>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublicGroup, setIsPublicGroup] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string | undefined>();
  const [isSendable, setIsSendable] = useState(false);

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

  const renderAvatar = () => {
    if (newAvatar) {
      return <AvatarImage source={{ uri: newAvatar }} />;
    }

    const avatar = group?.group_avatar;

    if (avatar) {
      return <AvatarImage source={{ uri: avatar.url }} />;
    } else {
      return (
        <AvatarImage
          source={require("../../../assets/avatar-placeholder.png")}
        />
      );
    }
  };

  const handleCheckFields = () => {
    if (!verifyBetweenValues(name.trim().length, 1, 100, true))
      return setIsSendable(false);
    else if (!verifyBetweenValues(description.trim().length, 0, 500))
      return setIsSendable(false);
    else return setIsSendable(true);
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

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Editar grupo" />
      <Container>
        <FormContainer>
          <AvatarContainer>
            <SwitchAvatarButton
              onPress={handleSwitchAvatar}
              activeOpacity={0.6}
            >
              <SwitchAvatarButtonText>
                <Feather name="camera" size={32} /> {"\n"}
                Trocar avatar
              </SwitchAvatarButtonText>
            </SwitchAvatarButton>
            {renderAvatar()}
          </AvatarContainer>
          <FieldContainer>
            <Input
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              onTextInput={handleCheckFields}
            />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              onTextInput={handleCheckFields}
            />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              placeholder="Tags"
              value={tags}
              onChangeText={setTags}
              onTextInput={handleCheckFields}
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
          <Button
            enabled={isSendable}
            title="Concluir"
            onPress={handleSubmit}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default EditGroup;
