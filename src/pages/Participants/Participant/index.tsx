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
import Switcher from "../../../components/Switcher";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";

const Participant: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  const handleGoChangeRole = async () => {
    navigation.navigate("ChangeRole")
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
            <ParticipantOptionContainer>
              <OptionNameWrapper>
                <OptionName color={colors.red}>
                  <Feather name="user-x" size={16} /> Expulsar participante
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
