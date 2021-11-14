import React, { useState, useEffect } from "react";
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
  ButtonsContainer,
} from "./styles";
import { ParticipantsData } from "../../../../../@types/interfaces";
import api from "../../../../services/api";
import Loading from "../../../../components/Loading";

const PunishParticipant: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { type, id } = route.params as { [key: string]: any };
  const [notify, setNotify] = useState(false);
  const [participant, setParticipant] = useState<ParticipantsData>();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const participantRes = await api.get(`/group/participant/${id}`);
      if (participantRes.status === 200) {
        const part = participantRes.data.participant as ParticipantsData;
        setParticipant(part);
      }
      setLoading(false)
    })();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeNotify = () => {
    setNotify((old) => !old);
  };

  if (loading) return <Loading />

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
            Você está prestes a {type === "kick" ? "expulsar" : "banir"} o
            participante "{participant?.user.name}" do grupo "Game Santos". Você
            tem certeza da sua escolha?
          </PunishDescription>
          <PunishNotifyContainer>
            <PunishNotifyInput>
              <CheckBox checked={notify} onChange={handleChangeNotify} />
              <PunishLabel>Notificar participante da punição</PunishLabel>
            </PunishNotifyInput>
          </PunishNotifyContainer>
          <ButtonsContainer>
            <ButtonAction>
              <ButtonText>
                Sim, {type === "kick" ? "expulsar" : "banir"} agora!
              </ButtonText>
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
