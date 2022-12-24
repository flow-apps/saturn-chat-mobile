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
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";

interface HeaderProps {
  title: string;
  backButton?: boolean;
  bgColor?: string;
  children?: React.ReactNode[];
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
  const navigation = useNavigation<StackNavigationProp<any>>();

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

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
