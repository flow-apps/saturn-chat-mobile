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
import { useRoute } from "@react-navigation/native";
import { ParticipantsData } from "../../../../@types/interfaces";
import { ParticipantRoles } from "../../../../@types/enums";

const Participant: React.FC = () => {
  const { colors } = useTheme();
  const { participant } = useRoute().params as {
    [key: string]: ParticipantsData;
  };
  const navigation = useNavigation();

  const authorizedForPunish = [
    ParticipantRoles.ADMIN,
    ParticipantRoles.MODERATOR,
    ParticipantRoles.OWNER,
  ];

  const authorizedForManageRoles = [
    ParticipantRoles.OWNER,
    ParticipantRoles.ADMIN,
    ParticipantRoles.MANAGER,
  ];

  const handleGoChangeRole = async () => {
    navigation.navigate("ChangeRole", { participant, id: participant.id });
  };

  const handleGoPunishParticipant = async (type: string) => {
    navigation.navigate("PunishParticipant", { type, id: participant.id });
  };

  const handleGoUserProfile = () => {
    navigation.navigate("UserProfile", { id: participant.user.id });
  };

  return (
    <>
      <Header title={participant.user.name} backButton />
      <Container>
        <ParticipantOptionsContainer>
          <ParticipantOptionsTitle>
            Opções do participante
          </ParticipantOptionsTitle>
          <ParticipantOptions>
            <ParticipantOptionContainer onPress={handleGoUserProfile}>
              <OptionNameWrapper>
                <OptionName>
                  <Feather name="user" size={16} /> Ver perfil
                </OptionName>
              </OptionNameWrapper>
            </ParticipantOptionContainer>
            {authorizedForManageRoles.includes(participant.role) &&
              participant.role !== ParticipantRoles.OWNER && (
                <ParticipantOptionContainer onPress={handleGoChangeRole}>
                  <OptionNameWrapper>
                    <OptionName color={colors.primary}>
                      <Feather name="user-plus" size={16} /> Alterar cargo
                    </OptionName>
                  </OptionNameWrapper>
                </ParticipantOptionContainer>
              )}
            {authorizedForPunish.includes(participant.role) &&
              participant.role !== ParticipantRoles.OWNER && (
                <>
                  <ParticipantOptionContainer
                    onPress={() => handleGoPunishParticipant("kick")}
                  >
                    <OptionNameWrapper>
                      <OptionName color={colors.red}>
                        <Feather name="user-x" size={16} /> Expulsar
                        participante
                      </OptionName>
                    </OptionNameWrapper>
                  </ParticipantOptionContainer>
                  <ParticipantOptionContainer
                    onPress={() => handleGoPunishParticipant("ban")}
                  >
                    <OptionNameWrapper>
                      <OptionName color={colors.red}>
                        <Feather name="slash" size={16} /> Banir participante
                      </OptionName>
                    </OptionNameWrapper>
                  </ParticipantOptionContainer>
                </>
              )}
          </ParticipantOptions>
        </ParticipantOptionsContainer>
      </Container>
    </>
  );
};

export default Participant;
