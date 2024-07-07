import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import FormData from "form-data";
import { Alert, KeyboardAvoidingView } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { UserData } from "@type/interfaces";
import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Loading from "@components/Loading";
import { useAuth } from "@contexts/auth";
import api from "@services/api";
import {
  AvatarContainer,
  AvatarImage,
  Container,
  FieldContainer,
  FieldsContainer,
  FormContainer,
  SwitchAvatarButton,
  SwitchAvatarButtonText,
} from "./styles";
import { useTranslate } from "@hooks/useTranslate";
import Banner from "@components/Ads/Banner";
import { BannerAdSize } from "react-native-google-mobile-ads";

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState("");
  const [user, setUser] = useState<UserData>();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [isSendable, setIsSendable] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { updateUser } = useAuth();
  const { t } = useTranslate("EditProfile");

  const handleSubmit = async () => {
    const newUser = await api.patch("/users/update", {
      name,
      bio,
    });

    if (newUser.status === 200) {
      await updateUser({
        user: newUser.data.user,
      });
      SimpleToast.show(t("toasts.updated"),SimpleToast.SHORT);
      navigation.goBack();
    }
  };

  const handleSwitchAvatar = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();

    if (!granted) {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();

      if (!granted) {
        return Alert.alert(t("toasts.photo_permission"));
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
      SimpleToast.show(t("toasts.update_avatar"),SimpleToast.SHORT);
      const uri = photo.assets[0].uri;
      const uriParts = uri.split(".");
      const fileType = uriParts.pop();
      const data = new FormData();

      data.append("avatar", {
        uri: uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      await api
        .patch(`/users/update/avatar`, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then(async (res) => {
          await updateUser(res.data);
          setNewAvatar(uri);
          SimpleToast.show(t("toasts.updated_avatar"),SimpleToast.SHORT);
        });
    }
  };

  const renderAvatar = () => {
    if (newAvatar) {
      return <AvatarImage source={{ uri: newAvatar }} />;
    }

    const avatar = user?.avatar;

    if (avatar) {
      return <AvatarImage source={{ uri: avatar.url }} />;
    } else {
      return <AvatarImage source={require("@assets/avatar-placeholder.png")} />;
    }
  };

  const handleCheckFields = () => {
    if (!name.length || name === user?.name) setIsSendable(false);
    if (bio === user?.bio) setIsSendable(false);
    else return setIsSendable(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/users/@me");

      if (res.status === 200) {
        setUser(res.data);
        setName(res.data.name);
        setBio(res.data.bio);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <FormContainer>
          <AvatarContainer>
            <SwitchAvatarButton
              onPress={handleSwitchAvatar}
              activeOpacity={0.6}
            >
              <SwitchAvatarButtonText>
                <Feather name="camera" size={32} /> {"\n"}
                {t("switch_avatar")}
              </SwitchAvatarButtonText>
            </SwitchAvatarButton>
            {renderAvatar()}
          </AvatarContainer>
          <FieldsContainer>
            <FieldContainer>
              <Input
                label={t("labels.name.label")}
                placeholder={t("labels.name.placeholder")}
                value={name}
                onChangeText={setName}
                onTextInput={handleCheckFields}
                maxLength={100}
              />
            </FieldContainer>
            <FieldContainer>
              <Input
                label={t("labels.bio.label")}
                placeholder={t("labels.bio.placeholder")}
                value={bio}
                onChangeText={setBio}
                onTextInput={handleCheckFields}
                maxLength={100}
                multiline={true}
              />
            </FieldContainer>
          </FieldsContainer>
          <Button
            enabled={isSendable}
            title={t("done")}
            onPress={handleSubmit}
          />
        </FormContainer>
        <Banner size={BannerAdSize.BANNER} />
      </Container>
    </>
  );
};

export default EditProfile;
