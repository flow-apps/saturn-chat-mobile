import React from "react";
import {
  Container,
  HeaderTitle,
  RightContainer,
  HeaderButton,
  LeftContainer,
  HeaderTitleContainer,
  HeaderContainer,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAds } from "@contexts/ads";
import { usePremium } from "@contexts/premium";
import { useAuth } from "@contexts/auth";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  bgColor?: string;
  children?: React.ReactNode | React.ReactNode[];
  onPressTitle?: () => unknown;
}

const Header = ({
  title,
  backButton = true,
  onPressTitle,
  bgColor,
  children,
}: HeaderProps) => {
  const { colors } = useTheme();
  const { Interstitial } = useAds();
  const { isPremium } = usePremium();
  const { signed } = useAuth()

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleBack = async () => {
    if (!navigation.canGoBack()) return;

    if (Interstitial.loaded && !isPremium && signed) {
      Interstitial.show().then(() => {
        navigation.goBack();
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container bgColor={bgColor}>
      <HeaderContainer>
        <StatusBar
          backgroundColor={colors.primary}
          translucent={bgColor === "transparent"}
          style="light"
        />
        <RightContainer>
          {backButton && (
            <HeaderButton onPress={handleBack}>
              <Feather name="arrow-left" size={25} color={"#fff"} />
            </HeaderButton>
          )}
          <HeaderTitleContainer>
            <HeaderTitle
              numberOfLines={1}
              ellipsizeMode="middle"
              onPress={onPressTitle}
              goBack={backButton}
            >
              {title}
            </HeaderTitle>
          </HeaderTitleContainer>
        </RightContainer>
        <LeftContainer>{children}</LeftContainer>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
