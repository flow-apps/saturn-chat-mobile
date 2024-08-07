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

import { FAB } from "react-native-paper";

import InputNumber from "@components/InputNumber";
import RNPickerSelect from "react-native-picker-select";
import SimpleToast from "react-native-simple-toast";
import _ from "lodash";

const GroupConfig: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>(
    {} as ParticipantsData
  );
  const [groupSettings, setGroupSettings] = useState<ISetting[]>();
  const [participantSettings, setParticipantSettings] = useState<ISetting[]>();
  const [loading, setLoading] = useState(true);
  const [showDeleteGroupAlert, setShowDeleteGroupAlert] = useState(false);
  const [showExitGroupAlert, setShowExitGroup] = useState(false);
  const [hasUpdateGroupSettings, setHasUpdateGroupSettings] = useState(false);
  const [hasUpdateParticipantSettings, setHasUpdateParticipantSettings] =
    useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);

  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors, title } = useTheme();
  const { id } = route.params as { id: string };
  const { t } = useTranslate("GroupConfig");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const groupRes = await api.get(`/group/${id}`);
      const participantRes = await api.get(`/group/participant/${id}`);

      if (groupRes.status === 200) {
        setGroup(groupRes.data);
        setGroupSettings(groupRes.data.group_settings);
      }

      if (participantRes.status === 200) {
        setParticipant(participantRes.data.participant);
        setParticipantSettings(
          participantRes.data.participant.participant_settings
        );
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!participant) return;
    const authorizedRoles = [
      ParticipantRoles.ADMIN,
      ParticipantRoles.MANAGER,
      ParticipantRoles.OWNER,
    ];

    setShowGroupSettings(authorizedRoles.includes(participant.role));
  }, [participant]);

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

  const updateGroupSetting = (settingName: string, newValue: any) => {
    const updatedSettings = groupSettings.map((setting) => {
      if (setting.setting_name === settingName) {
        setting.setting_value = String(newValue);
      }

      return setting;
    });

    if (!hasUpdateGroupSettings) {
      setHasUpdateGroupSettings(true);
    }

    setGroupSettings(updatedSettings);
  };

  const updateParticipantSetting = (settingName: string, newValue: any) => {
    const updatedSettings = participantSettings.map((setting) => {
      if (setting.setting_name === settingName) {
        setting.setting_value = String(newValue);
      }

      return setting;
    });

    if (!hasUpdateGroupSettings) {
      setHasUpdateParticipantSettings(true);
    }

    setParticipantSettings(updatedSettings);
  };

  const handleSubmitGroupSettings = async () => {
    if (!hasUpdateGroupSettings && !hasUpdateParticipantSettings) return;

    setLoading(true);

    if (hasUpdateGroupSettings) {
      await api
        .patch(`/group/settings/${id}`, { settings: groupSettings })
        .then((res) => {
          if (res.status === 200) {
            setGroupSettings(res.data);
            setHasUpdateGroupSettings(false);

            SimpleToast.show(
              "Configurações alteradas com sucesso",
              SimpleToast.SHORT
            );
          }
        })
        .catch((error) => {
          console.log(error.response.data);

          SimpleToast.show(
            "Não foi possível salvar as alterações",
            SimpleToast.SHORT
          );
        });
    }

    if (hasUpdateParticipantSettings) {
      await api
        .patch(`/group/participant/settings/${participant.id}`, {
          settings: participantSettings,
        })
        .then((res) => {
          if (res.status === 200) {
            setParticipantSettings(res.data);
            setHasUpdateParticipantSettings(false);

            SimpleToast.show(
              "Configurações alteradas com sucesso",
              SimpleToast.SHORT
            );
          }
        })
        .catch((error) => {
          console.log(error.response.data);

          SimpleToast.show(
            "Não foi possível salvar as alterações",
            SimpleToast.SHORT
          );
        });
    }

    setLoading(false);
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
        <OptionsContainer>
          {group.type === "GROUP" && (
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
              {showGroupSettings &&
                groupSettings.map((setting) => (
                  <OptionContainer
                    style={{
                      flexDirection: ["select", "participant_role"].includes(
                        setting.input_type
                      )
                        ? "column"
                        : "row",
                    }}
                    key={setting.id}
                    disabled={true}
                  >
                    <OptionText>
                      <Feather name="info" size={20} />{" "}
                      {t(`options.general.${setting.setting_name}`)}
                    </OptionText>
                    {setting.input_type === "switch" && (
                      <OptionActionContainer>
                        <Switcher
                          currentValue={setting.setting_value === "true"}
                          onChangeValue={(value) =>
                            updateGroupSetting(setting.setting_name, value)
                          }
                        />
                      </OptionActionContainer>
                    )}
                    {setting.input_type === "participant_role" && (
                      <RNPickerSelect
                        onValueChange={(value) => {
                          if (!value) {
                            setHasUpdateGroupSettings(false);
                            return;
                          }
                          updateGroupSetting(setting.setting_name, value);
                        }}
                        value={setting.setting_value}
                        placeholder={{
                          label: "Selecione um cargo",
                          value: undefined,
                          color: colors.light_gray,
                        }}
                        style={{
                          inputAndroid: {
                            backgroundColor: colors.shape,
                          },
                        }}
                        items={[
                          {
                            label: t(`options.general.roles.participant`),
                            value: ParticipantRoles.PARTICIPANT,
                            color: colors.dark_heading,
                          },
                          {
                            label: t(`options.general.roles.moderator`),
                            value: ParticipantRoles.MODERATOR,
                            color: colors.primary,
                          },
                          {
                            label: t(`options.general.roles.manager`),
                            value: ParticipantRoles.MANAGER,
                            color: colors.green,
                          },
                          {
                            label: t(`options.general.roles.admin`),
                            value: ParticipantRoles.ADMIN,
                            color: colors.red,
                          },
                        ]}
                      />
                    )}
                    {setting.input_type === "number" && (
                      <InputNumber currentValue={0} onChangeValue={() => {}} />
                    )}
                  </OptionContainer>
                ))}
            </>
          )}
        </OptionsContainer>
        <OptionsContainer>
          <SectionTitle>Configurações do participante</SectionTitle>
          {participantSettings.map((setting) => (
            <OptionContainer
              style={{
                flexDirection: ["select", "participant_role"].includes(
                  setting.input_type
                )
                  ? "column"
                  : "row",
              }}
              key={setting.id}
              disabled={true}
            >
              <OptionText>
                <Feather name="info" size={20} />{" "}
                {t(`options.participant.${setting.setting_name}`)}
              </OptionText>
              {setting.input_type === "switch" && (
                <OptionActionContainer>
                  <Switcher
                    currentValue={setting.setting_value === "true"}
                    onChangeValue={(value) =>
                      updateParticipantSetting(setting.setting_name, value)
                    }
                  />
                </OptionActionContainer>
              )}
              {setting.input_type === "number" && (
                <InputNumber currentValue={0} onChangeValue={() => {}} />
              )}
            </OptionContainer>
          ))}
        </OptionsContainer>
        {group.type === "GROUP" &&
          rolesForDeleteGroup.includes(participant.role) && (
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
              {participant.role !== ParticipantRoles.OWNER && (
                <OptionContainer onPress={() => setShowExitGroup(true)}>
                  <OptionText color={colors.red}>
                    <Feather name="log-out" size={20} />{" "}
                    {t("options.danger_zone.exit_group")}
                  </OptionText>
                </OptionContainer>
              )}
            </>
          )}
        {group.type === "GROUP" &&
          participant.role !== ParticipantRoles.OWNER && (
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
      {(hasUpdateGroupSettings || hasUpdateParticipantSettings) && (
          <FAB
            icon="content-save-cog"
            color={"#fff"}
            elevation={0}
            style={{
              position: "absolute",
              right: 20,
              bottom: 20,
              backgroundColor: colors.primary,
            }}
            onPress={handleSubmitGroupSettings}
          />
      )}
    </>
  );
};

export default GroupConfig;
