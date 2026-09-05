import React, { useEffect, useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "@components/Button";
import Header from "@components/Header";
import Input from "@components/Input";
import Loading from "@components/Loading";
import Switcher from "@components/Switcher";
import CustomAlert from "@components/Alert";
import FormData from "form-data";
import SimpleToast from "react-native-simple-toast";
import api from "@services/api";
import Feather from "@expo/vector-icons/Feather";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GroupData } from "@type/interfaces";
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
  CategoryContainer,
} from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";
import { GroupCategory } from "@type/enums";
import { Label } from "@components/Input/styles";
import { biometricsControl } from "@services/biometricsControl";

interface AlertConfigState {
  visible: boolean;
  title: string;
  content: string;
  extraButton?: boolean;
  extraButtonText?: string;
  extraButtonAction?: () => void;
  okButtonAction?: () => void;
}

const EditGroup: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState<GroupData>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [groupCategory, setGroupCategory] = useState<GroupCategory>(
    GroupCategory.OTHER,
  );
  const [isPublicGroup, setIsPublicGroup] = useState<boolean>(false);
  const [newAvatar, setNewAvatar] = useState<string | undefined>();
  const [isSendable, setIsSendable] = useState(false);

  // Estado unificado para o CustomAlert
  const [alertConfig, setAlertConfig] = useState<AlertConfigState>({
    visible: false,
    title: "",
    content: "",
  });

  const hideAlert = useCallback(() => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("EditGroup");
  const { t: categoryT } = useTranslate("NewGroup");
  const { colors } = useTheme();

  const { id } = route.params as any;

  const handleIsPublic = (value: boolean) => {
    handleCheckFields();
    setIsPublicGroup(value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await api.patch(`/group/${id}`, {
        name,
        description,
        privacy: isPublicGroup ? "PUBLIC" : "PRIVATE",
        tags,
        category: groupCategory,
      });

      SimpleToast.show(t("toasts.success"), SimpleToast.SHORT);
      navigation.goBack();
    } catch (error: any) {
      setAlertConfig({
        visible: true,
        title: t("alerts.error.title", { defaultValue: "Erro" }),
        content:
          error?.response?.data?.message ||
          "Não foi possível atualizar as informações do grupo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchAvatar = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();

    if (!granted) {
      const { granted: requestGranted } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!requestGranted) {
        setAlertConfig({
          visible: true,
          title: t("alerts.permission.title", { defaultValue: "Atenção" }),
          content: t("toasts.avatar_permission"),
        });
        return;
      }
    }

    biometricsControl.setIgnoreBiometrics(true);
    const photo = await ImagePicker.launchImageLibraryAsync({
      aspect: [600, 600],
      allowsEditing: true,
      quality: 0.7,
      allowsMultipleSelection: false,
      mediaTypes: ["images"],
      base64: true,
      selectionLimit: 1,
    });

    if (!photo.canceled) {
      SimpleToast.show(t("toasts.updating"), SimpleToast.SHORT);
      const uri = photo.assets[0].uri;
      const uriParts = uri.split(".");
      const fileType = uriParts.pop();
      const data = new FormData();

      data.append("group_avatar", {
        uri: uri,
        name: `group_avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      try {
        await api.patch(`/group/avatar/${id}`, data, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        });

        setNewAvatar(uri);
        SimpleToast.show(t("toasts.updated"), SimpleToast.SHORT);
      } catch (error: any) {
        setAlertConfig({
          visible: true,
          title: t("alerts.error.title", { defaultValue: "Erro" }),
          content:
            error?.response?.data?.message ||
            "Não foi possível atualizar o avatar do grupo.",
        });
      }
    }

    biometricsControl.setIgnoreBiometrics(false);
  };

  const renderAvatar = () => {
    if (newAvatar) {
      return <AvatarImage source={{ uri: newAvatar }} />;
    }

    const avatar = group?.group_avatar;

    if (avatar) {
      return <AvatarImage source={{ uri: avatar.url }} />;
    } else {
      return <AvatarImage source={require("@assets/avatar-placeholder.jpg")} />;
    }
  };

  const handleCheckFields = () => {
    const nameValue = name.trim().length;
    const descValue = description.trim().length;

    if (!(nameValue >= 1) || !(nameValue <= 100)) return setIsSendable(false);
    else if (!(descValue >= 0) || !(descValue <= 500))
      return setIsSendable(false);
    else return setIsSendable(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await api.get(`/group/${id}`);

        if (response.status === 200) {
          setGroup(response.data);

          setName(response.data.name);
          setDescription(response.data.description);
          setTags(response.data.tags.join(", "));
          setGroupCategory(response.data.category || GroupCategory.OTHER);
          handleIsPublic(response.data.privacy === "PUBLIC");
        }
      } catch (error: any) {
        setAlertConfig({
          visible: true,
          title: t("alerts.error.title", { defaultValue: "Erro" }),
          content:
            error?.response?.data?.message ||
            "Não foi possível carregar os dados do grupo.",
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <>
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        content={alertConfig.content}
        okButtonAction={alertConfig.okButtonAction || hideAlert}
        extraButton={alertConfig.extraButton}
        extraButtonText={alertConfig.extraButtonText}
        extraButtonAction={alertConfig.extraButtonAction}
      />

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
          <FieldContainer>
            <Input
              label={t("inputs.name")}
              value={name}
              onChangeText={setName}
              onChange={handleCheckFields}
            />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              label={t("inputs.desc")}
              value={description}
              onChangeText={setDescription}
              onChange={handleCheckFields}
            />
          </FieldContainer>
          <FieldContainer>
            <TextArea
              multiline
              label="Tags"
              value={tags}
              onChangeText={setTags}
              onChange={handleCheckFields}
            />
          </FieldContainer>
          <CategoryContainer>
            <Label>{categoryT("form.labels.category.label")}</Label>
            <RNPickerSelect
              onValueChange={(value) => setGroupCategory(value)}
              value={groupCategory}
              style={{
                inputAndroid: {
                  color: colors.light_heading,
                  backgroundColor: colors.shape,
                  paddingHorizontal: 12,
                },
                inputIOS: {
                  color: colors.light_heading,
                  backgroundColor: colors.shape,
                  paddingHorizontal: 12,
                  paddingVertical: 12,
                },
              }}
              dropdownItemStyle={{ backgroundColor: colors.background }}
              activeItemStyle={{ backgroundColor: colors.shape }}
              items={Object.values(GroupCategory)
                .sort((firstCategory, secondCategory) =>
                  categoryT(`categories.${firstCategory}`, {
                    defaultValue: firstCategory.replace(/_/g, " "),
                  }).localeCompare(
                    categoryT(`categories.${secondCategory}`, {
                      defaultValue: secondCategory.replace(/_/g, " "),
                    }),
                  ),
                )
                .map((category) => ({
                  label: categoryT(`categories.${category}`, {
                    defaultValue: category.replace(/_/g, " "),
                  }),
                  value: category,
                  color: colors.light_heading,
                }))}
            />
          </CategoryContainer>
          <FieldContainer>
            <SwitcherContainer>
              <SwitcherText>
                <Feather name="users" size={25} /> {t("inputs.public")}
              </SwitcherText>
              <Switcher
                currentValue={isPublicGroup}
                onChangeValue={handleIsPublic}
              />
            </SwitcherContainer>
          </FieldContainer>
          <Button
            enabled={isSendable}
            title={t("done")}
            onPress={handleSubmit}
          />
        </FormContainer>
      </Container>
    </>
  );
};

export default EditGroup;
