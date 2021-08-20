import React from "react";
import {
  Container,
  HeaderTitle,
  RightContainer,
  HeaderButton,
  LeftContainer,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";

interface HeaderProps {
  title: string;
  onPressTitle?: () => unknown;
  backButton?: boolean;
  children?: JSX.Element[] | JSX.Element
}

const Header = ({ title, backButton, onPressTitle, children }: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor={colors.primary} style="light" />
      <RightContainer>
        {backButton && (
          <HeaderButton onPress={handleBack}>
            <Feather name="arrow-left" size={25} color={"#fff"} />
          </HeaderButton>
        )}
        <HeaderTitle numberOfLines={1} onPress={onPressTitle}>
          {title}
        </HeaderTitle>
      </RightContainer>
      <LeftContainer>{children}</LeftContainer>
    </Container>
  );
};

export default Header;
