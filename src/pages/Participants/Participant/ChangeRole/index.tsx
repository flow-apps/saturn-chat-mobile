import React, { useState } from "react";
import { useTheme } from "styled-components";
import Header from "../../../../components/Header";
import Radio from "../../../../components/Radio";
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
import Button from "../../../../components/Button";
import { useRoute } from "@react-navigation/core";
import { ParticipantsData } from "../../../../../@types/interfaces";
import api from "../../../../services/api";
import SimpleToast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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

  const rolesData = [
    {
      name: "Participante",
      radioValue: "participant",
      color: colors.black,
      icon: "user",
    },
    {
      name: "Moderador",
      radioValue: "mod",
      color: colors.primary,
      icon: "shield",
    },
    {
      name: "Gerente",
      radioValue: "manager",
      color: colors.green,
      icon: "command",
    },
    {
      name: "Administrador",
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
          SimpleToast.show("Cargo do usuário alterado com sucesso");
          navigation.navigate("Chat", { id: participant.group.id });
        }
      })
      .catch(res => {        
        SimpleToast.show("Erro ao alterar cargo. Tente novamente.");
      });
  };

  return (
    <>
      <Header title="Alterar cargo"  />
      <Container>
        <ContentContainer>
          <ContentTitle>Cargos</ContentTitle>
          <ContentDescription>
            Membros com cargos especiais podem ter controle em diversos recursos
            (como de gerenciamento de cargos e convites, edição do grupo, etc)
            do grupo. Dê cargos importantes para pessoas em que confia.
          </ContentDescription>
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
              <Feather name={create_invites ? "check" : "x"} size={16} /> Criar
              convites para convidar novos usuários
            </RolePermission>
            <RolePermission>
              <Feather name={punish_members ? "check" : "x"} size={16} /> Punir
              participantes bagunceiros
            </RolePermission>
            <RolePermission>
              <Feather name={manage_roles ? "check" : "x"} size={16} />{" "}
              Gerenciar cargos
            </RolePermission>
            <RolePermission>
              <Feather name={manage_messages ? "check" : "x"} size={16} />{" "}
              Gerenciar mensagens (como apagar elas)
            </RolePermission>
            <RolePermission>
              <Feather name={edit_group ? "check" : "x"} size={16} /> Editar
              informações do grupo (nome, avatar, descrição)
            </RolePermission>
            <RolePermission>
              <Feather name={delete_group ? "check" : "x"} size={16} /> Apagar o
              grupo
            </RolePermission>
          </RolePermissionsContainer>
        </RoleInfoContainer>
        <Button onPress={handleSetRole} title="Salvar cargo" />
      </Container>
    </>
  );
};

export default ChangeRole;
