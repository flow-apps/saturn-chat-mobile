import React from "react";
import {
  Container,
  HeaderTitle,
  RightContainer,
  Button,
  LeftContainer,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  homeButtons?: boolean;
}

const Header = ({ title, backButton, homeButtons }: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} style="inverted" />
      <RightContainer>
        {backButton && (
          <Button onPress={handleBack}>
            <Feather name="arrow-left" size={25} color={colors.white} />
          </Button>
        )}
        <HeaderTitle>{title}</HeaderTitle>
      </RightContainer>
      <LeftContainer>
        {homeButtons && (
          <>
            <Button>
              <Feather name="search" size={25} color={colors.white} />
            </Button>
            <Button>
              <Feather name="user" size={25} color={colors.white} />
            </Button>
          </>
        )}
      </LeftContainer>
    </Container>
  );
};

export default Header;
