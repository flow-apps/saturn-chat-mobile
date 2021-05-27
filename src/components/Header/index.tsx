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
            <FontAwesome
              name="cog"
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
