import React, { useState } from "react";
import Boarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useTheme } from "styled-components";
import { StorageService } from "../../../services/Storage";
import {
  ActionButton,
  ActionButtonText,
  BoardImage,
  BoardSubTitle,
  BoardTitle,
} from "./styles";

import AppLoading from "expo-app-loading";

const OnBoarding: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const storage = new StorageService();
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      storage.getItem("@SaturnChat:onBoard").then((boarded) => {
        if (!boarded) return;

        const hasBoarded = JSON.parse(boarded);
        if (hasBoarded.hasOnBoarded) {
          navigation.navigate("Home");
        }
      });
    })();
    setLoading(false);
  }, []);

  const handleComplete = async () => {
    await storage.saveItem(
      "@SaturnChat:onBoard",
      JSON.stringify({
        hasOnBoarded: true,
      })
    );

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

  if (loading) return <AppLoading />;

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
              do seu próprio do jeito que quiser quiser).
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
              Como poucos cliques você já consegue enviar e receber mensagens
              com fotos, vídeos e até mensagens de voz.
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
          title: <BoardTitle>Seja uma estrela!</BoardTitle>,
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
