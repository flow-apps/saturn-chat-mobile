import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useTheme } from "styled-components";
import CheckBox from "@components/Checkbox";
import {
  ButtonAction,
  Container,
  PunishAnimation,
  PunishAnimationWrapper,
  PunishContentContainer,
  PunishDescription,
  PunishTitle,
  PunishNotifyContainer,
  PunishNotifyInput,
  PunishLabel,
  ButtonText,
  ButtonsContainer,
} from "./styles";
import api from "@services/api";
import Loading from "@components/Loading";
import SimpleToast from "react-native-simple-toast";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";
import { useTranslate } from "@hooks/useTranslate";

const PunishParticipant: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { colors } = useTheme();
  const { t } = useTranslate("PunishParticipant");

  const { type, participant } = route.params as {
    [key: string]: any;
  };
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeNotify = () => {
    setNotify((old) => !old);
  };

  const handlePunish = async () => {
    setLoading(true);
    await api
      .get(
        `/group/participant/${type}/${participant?.id}?group_id=${participant?.group.id}`
      )
      .then((res) => {
        if (res.status === 204) {
          SimpleToast.show(t("toasts.success"));
          navigation.navigate("Chat", { id: participant?.group.id });
        }
      })
      .catch(() => {
        SimpleToast.show(t("toasts.error"));
      });

    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <>
      <Container>
        <PunishContentContainer>
          <PunishTitle>{t("title")}</PunishTitle>
          <PunishAnimationWrapper>
            <PunishAnimation
              source={require("@assets/alert.json")}
              loop={false}
              autoPlay
            />
          </PunishAnimationWrapper>
          <PunishDescription>
            {t(type === "kick" ? "desc_kick" : "desc_ban", {
              groupName: participant?.group.name,
              userName: participant?.user.name,
            })}
          </PunishDescription>
          <PunishNotifyContainer>
            <PunishNotifyInput>
              <CheckBox checked={notify} onChange={handleChangeNotify} />
              <PunishLabel>{t("notify_text")}</PunishLabel>
            </PunishNotifyInput>
          </PunishNotifyContainer>
          <ButtonsContainer>
            <ButtonAction onPress={handlePunish}>
              <ButtonText>
                {type === "kick"
                  ? t("confirm_text_kick")
                  : t("confirm_text_ban")}
              </ButtonText>
            </ButtonAction>
            <ButtonAction onPress={handleGoBack} color={colors.red}>
              <ButtonText>{t("cancel_text")}</ButtonText>
            </ButtonAction>
          </ButtonsContainer>
        </PunishContentContainer>
      </Container>
    </>
  );
};

export default PunishParticipant;
