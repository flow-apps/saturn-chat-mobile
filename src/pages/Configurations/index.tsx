import React, { useCallback, useState } from "react";
import {
  ConfigContainer,
  ConfigsContainer,
  ConfigTitle,
  Container,
  CurrentValueText,
  SectionContainer,
  SectionsContainer,
  SectionTitle,
} from "./styles";
import Header from "../../components/Header";
import { useAuth } from "../../contexts/auth";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Switcher from "../../components/Switcher";
import { useThemeController } from "../../contexts/theme";
import Button from "../../components/Button";
import { useTheme } from "styled-components";
import Alert from "../../components/Alert";
import { useNavigation } from "@react-navigation/native";

import * as Localize from "expo-localization"
import Banner from "../../components/Ads/Banner";
import { Linking } from "react-native";
import config from "../../config";
import { useNotifications } from "../../contexts/notifications";
import { LinkUtils } from "../../utils/link";

const Configurations: React.FC = () => {
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { toggleTheme, currentThemeName } = useThemeController();
  const { toggleEnabledNotifications, enabled } = useNotifications()
  const { colors } = useTheme();
  const linkUtils = new LinkUtils()

  const handleSignOut = useCallback(() => {
    setConfirmSignOut(true);
  }, []);

  const handleGoPurchasePremium = useCallback(() => {
    navigation.navigate("PurchasePremium");
  }, []);

  const handleGoEditProfile = useCallback(() => {
    navigation.navigate("EditProfile");
  }, []);

  const handleGoSwitchLanguage = useCallback(() => {
    navigation.navigate("SwitchLanguage");
  }, []);

  const handleGoPrivacyPolicie = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/privacy`)
  }

  const handleGoGuidelines = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/guidelines`)
  }

  return (
    <>
      <Header title="Configurações" />
      <Container>
        <Alert
          visible={confirmSignOut}
          title="😥 Quer mesmo sair?"
          content="Ao sair você não receberá notificações de novas mensagens, convites e nada relacionado."
          cancelButtonText="Cancelar"
          okButtonText="Sair"
          cancelButtonAction={() => setConfirmSignOut(false)}
          okButtonAction={signOut}
        />
        <SectionsContainer>
          <SectionContainer>
            <SectionTitle>Geral</SectionTitle>
            <ConfigsContainer>
              <ConfigContainer onPress={handleGoPurchasePremium}>
                <ConfigTitle 
                  color={colors.secondary}
                >
                  <Feather name="star" size={16} /> Seja uma Estrela
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoEditProfile}>
                <ConfigTitle>
                  <Feather name="edit" size={16} /> Editar perfil
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoSwitchLanguage}>
                <ConfigTitle>
                  <MaterialCommunityIcons name="translate" size={17} /> Idiomas
                </ConfigTitle>
                <CurrentValueText>{ Localize.locale }</CurrentValueText>
              </ConfigContainer>
              <ConfigContainer>
                <ConfigTitle>
                  <Feather name={currentThemeName === "dark" ? "moon" : "sun"} size={16} /> Modo Escuro
                </ConfigTitle>
                <Switcher
                  currentValue={currentThemeName === "dark"}
                  onChangeValue={toggleTheme}
                />
              </ConfigContainer>
              <ConfigContainer>
                <ConfigTitle>
                  <Feather name={enabled ? "bell" : "bell-off"} size={16} /> Notificações
                </ConfigTitle>
                <Switcher
                  currentValue={enabled}
                  onChangeValue={toggleEnabledNotifications}
                />
              </ConfigContainer>
              <ConfigContainer onPress={handleGoPrivacyPolicie}>
                <ConfigTitle>
                  <Feather name="lock" size={16} /> Politicas de Privacidade
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoGuidelines}>
                <ConfigTitle>
                  <Feather name="info" size={16} /> Diretrizes da Comunidade
                </ConfigTitle>
              </ConfigContainer>
              <Button
                title="Sair da conta"
                bgColor={colors.red}
                onPress={handleSignOut}
              />
            </ConfigsContainer>
          </SectionContainer>
        </SectionsContainer>
        <Banner />
      </Container>
    </>
  );
};

export default Configurations;
