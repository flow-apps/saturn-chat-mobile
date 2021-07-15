import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { UserData } from "../../../../@types/interfaces";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../contexts/auth";
import api from "../../../services/api";
import {
  AvatarContainer,
  AvatarImage,
  Container,
  FieldContainer,
  FieldsContainer,
  FormContainer,
  SwitchAvatarButton,
  SwitchAvatarButtonText
} from "./styles";

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState("");
  const [user, setUser] = useState<UserData>();
  const [name, setName] = useState("");

  const navigation = useNavigation();
  const { updateUser } = useAuth();

  const handleSubmit = async () => {
    const newUser = await api.patch("/users/update", {
      name,
    });

    if (newUser.status === 200) {
      await updateUser({
        user: newUser.data.user,
      });
      SimpleToast.show("Usuário atualizado");
      navigation.goBack();
    }
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

      data.append("avatar", {
        uri: photo.uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      await api
        .patch(`/users/update/avatar`, data, {
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
      const res = await api.get("/users/@me");

      if (res.status === 200) {
        setUser(res.data);
        setName(res.data.name);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Editar perfil" backButton />
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
            <AvatarImage source={{ uri: newAvatar || user?.avatar.url }} />
          </AvatarContainer>
          <FieldsContainer>
            <FieldContainer>
              <Input label="Nome" value={name} onChangeText={setName} />
            </FieldContainer>
          </FieldsContainer>
          <Button title="Concluir" onPress={handleSubmit} />
        </FormContainer>
      </Container>
    </>
  );
};

export default EditProfile;
