import React, { useState } from "react";
import { useTheme } from "styled-components";
import Header from "@components/Header";
import Radio from "@components/Radio";
import {
  Container,
  ContentContainer,
  ContentDescription,
  ContentTitle,
  RoleContainer,
  RoleInfoContainer,
  RoleLabel,
  RolesContainer,
  RoleTitle,
  RoleDescription,
  RolePermissionsContainer,
  RolePermission,
} from "./styles";

import Feather from "@expo/vector-icons/Feather";
import roles from "./roles";
import Button from "@components/Button";
import { useRoute } from "@react-navigation/core";
import { ParticipantsData } from "@type/interfaces";
import api from "@services/api";
import SimpleToast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslate } from "@hooks/useTranslate";

type Roles = "participant" | "mod" | "admin";

const ChangeRole: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { participant, id } = useRoute().params as {
    participant: ParticipantsData;
    id: string;
  };
  const { colors } = useTheme();
  const [role, setRole] = useState<Roles>(
    participant.role.toLocaleLowerCase() as Roles
  );
  const { name, description, permissions } = roles[role];
  const {
    create_invites,
    delete_group,
    edit_group,
    manage_messages,
    manage_roles,
    punish_members,
  } = permissions;

  const { t } = useTranslate("ChangeRole");

  const rolesData = [
    {
      name: t("roles.participant.name"),
      radioValue: "participant",
      color: colors.black,
      icon: "user",
    },
    {
      name: t("roles.mod.name"),
      radioValue: "mod",
      color: colors.primary,
      icon: "shield",
    },
    {
      name: t("roles.manager.name"),
      radioValue: "manager",
      color: colors.green,
      icon: "command",
    },
    {
      name: t("roles.admin.name"),
      radioValue: "admin",
      color: colors.red,
      icon: "zap",
    },
  ];

  const handleChangeRole = (selectedRole: any) => {
    setRole(selectedRole);
  };

  const handleSetRole = async () => {
    await api
      .post(
        `/group/participant/role/set/${
          participant.id
        }?role=${role.toUpperCase()}&group_id=${participant.group.id}`
      )
      .then((res) => {
        if (res.status === 204) {
          SimpleToast.show(t("toasts.success"),SimpleToast.SHORT);
          navigation.navigate("Chat", { id: participant.group.id });
        }
      })
      .catch((res) => {
        SimpleToast.show(t("toasts.error"),SimpleToast.SHORT);
      });
  };

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <ContentContainer>
          <ContentTitle>{t("title")}</ContentTitle>
          <ContentDescription>{t("subtitle")}</ContentDescription>
        </ContentContainer>
        <RolesContainer>
          {rolesData.map((r, index) => (
            <RoleContainer key={index}>
              <Radio
                value={r.radioValue}
                color={r.color}
                selectedValue={role}
                onValueChange={handleChangeRole}
              />
              <RoleLabel color={r.color}>
                <Feather name={r.icon as any} size={18} /> {r.name}
              </RoleLabel>
            </RoleContainer>
          ))}
        </RolesContainer>
        <RoleInfoContainer>
          <RoleTitle>{name}</RoleTitle>
          <RoleDescription>{description}</RoleDescription>
          <RolePermissionsContainer>
            <RolePermission>
              <Feather name={create_invites ? "check" : "x"} size={16} />{" "}
              {t("permissions.create_invites")}
            </RolePermission>
            <RolePermission>
              <Feather name={punish_members ? "check" : "x"} size={16} />{" "}
              {t("permissions.punish_members")}
            </RolePermission>
            <RolePermission>
              <Feather name={manage_roles ? "check" : "x"} size={16} />{" "}
              {t("permissions.manage_roles")}
            </RolePermission>
            <RolePermission>
              <Feather name={manage_messages ? "check" : "x"} size={16} />{" "}
              {t("permissions.manage_messages")}
            </RolePermission>
            <RolePermission>
              <Feather name={edit_group ? "check" : "x"} size={16} />{" "}
              {t("permissions.edit_group")}
            </RolePermission>
            <RolePermission>
              <Feather name={delete_group ? "check" : "x"} size={16} />{" "}
              {t("permissions.delete_group")}
            </RolePermission>
          </RolePermissionsContainer>
        </RoleInfoContainer>
        <Button onPress={handleSetRole} title="Salvar cargo" />
      </Container>
    </>
  );
};

export default ChangeRole;
