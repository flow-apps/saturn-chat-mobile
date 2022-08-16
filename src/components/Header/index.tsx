import React from "react";
import {
  Container,
  HeaderTitle,
  RightContainer,
  HeaderButton,
  LeftContainer,
} from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";

interface HeaderProps {
  title: string;
  onPressTitle?: () => unknown;
  backButton?: boolean;
  bgColor?: string;
  children?: JSX.Element[] | JSX.Element;
}

const Header = ({
  title,
  backButton = true,
  onPressTitle,
  bgColor,
  children,
}: HeaderProps) => {
  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container bgColor={bgColor}>
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
        <HeaderTitle numberOfLines={1} onPress={onPressTitle}>
          {title}
        </HeaderTitle>
      </RightContainer>
      <LeftContainer>{children}</LeftContainer>
    </Container>
  );
};

export default Header;
