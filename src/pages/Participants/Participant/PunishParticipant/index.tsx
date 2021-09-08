import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { useTheme } from "styled-components";
import CheckBox from "../../../../components/Checkbox";
import {
  ButtonAction,
  Container,
  PunishAnimation,
  PunishAnimationWrapper,
  PunishContentContainer,
  PunishDescription,
  PunishTitle,
  PunishNotifyContainer,
  PunishNotifyInput,
  PunishLabel,
  ButtonText,
  ButtonsContainer
} from "./styles";

const PunishParticipant: React.FC = () => {

  const { colors } = useTheme()
  const navigation = useNavigation()
  const route = useRoute()
  const { type } = route.params as { [key: string]: any }
  const [notify, setNotify] = useState(false)

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleChangeNotify = () => {
    setNotify(old => !old)
  }

  return (
    <>
      <Container>
        <PunishContentContainer>
          <PunishTitle>Tem certeza disso?</PunishTitle>
          <PunishAnimationWrapper>
            <PunishAnimation
              source={require("../../../../assets/alert.json")}
              autoPlay
              loop={false}
            />
          </PunishAnimationWrapper>
          <PunishDescription>
            Você está prestes a {type === "kick" ? "expulsar" : "banir"} o participante "Fulano" do grupo "Game
            Santos". Você tem certeza da sua escolha?
          </PunishDescription>
          <PunishNotifyContainer>
            <PunishNotifyInput>
              <CheckBox checked={notify} onChange={handleChangeNotify} />
              <PunishLabel>
                Notificar participante da punição
              </PunishLabel>
            </PunishNotifyInput>
          </PunishNotifyContainer>
          <ButtonsContainer>
            <ButtonAction>
              <ButtonText>Sim, {type === "kick" ? "expulsar" : "banir"} agora!</ButtonText>
            </ButtonAction>
            <ButtonAction onPress={handleGoBack} color={colors.red}>
              <ButtonText>Não, mudei de ideia!</ButtonText>
            </ButtonAction>
          </ButtonsContainer>
        </PunishContentContainer>
      </Container>
    </>
  );
};

export default PunishParticipant;
