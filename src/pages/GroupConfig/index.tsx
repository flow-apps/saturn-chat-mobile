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

const GroupConfig: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [isPublic, setIsPublic] = useState(true);
  const { colors } = useTheme();

  function handleSetNotifications() {
    setNotifications(!notifications);
  }

  function handleSetIsPublic() {
    setIsPublic(!isPublic);
  }

  return (
    <>
      <Header title="Configurações do grupo" backButton />
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
              <Feather name="user-plus" size={25} /> Adicionar participantes
            </OptionText>
          </OptionContainer>
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
          <SectionTitle color={colors.red}>Zona de perigo</SectionTitle>
          <OptionContainer>
            <OptionText color={colors.red}>
              <Feather name="trash-2" size={25} /> Apagar grupo
            </OptionText>
          </OptionContainer>
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
