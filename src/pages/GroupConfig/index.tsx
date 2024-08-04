import React, { useState } from "react";
import Header from "@components/Header";

import {
  Container,
  OptionsContainer,
  OptionContainer,
  OptionText,
  SectionTitle,
  OptionActionContainer,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GroupData, ISetting, ParticipantsData } from "@type/interfaces";
import { useEffect } from "react";
import api from "@services/api";
import Loading from "@components/Loading";
import Banner from "@components/Ads/Banner";
import Alert from "@components/Alert";
import {
  rolesForDeleteGroup,
  rolesForEditGroup,
  rolesForInvite,
} from "@utils/authorizedRoles";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";
import { ParticipantRoles } from "@type/enums";
import Switcher from "@components/Switcher";
import { Feather } from "@expo/vector-icons";

const GroupConfig: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>(
    {} as ParticipantsData
  );
  const [groupSettings, setGroupSettings] = useState<ISetting[]>();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showDeleteGroupAlert, setShowDeleteGroupAlert] = useState(false);
  const [showExitGroupAlert, setShowExitGroup] = useState(false);

  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();
  const { id } = route.params as { id: string };
  const { t } = useTranslate("GroupConfig");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const groupRes = await api.get(`/group/${id}`);
      const participantRes = await api.get(`/group/participant/${id}`);

      if (groupRes.status === 200) {
        setGroup(groupRes.data);
      }

      if (participantRes.status === 200) {
        setParticipant(participantRes.data.participant);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const authorizedRoles = [
        ParticipantRoles.ADMIN,
        ParticipantRoles.MANAGER,
        ParticipantRoles.OWNER,
      ];

      setLoading(true);
      if (authorizedRoles.includes(participant.role)) {
        await api
          .get(`/group/settings/${id}`)
          .then((res) => {
            if (res.status === 200) {
              setGroupSettings(res.data);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    })();
  }, [participant]);

  const handleSetNotifications = () => {
    setNotifications(!notifications);
  };

  const handleGoGroupInfos = () => {
    navigation.navigate("GroupInfos", { id });
  };

  const handleGoParticipants = () => {
    navigation.navigate("Participants", { id });
  };

  const handleGoInviteUsers = () => {
    navigation.navigate("InviteUsers", { id });
  };

  const handleGoEditGroup = () => {
    navigation.navigate("EditGroup", { id });
  };

  const deleteGroup = async () => {
    setShowDeleteGroupAlert(false);
    const res = await api.delete(`/group/${id}`);

    if (res.status === 204) {
      navigation.navigate("Groups");
    }
  };

  const exitGroup = async () => {
    setShowExitGroup(false);
    const res = await api.delete(`/group/participant/exit/${id}`);

    if (res.status === 204) {
      navigation.navigate("Groups");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Header
        title={
          group.type === "GROUP"
            ? t("header_group_title")
            : t("header_chat_title")
        }
      />
      <Alert
        visible={showDeleteGroupAlert}
        title={t("alerts.delete_group.title")}
        content={t("alerts.delete_group.content", { name: group.name })}
        okButtonText={t("alerts.delete_group.ok_text")}
        cancelButtonText={t("alerts.delete_group.cancel_text")}
        cancelButtonAction={() => setShowDeleteGroupAlert(false)}
        okButtonAction={deleteGroup}
      />
      <Alert
        visible={showExitGroupAlert}
        title={t("alerts.exit_group.title")}
        content={t("alerts.exit_group.content")}
        okButtonText={t("alerts.exit_group.ok_text")}
        okButtonAction={exitGroup}
        cancelButtonAction={() => setShowExitGroup(false)}
      />
      <Container>
        <SectionTitle>{t("options.general.title")}</SectionTitle>

        <OptionsContainer>
          {/* {group.type === "GROUP" && (
            <>
              <SectionTitle>{t("options.general.title")}</SectionTitle>
              <OptionContainer onPress={handleGoParticipants}>
                <OptionText color={colors.secondary}>
                  <Feather name="users" size={20} />{" "}
                  {t("options.general.participants")}
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForInvite.includes(participant.role)}
                onPress={handleGoInviteUsers}
              >
                <OptionText color={colors.primary}>
                  <Feather name="user-plus" size={20} />{" "}
                  {t("options.general.invite_users")}
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForEditGroup.includes(participant.role)}
                onPress={handleGoEditGroup}
              >
                <OptionText>
                  <Feather name="edit-3" size={20} />{" "}
                  {t("options.general.edit_group")}
                </OptionText>
              </OptionContainer>
              <OptionContainer onPress={handleGoGroupInfos}>
                <OptionText>
                  <Feather name="file" size={20} />{" "}
                  {t("options.general.details")}
                </OptionText>
              </OptionContainer>
            </>
          )}
          {rolesForDeleteGroup.includes(participant.role) &&
            group.type === "GROUP" && (
              <>
                <SectionTitle color={colors.red}>
                  {t("options.danger_zone.title")}
                </SectionTitle>
                <OptionContainer onPress={() => setShowDeleteGroupAlert(true)}>
                  <OptionText color={colors.red}>
                    <Feather name="trash" size={20} />{" "}
                    {t("options.danger_zone.delete_group")}
                  </OptionText>
                </OptionContainer>
              </>
            )}
          {!rolesForDeleteGroup.includes(participant.role) &&
            group.type === "GROUP" && (
              <>
                <SectionTitle color={colors.red}>
                  {t("options.danger_zone.title")}
                </SectionTitle>
                <OptionContainer onPress={() => setShowExitGroup(true)}>
                  <OptionText color={colors.red}>
                    <Feather name="log-out" size={20} />{" "}
                    {t("options.danger_zone.exit_group")}
                  </OptionText>
                </OptionContainer>
              </>
            )}
          <Banner size={BannerAdSize.LARGE_BANNER} /> */}

          {group.type === "GROUP" && (
            <>
              <OptionContainer onPress={handleGoParticipants}>
                <OptionText color={colors.secondary}>
                  <Feather name="users" size={20} />{" "}
                  {t("options.general.participants")}
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForInvite.includes(participant.role)}
                onPress={handleGoInviteUsers}
              >
                <OptionText color={colors.primary}>
                  <Feather name="user-plus" size={20} />{" "}
                  {t("options.general.invite_users")}
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForEditGroup.includes(participant.role)}
                onPress={handleGoEditGroup}
              >
                <OptionText>
                  <Feather name="edit-3" size={20} />{" "}
                  {t("options.general.edit_group")}
                </OptionText>
              </OptionContainer>
              <OptionContainer onPress={handleGoGroupInfos}>
                <OptionText>
                  <Feather name="file" size={20} />{" "}
                  {t("options.general.details")}
                </OptionText>
              </OptionContainer>
            </>
          )}
          {groupSettings.map((setting) => (
            <OptionContainer onPress={() => {}} key={setting.id}>
              <OptionText>
                <Feather name="info" size={20} />{" "}
                {t(`options.general.${setting.setting_name}`)}
              </OptionText>
              {setting.input_type === "switch" && (
                <OptionActionContainer>
                  <Switcher currentValue={true} onChangeValue={() => {}} />
                </OptionActionContainer>
              )}
              {/* {
                setting.input_type === "participant_role" && (
                  
                )
              } */}
              {/* {
                setting.input_type === "number" && (
                  
                )
              } */}
            </OptionContainer>
          ))}
        </OptionsContainer>
        <OptionsContainer>
          <SectionTitle>Configurações do participante</SectionTitle>
        </OptionsContainer>
        {rolesForDeleteGroup.includes(participant.role) &&
          group.type === "GROUP" && (
            <>
              <SectionTitle color={colors.red}>
                {t("options.danger_zone.title")}
              </SectionTitle>
              <OptionContainer onPress={() => setShowDeleteGroupAlert(true)}>
                <OptionText color={colors.red}>
                  <Feather name="trash" size={20} />{" "}
                  {t("options.danger_zone.delete_group")}
                </OptionText>
              </OptionContainer>
            </>
          )}
        {!rolesForDeleteGroup.includes(participant.role) &&
          group.type === "GROUP" && (
            <>
              <SectionTitle color={colors.red}>
                {t("options.danger_zone.title")}
              </SectionTitle>
              <OptionContainer onPress={() => setShowExitGroup(true)}>
                <OptionText color={colors.red}>
                  <Feather name="log-out" size={20} />{" "}
                  {t("options.danger_zone.exit_group")}
                </OptionText>
              </OptionContainer>
            </>
          )}
      </Container>
    </>
  );
};

export default GroupConfig;
