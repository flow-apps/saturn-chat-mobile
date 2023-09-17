import React from "react";
import Boarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { useTheme } from "styled-components";
import {
  ActionButton,
  ActionButtonText,
  BoardImage,
  BoardSubTitle,
  BoardTitle,
} from "./styles";

import { usePersistedState } from "../../../hooks/usePersistedState";

const OnBoarding: React.FC = () => {
  const [hasBoarded, setHasBoarded] = usePersistedState<boolean>(
    "@SaturnChat:hasBoarded",
    false
  );
  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    if (hasBoarded) {
      navigation.navigate("Home");
    }
  }, [hasBoarded]);

  const handleComplete = async () => {
    setHasBoarded(true);
    navigation.navigate("Home");
  };

  const DoneButton = () => {
    return (
      <ActionButton onPress={handleComplete}>
        <ActionButtonText>Começar</ActionButtonText>
      </ActionButton>
    );
  };

  const SkipButton = () => {
    return (
      <ActionButton onPress={handleComplete}>
        <ActionButtonText>Pular</ActionButtonText>
      </ActionButton>
    );
  };

  return (
    <Boarding
      onDone={handleComplete}
      onSkip={handleComplete}
      DoneButtonComponent={DoneButton}
      SkipButtonComponent={SkipButton}
      bottomBarColor={colors.shape}
      nextLabel=">>"
      controlStatusBar={false}
      imageContainerStyles={{ marginBottom: -30 }}
      containerStyles={{
        padding: 12,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
      pages={[
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("../../../assets/group-chatting.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>Bem-vindo ao Saturn Chat!</BoardTitle>,
          subtitle: (
            <BoardSubTitle>
              Aqui você encontrará uma enorme variedade de grupos (ou criar um
              do seu próprio jeito que quiser).
            </BoardSubTitle>
          ),
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("../../../assets/message.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>Envie mensagens com facilidade!</BoardTitle>,
          subtitle: (
            <BoardSubTitle>
              Com poucos cliques você já consegue enviar e receber mensagens com
              fotos, vídeos e até mensagens de voz.
            </BoardSubTitle>
          ),
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("../../../assets/lock.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>Você está seguro!</BoardTitle>,
          subtitle: (
            <BoardSubTitle>
              Aqui sua privacidade está preservada, seus dados não serão
              vendidos a ninguém!
            </BoardSubTitle>
          ),
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("../../../assets/star.json")}
              speed={0.75}
              autoPlay
            />
          ),
          title: <BoardTitle>Seja uma Star!</BoardTitle>,
          subtitle: (
            <BoardSubTitle>
              Quando estiver pronto, vá ao menu de configurações e obtenha o
              plano Star e aproveite ao máximo o Saturn Chat!
            </BoardSubTitle>
          ),
        },
      ]}
    />
  );
};

export default OnBoarding;
