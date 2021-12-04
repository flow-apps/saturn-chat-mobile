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
  ButtonsContainer,
} from "./styles";
import api from "../../../../services/api";
import Loading from "../../../../components/Loading";
import SimpleToast from "react-native-simple-toast";

const PunishParticipant: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();
  const { type, participant } = route.params as {
    [key: string]: any;
  };
  const [notify, setNotify] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeNotify = () => {
    setNotify((old) => !old);
  };

  const handlePunish = async () => {
    setLoading(true)
    await api
      .get(
        `/group/participant/${type}/${participant?.id}?group_id=${participant?.group.id}`
      )
      .then((res) => {
        if (res.status === 204) {
          SimpleToast.show("Usuário punido com sucesso!");
          navigation.navigate("Chat", { id: participant?.group.id });
        }
      })
      .catch(() => {
        SimpleToast.show("Erro ao punir usuário. Tente novamente.");
      });

    setLoading(false)
  };

  if (loading) return <Loading />;

  return (
    <>
      <Container>
        <PunishContentContainer>
          <PunishTitle>Tem certeza disso?</PunishTitle>
          <PunishAnimationWrapper>
            <PunishAnimation
              source={require("../../../../assets/alert.json")}
              loop={false}
              autoPlay
            />
          </PunishAnimationWrapper>
          <PunishDescription>
            Você está prestes a {type === "kick" ? "expulsar" : "banir"} o
            participante "{participant?.user.name}" do grupo "{participant?.group.name}". Você
            tem certeza da sua escolha?
          </PunishDescription>
          <PunishNotifyContainer>
            <PunishNotifyInput>
              <CheckBox checked={notify} onChange={handleChangeNotify} />
              <PunishLabel>Notificar participante da punição</PunishLabel>
            </PunishNotifyInput>
          </PunishNotifyContainer>
          <ButtonsContainer>
            <ButtonAction onPress={handlePunish}>
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
