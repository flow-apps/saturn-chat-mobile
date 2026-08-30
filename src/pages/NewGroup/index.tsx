import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "@components/Header";
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
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import Button from "@components/Button";
import CustomAlert from "@components/Alert";
import * as ImagePicker from "expo-image-picker";
import Switcher from "@components/Switcher";
import api from "@services/api";
import { useNavigation } from "@react-navigation/core";
import FormData from "form-data";
import Loading from "@components/Loading";
import Banner from "@components/Ads/Banner";
import analytics from "@react-native-firebase/analytics";
import { verifyBetweenValues } from "../../utils";
import { UserData } from "@type/interfaces";
import { useRemoteConfigs } from "@contexts/remoteConfigs";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";

interface AlertConfigState {
  visible: boolean;
  title: string;
  content: string;
  extraButton?: boolean;
  extraButtonText?: string;
  extraButtonAction?: () => void;
  okButtonAction?: () => void;
}

const NewGroup: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groupPhoto, setGroupPhoto] = useState<ImagePicker.ImagePickerAsset>();
  const [groupPhotoPreview, setGroupPhotoPreview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isPublicGroup, setIsPublicGroup] = useState(true);
  const [user, setUser] = useState<UserData>({} as UserData);

  const [isSendable, setIsSendable] = useState(false);

  const [alertConfig, setAlertConfig] = useState<AlertConfigState>({
    visible: false,
    title: "",
    content: "",
  });

  const hideAlert = useCallback(() => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
  }, []);

  const { colors } = useTheme();
  const { userConfigs, allConfigs } = useRemoteConfigs();
  const premium = false;
  const navigator = useNavigation<StackNavigationProp<any>>();
  const { t } = useTranslate("NewGroup");

  const amountGroups = useMemo(() => {
    if (!user.groups) return 0;

    let counter = 0;

    user.groups.forEach((group) => {
      if (group.owner_id === user.id && group.type === "GROUP") {
        counter++;
      }
    });

    return counter;
  }, [user]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/@me");

        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error: any) {
        setAlertConfig({
          visible: true,
          title: t("alerts.error.title", { defaultValue: "Erro" }),
          content:
            error?.response?.data?.message ||
            "Não foi possível carregar as informações do usuário.",
        });
      } finally {
        setLoading(false);
      }
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

    try {
      const response = await api.post("/groups", data, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      if (response.status === 200) {
        trace.putAttribute("group_id", response.data.id);
        await analytics().logEvent("created_group", {
          group_id: response.data.id,
        });
        navigator.navigate("GroupsChat");
      }
    } catch (error: any) {
      setAlertConfig({
        visible: true,
        title: t("alerts.error.title", { defaultValue: "Erro" }),
        content:
          error?.response?.data?.message ||
          "Não foi possível criar o grupo. Tente novamente.",
      });
    } finally {
      await trace.stop();
      setCreating(false);
    }
  };

  const handleCheckFields = (textName: string) => {
    if (verifyBetweenValues(textName.length, 0, 100)) return setIsSendable(true);
    setIsSendable(false);
  };

  const handleSetPublic = () => {
    setIsPublicGroup(!isPublicGroup);
  };

  const handleSelectGroupPhoto = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();

    if (!granted) {
      const { granted: requestGranted } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!requestGranted) {
        setAlertConfig({
          visible: true,
          title: t("alerts.permission.title", { defaultValue: "Atenção" }),
          content: "Precisamos da permissão para acessar suas fotos!",
        });
        return;
      }
    }

    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        aspect: [600, 600],
        allowsEditing: true,
        quality: 0.7,
        allowsMultipleSelection: false,
        mediaTypes: ["images"],
      });

      if (!photo.canceled && photo.assets[0]) {
        const selectedAsset = photo.assets[0];
        setGroupPhotoPreview(selectedAsset.uri);
        setGroupPhoto(selectedAsset);
      }
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: t("alerts.error.title", { defaultValue: "Erro" }),
        content: "Não foi possível carregar a imagem selecionada.",
      });
    }
  };

  if (creating || loading) {
    return <Loading />;
  }

  if (amountGroups >= userConfigs.amountGroups) {
    return (
      <Container>
        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          content={alertConfig.content}
          okButtonAction={alertConfig.okButtonAction || hideAlert}
          extraButton={alertConfig.extraButton}
          extraButtonText={alertConfig.extraButtonText}
          extraButtonAction={alertConfig.extraButtonAction}
        />

        <ReachedLimitContainer>
          <AnimationContainer>
            <Animation
              source={require("@assets/crying.json")}
              autoPlay
              loop
            />
          </AnimationContainer>
          <ReachedLimitTitle>
            {t("limit.title", { count: userConfigs.amountGroups })}
          </ReachedLimitTitle>
          <ReachedLimitDescription>
            {t("limit.subtitle")}
          </ReachedLimitDescription>
          {!premium && (
            <ReachedLimitStarContainer>
              <ReachedLimitStarDescription>
                {t("limit.premium", {
                  groups: allConfigs.premium_max_groups,
                  participants: allConfigs.premium_max_participants,
                })}
              </ReachedLimitStarDescription>
              <Button
                title={t("star")}
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        content={alertConfig.content}
        okButtonAction={alertConfig.okButtonAction || hideAlert}
        extraButton={alertConfig.extraButton}
        extraButtonText={alertConfig.extraButtonText}
        extraButtonAction={alertConfig.extraButtonAction}
      />

      <Header title={t("header_title")} backButton={false} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container style={{ flex: 1 }}>
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
                  <Feather
                    name="camera"
                    size={55}
                    color={colors.secondary}
                  />
                )}
              </SelectGroupPhoto>
              <SelectGroupPhotoTitle>
                {!groupPhotoPreview
                  ? t("avatar_select_label")
                  : t("avatar_selected")}
              </SelectGroupPhotoTitle>
              <SelectGroupPhotoSubtitle>
                {!groupPhotoPreview && t("avatar_select_tip")}
              </SelectGroupPhotoSubtitle>
            </SelectGroupPhotoContainer>
            <Form>
              <FormContainer>
                <FormInput
                  label={t("form.labels.name.label")}
                  placeholder={t("form.labels.name.placeholder")}
                  maxLength={100}
                  selectionColor={colors.secondary}
                  returnKeyType="next"
                  value={name}
                  onChangeText={(text) => {
                    setName(text);
                    handleCheckFields(text);
                  }}
                />
                <TextArea
                  label={t("form.labels.desc.label")}
                  multiline
                  selectionColor={colors.secondary}
                  placeholder={t("form.labels.desc.placeholder")}
                  maxLength={500}
                  value={description}
                  onChangeText={setDescription}
                />
                <TextArea
                  label={t("form.labels.tags.label")}
                  multiline
                  selectionColor={colors.secondary}
                  placeholder={t("form.labels.tags.placeholder")}
                  value={tags}
                  onChangeText={setTags}
                />
                <SwitcherContainer>
                  <SwitcherText>
                    <Feather
                      name={isPublicGroup ? "unlock" : "lock"}
                      size={30}
                      color={colors.light_heading}
                    />
                    {"  "}
                    {isPublicGroup
                      ? t("form.labels.public")
                      : t("form.labels.private")}
                  </SwitcherText>
                  <Switcher
                    onChangeValue={handleSetPublic}
                    currentValue={isPublicGroup}
                  />
                </SwitcherContainer>
                <ButtonWrapper>
                  <Button
                    enabled={isSendable}
                    title={t("form.create_group")}
                    onPress={handleCreateGroup}
                  />
                </ButtonWrapper>
              </FormContainer>
            </Form>
          </Container>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewGroup;