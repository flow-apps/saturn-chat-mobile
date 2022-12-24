import React, { useState } from "react";
import Header from "../../components/Header";
import Feather from "@expo/vector-icons/Feather";

import {
  Container,
  OptionsContainer,
  OptionContainer,
  OptionText,
  SectionTitle,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GroupData, ParticipantsData } from "../../../@types/interfaces";
import { useEffect } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";
import Banner from "../../components/Ads/Banner";
import Alert from "../../components/Alert";
import {
  rolesForDeleteGroup,
  rolesForEditGroup,
  rolesForInvite,
} from "../../utils/authorizedRoles";

import _ from "lodash";
import { StackNavigationProp } from "@react-navigation/stack";
import { BannerAdSize } from "react-native-google-mobile-ads";

const GroupConfig: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [participant, setParticipant] = useState<ParticipantsData>(
    {} as ParticipantsData
  );
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showDeleteGroupAlert, setShowDeleteGroupAlert] = useState(false);
  const [showExitGroupAlert, setShowExitGroup] = useState(false);

  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { colors } = useTheme();
  const { id } = route.params as { id: string };

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

      setLoading(false);
    })();
  }, [id]);

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
      <Header title={`Opções do ${group.type === "GROUP" ? "grupo" : "chat"}`} />
      <Alert
        visible={showDeleteGroupAlert}
        title="⚠ Cuidado, isso é perigoso!"
        content={`Essa ação é IRREVERSÍVEL! Ao apagar o grupo "${group.name}" você também estará apagando todas as mensagens, arquivos e qualquer outra coisa que esteja mantendo nesse grupo!`}
        okButtonText="Apagar"
        cancelButtonText="Cancelar"
        cancelButtonAction={() => setShowDeleteGroupAlert(false)}
        okButtonAction={deleteGroup}
      />
      <Alert
        visible={showExitGroupAlert}
        title="😥 Tem certeza que quer ir embora?"
        content={`Ao sair do grupo, suas mensagens serão mantidas, porém, você não receberá notificações de novas mensagens e precisará ser convidado(a) para entrar novamente ao grupo (caso seja privado)!`}
        okButtonText="Sair"
        okButtonAction={exitGroup}
        cancelButtonAction={() => setShowExitGroup(false)}
      />
      <Container>
        <OptionsContainer>
          {group.type === "GROUP" && (
            <>
              <SectionTitle>Gerais</SectionTitle>
              <OptionContainer onPress={handleGoParticipants}>
                <OptionText color={colors.secondary}>
                  <Feather name="users" size={25} /> Participantes
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForInvite.includes(participant.role)}
                onPress={handleGoInviteUsers}
              >
                <OptionText color={colors.primary}>
                  <Feather name="user-plus" size={25} /> Convidar usuários
                </OptionText>
              </OptionContainer>
              <OptionContainer
                hidden={!rolesForEditGroup.includes(participant.role)}
                onPress={handleGoEditGroup}
              >
                <OptionText>
                  <Feather name="edit-3" size={25} /> Editar grupo
                </OptionText>
              </OptionContainer>
              <OptionContainer onPress={handleGoGroupInfos}>
                <OptionText>
                  <Feather name="file" size={25} /> Ver detalhes
                </OptionText>
              </OptionContainer>
            </>
          )}
          {/* <OptionContainer>
            <OptionText>
              <Feather name="bell" size={25} /> Notificações
            </OptionText>
            <Switcher
              currentValue={notifications}
              onChangeValue={handleSetNotifications}
            />
          </OptionContainer> */}
          <SectionTitle color={colors.red}>Zona de perigo</SectionTitle>
          {rolesForDeleteGroup.includes(participant.role) ? (
            <OptionContainer onPress={() => setShowDeleteGroupAlert(true)}>
              <OptionText color={colors.red}>
                <Feather name="trash" size={25} /> Apagar grupo
              </OptionText>
            </OptionContainer>
          ) : (
            <OptionContainer onPress={() => setShowExitGroup(true)}>
              <OptionText color={colors.red}>
                <Feather name="log-out" size={25} /> Sair do grupo
              </OptionText>
            </OptionContainer>
          )}
          <Banner size={BannerAdSize.LARGE_BANNER} />
        </OptionsContainer>
      </Container>
    </>
  );
};

export default GroupConfig;
