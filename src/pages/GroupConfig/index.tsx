import React, { useState } from "react";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  OptionsContainer,
  OptionContainer,
  OptionText,
  SectionTitle,
} from "./styles";
import Switcher from "../../components/Switcher";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { GroupData } from "../../../@types/interfaces";
import { useEffect } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading";

const GroupConfig: React.FC = () => {
  const [group, setGroup] = useState<GroupData>({} as GroupData);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [isPublic, setIsPublic] = useState(true);

  const route = useRoute();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { id } = route.params as { id: string };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await api.get(`/group/${id}`);

      if (res.status === 200) {
        setGroup(res.data);
      }
      setLoading(false);
    })();
  }, [id]);

  function handleSetNotifications() {
    setNotifications(!notifications);
  }

  function handleSetIsPublic() {
    setIsPublic(!isPublic);
  }

  if (loading) return <Loading />;

  return (
    <>
      <Header title="Opções do grupo" backButton />
      <Container>
        <OptionsContainer>
          <SectionTitle>Gerais</SectionTitle>
          <OptionContainer>
            <OptionText>
              <Feather name="bell" size={25} /> Notificações
            </OptionText>
            <Switcher
              currentValue={notifications}
              onChangeValue={handleSetNotifications}
            />
          </OptionContainer>
          <OptionContainer>
            <OptionText color={colors.primary}>
              <Feather name="user-plus" size={25} /> Convidar usuários
            </OptionText>
          </OptionContainer>
          {group.owner.id === user?.id && (
            <>
              <SectionTitle>Segurança</SectionTitle>
              <OptionContainer>
                <OptionText>
                  <Feather name="users" size={25} /> Tornar Público
                </OptionText>
                <Switcher
                  currentValue={isPublic}
                  onChangeValue={handleSetIsPublic}
                />
              </OptionContainer>
            </>
          )}
          <SectionTitle color={colors.red}>Zona de perigo</SectionTitle>
          {group.owner.id === user?.id && (
            <OptionContainer>
              <OptionText color={colors.red}>
                <Feather name="trash-2" size={25} /> Apagar grupo
              </OptionText>
            </OptionContainer>
          )}
          <OptionContainer>
            <OptionText color={colors.red}>
              <Feather name="log-out" size={25} /> Sair do grupo
            </OptionText>
          </OptionContainer>
        </OptionsContainer>
      </Container>
    </>
  );
};

export default GroupConfig;
