import React, { useEffect } from "react";
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
import { useNavigation } from "@react-navigation/core";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme } from "styled-components";
import { useRoute } from "@react-navigation/native";
import { useCallStatus } from "@contexts/callStatus";

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
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const { activeCallRoomId } = useCallStatus();
  const { colors } = useTheme();
  const hasFloatingCall = Boolean(activeCallRoomId) && route.name !== "Call";

  const handleBack = async () => {
    if (!navigation.canGoBack()) return;

    navigation.goBack();
  };

  return (
    <Container bgColor={bgColor} $useSafeArea={!hasFloatingCall}>
      <StatusBar style="light" />
      <HeaderContainer>
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
