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
import { nicknameValidation } from "@utils/regex";
import _ from "lodash";
import { FieldError, SearchText } from "@pages/Auth/Register/styles";

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState("");
  const [user, setUser] = useState<UserData>();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [nickname, setNickname] = useState("");
  const [nicknameTimeout, setNicknameTimeout] = useState<NodeJS.Timeout>();
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [nicknameError, setNicknameError] = useState(false);
  const [fetchingNickname, setFetchingNickname] = useState(false);
  const nicknameErrors = {
    400: "O nome de usuário não está conforme os padrões esperados",
    404: "O nome de usuário não foi fornecido",
    1000: "Não foi possível buscar o nome de usuário",
    unavailable: "O nome de usuário não está disponível",
  };

  const [isSendable, setIsSendable] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { updateUser } = useAuth();
  const { t } = useTranslate("EditProfile");

  const checkNickname = async (nick: string) => {
    if (fetchingNickname) return;

    if (!nick.trim().length) {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }

    setFetchingNickname(true);

    await api
      .get(`/users/nickname/check/${nick}`)
      .then((res) => {
        const { is_available } = res.data;

        if (is_available) {
          setNicknameError(false);
          setNicknameErrorMessage("");
        } else {
          setNicknameError(true);
          setNicknameErrorMessage(nicknameErrors.unavailable);
        }
      })
      .catch((error) => {
        const status = error.response.status;

        if (status === 404) {
          setNicknameError(false);
          setNicknameErrorMessage("");
          return;
        }

        setNicknameError(true);
        setNicknameErrorMessage(nicknameErrors[status]);
      })
      .finally(() => setFetchingNickname(false));
  };

  const handleSetNickname = (value: string) => {
    setNickname(value);

    if (!value.length) {
      setNicknameError(true);
      setNicknameErrorMessage(nicknameErrors[404]);

      return;
    }

    if (!nicknameValidation.test(value)) {
      setNicknameError(true);
      setNicknameErrorMessage(nicknameErrors[400]);
      if (nicknameTimeout) {
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }
    } else {
      setNicknameError(false);
      setNicknameErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    console.log(nickname);
    
    await api
      .patch("/users/update", {
        name,
        nickname,
        bio,
      })
      .then(async (res) => {
        if (res.status === 200) {
          await updateUser({
            user: res.data.user,
          });
          SimpleToast.show(t("toasts.updated"), SimpleToast.SHORT);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
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
      SimpleToast.show(t("toasts.update_avatar"), SimpleToast.SHORT);
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
          SimpleToast.show(t("toasts.updated_avatar"), SimpleToast.SHORT);
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
    if (!name.length || !nickname || !nickname.length) {
      return setIsSendable(false);
    }

    const oldInfos = {
      name: user.name,
      nickname: user?.nickname || "",
      bio: user.bio,
    };

    const newInfos = {
      name,
      nickname: nickname || "",
      bio,
    };

    setIsSendable(!_.isEqual(oldInfos, newInfos));
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get("/users/@me");

      if (res.status === 200) {
        setUser(res.data);
        setName(res.data.name);
        setNickname(res.data?.nickname);
        setBio(res.data.bio);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const NICKNAME_TIMEOUT = 500;

    if (nicknameError) return;

    if (!nickname || !nickname.length) {
      if (nicknameTimeout) {
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }

      return;
    }

    if (nickname === user.nickname) {
      setNicknameError(false);
      setNicknameErrorMessage("");
      return;
    }

    if (nicknameTimeout) {
      clearTimeout(nicknameTimeout);

      const newTimeout = setTimeout(async () => {
        await checkNickname(nickname);
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }, NICKNAME_TIMEOUT);

      setNicknameTimeout(newTimeout);
    } else {
      const newTimeout = setTimeout(async () => {
        await checkNickname(nickname);
        clearTimeout(nicknameTimeout);
        setNicknameTimeout(null);
      }, NICKNAME_TIMEOUT);

      setNicknameTimeout(newTimeout);
    }

    return () => clearTimeout(nicknameTimeout);
  }, [nickname]);

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
                label={"Nome de usuário"}
                placeholder={"pedro_henrique"}
                value={nickname}
                onChangeText={handleSetNickname}
                onTextInput={handleCheckFields}
                maxLength={100}
              />
              {fetchingNickname && <SearchText>Buscando...</SearchText>}
              {nicknameError && <FieldError>{nicknameErrorMessage}</FieldError>}
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
            enabled={isSendable && !nicknameError && !fetchingNickname}
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
