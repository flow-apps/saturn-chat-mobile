import React from "react";
import Header from "../../../components/Header";
import {
  Container,
  OptionInputWrapper,
  OptionName,
  OptionNameWrapper,
  ParticipantOptionContainer,
  ParticipantOptions,
  ParticipantOptionsContainer,
  ParticipantOptionsTitle,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";

const Participant: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  const handleGoChangeRole = async () => {
    navigation.navigate("ChangeRole")
  }

  const handleGoPunishParticipant = async (type: string) => {
    navigation.navigate("PunishParticipant", { type })
  }

  return (
    <>
      <Header title="Game Santos" backButton />
      <Container>
        <ParticipantOptionsContainer>
          <ParticipantOptionsTitle>
            Opções do participante
          </ParticipantOptionsTitle>
          <ParticipantOptions>
            <ParticipantOptionContainer>
              <OptionNameWrapper>
                <OptionName>
                  <Feather name="user" size={16} /> Ver perfil
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
            <ParticipantOptionContainer onPress={handleGoChangeRole}>
              <OptionNameWrapper>
                <OptionName color={colors.primary}>
                  <Feather name="user-plus" size={16} /> Alterar cargo
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
            <ParticipantOptionContainer onPress={() => handleGoPunishParticipant("kick")}>
              <OptionNameWrapper>
                <OptionName color={colors.red}>
                  <Feather name="user-x" size={16} /> Expulsar participante
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
            <ParticipantOptionContainer onPress={() => handleGoPunishParticipant("ban")}>
              <OptionNameWrapper>
                <OptionName color={colors.red}>
                  <Feather name="slash" size={16} /> Banir participante
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
          </ParticipantOptions>
        </ParticipantOptionsContainer>
      </Container>
    </>
  );
};

export default Participant;
