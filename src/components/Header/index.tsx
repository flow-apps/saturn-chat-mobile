import React, { memo } from "react";
import {
  Container,
  HeaderTitle,
  RightContainer,
  Button,
  LeftContainer,
} from "./styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  homeButtons?: boolean;
  groupButtons?: boolean;
}

const Header = ({
  title,
  backButton,
  homeButtons,
  groupButtons,
}: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function handleGoMyProfile() {
    navigation.navigate("MyProfile");
  }

  function handleGoGroupConfig() {
    navigation.navigate("GroupConfig");
  }

  function handleGoSearch() {
    navigation.navigate("Search");
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
        <HeaderTitle numberOfLines={1}>{title}</HeaderTitle>
      </RightContainer>
      <LeftContainer>
        {homeButtons && (
          <>
            <Button onPress={handleGoSearch}>
              <Feather name="search" size={25} color={colors.white} />
            </Button>
            <Button>
              <Feather
                name="user"
                size={25}
                color={colors.white}
                onPress={handleGoMyProfile}
              />
            </Button>
          </>
        )}
        {groupButtons && (
          <Button>
            <Feather
              name="more-vertical"
              size={25}
              color={colors.white}
              onPress={handleGoGroupConfig}
            />
          </Button>
        )}
      </LeftContainer>
    </Container>
  );
};

export default Header;
