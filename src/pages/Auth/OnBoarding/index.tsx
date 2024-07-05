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

import { usePersistedState } from "@hooks/usePersistedState";
import { useTranslate } from "@hooks/useTranslate";

const OnBoarding: React.FC = () => {
  const [hasBoarded, setHasBoarded] = usePersistedState<boolean>(
    "@SaturnChat:hasBoarded",
    false
  );
  const { colors } = useTheme();

  const { t } = useTranslate("OnBoarding");
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
        <ActionButtonText>{t("done")}</ActionButtonText>
      </ActionButton>
    );
  };

  const SkipButton = () => {
    return (
      <ActionButton onPress={handleComplete}>
        <ActionButtonText>{t("skip")}</ActionButtonText>
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
              source={require("@assets/group-chatting.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>{t("pages.0.title")}</BoardTitle>,
          subtitle: <BoardSubTitle>{t("pages.0.subtitle")}</BoardSubTitle>,
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("@assets/message.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>{t("pages.1.title")}</BoardTitle>,
          subtitle: <BoardSubTitle>{t("pages.1.subtitle")}</BoardSubTitle>,
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("@assets/lock.json")}
              autoPlay
            />
          ),
          title: <BoardTitle>{t("pages.2.title")}</BoardTitle>,
          subtitle: <BoardSubTitle>{t("pages.2.subtitle")}</BoardSubTitle>,
        },
        {
          backgroundColor: colors.background,
          image: (
            <BoardImage
              source={require("@assets/star.json")}
              speed={0.75}
              autoPlay
            />
          ),
          title: <BoardTitle>{t("pages.3.title")}</BoardTitle>,
          subtitle: <BoardSubTitle>{t("pages.3.subtitle")}</BoardSubTitle>,
        },
      ]}
    />
  );
};

export default OnBoarding;
