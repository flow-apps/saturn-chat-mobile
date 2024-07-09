import React, { useCallback, useMemo, useState } from "react";
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
import Header from "@components/Header";
import { useAuth } from "@contexts/auth";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Switcher from "@components/Switcher";
import { useThemeController } from "@contexts/theme";
import Button from "@components/Button";
import { useTheme } from "styled-components";
import Alert from "@components/Alert";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as Localize from "expo-localization";
import Banner from "@components/Ads/Banner";
import config from "../../config";
import { useNotifications } from "@contexts/notifications";
import { LinkUtils } from "@utils/link";
import { useTranslate } from "@hooks/useTranslate";
import { usePurchases } from "@contexts/purchases";
import { usePremium } from "@contexts/premium";

const Configurations: React.FC = () => {
  const [confirmSignOut, setConfirmSignOut] = useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { signOut } = useAuth();
  const { toggleTheme, currentThemeName } = useThemeController();
  const { toggleEnabledNotifications, enabled } = useNotifications();
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const { t } = useTranslate("Settings");
  const { userSubscription, handleGetUserSubscription } = usePurchases();
  const { isPremium } = usePremium();

  const showManageSub = useMemo(() => {
    if (isPremium) {
      return true;
    }

    return false;
  }, [isPremium]);

  const handleSignOut = useCallback(() => {
    setConfirmSignOut(true);
  }, []);

  const handleGoPurchasePremium = useCallback(() => {
    if (showManageSub) {
      return navigation.navigate("ManagePremium");
    }

    return navigation.navigate("PurchasePremium");
  }, [showManageSub]);

  const handleGoEditProfile = useCallback(() => {
    navigation.navigate("EditProfile");
  }, []);

  const handleGoSwitchLanguage = useCallback(() => {
    navigation.navigate("SwitchLanguage");
  }, []);

  const handleGoSwitchPassword = useCallback(() => {
    navigation.navigate("SwitchPassword");
  }, []);

  const handleGoPrivacyPolicie = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/privacy`);
  };

  const handleGoGuidelines = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/guidelines`);
  };

  return (
    <>
      <Header title={t("header_title")} backButton={false} />
      <Container>
        <Alert
          visible={confirmSignOut}
          title={t("alerts.sign_out.title")}
          content={t("alerts.sign_out.subtitle")}
          cancelButtonText={t("alerts.sign_out.cancel_text")}
          okButtonText={t("alerts.sign_out.ok_text")}
          cancelButtonAction={() => setConfirmSignOut(false)}
          okButtonAction={signOut}
        />
        <SectionsContainer>
          <Banner />
          <SectionContainer>
            <SectionTitle>{t("general.title")}</SectionTitle>
            <ConfigsContainer>
              <ConfigContainer onPress={handleGoPurchasePremium}>
                <ConfigTitle color={colors.secondary}>
                  <Feather name="star" size={16} />{" "}
                  {t(showManageSub ? "general.manage_star" : "general.star")}
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoEditProfile}>
                <ConfigTitle>
                  <Feather name="edit" size={16} /> {t("general.edit_profile")}
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoSwitchLanguage}>
                <ConfigTitle>
                  <MaterialCommunityIcons name="translate" size={17} />{" "}
                  {t("general.languages")}
                </ConfigTitle>
                <CurrentValueText>{Localize.locale}</CurrentValueText>
              </ConfigContainer>
              <ConfigContainer>
                <ConfigTitle>
                  <Feather
                    name={currentThemeName === "dark" ? "moon" : "sun"}
                    size={16}
                  />{" "}
                  {t("general.dark_theme")}
                </ConfigTitle>
                <Switcher
                  currentValue={currentThemeName === "dark"}
                  onChangeValue={toggleTheme}
                />
              </ConfigContainer>
              <ConfigContainer>
                <ConfigTitle>
                  <Feather name={enabled ? "bell" : "bell-off"} size={16} />{" "}
                  {t("general.notifications")}
                </ConfigTitle>
                <Switcher
                  currentValue={enabled}
                  onChangeValue={toggleEnabledNotifications}
                />
              </ConfigContainer>
            </ConfigsContainer>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t("account.title")}</SectionTitle>
            <ConfigsContainer>
              <ConfigContainer onPress={handleGoSwitchPassword}>
                <ConfigTitle>
                  <Feather name="lock" size={16} /> {t("account.edit_password")}
                </ConfigTitle>
              </ConfigContainer>
            </ConfigsContainer>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>{t("about.title")}</SectionTitle>
            <ConfigsContainer>
              <ConfigContainer onPress={handleGoPrivacyPolicie}>
                <ConfigTitle>
                  <Feather name="lock" size={16} /> {t("about.privacy_policy")}
                </ConfigTitle>
              </ConfigContainer>
              <ConfigContainer onPress={handleGoGuidelines}>
                <ConfigTitle>
                  <Feather name="info" size={16} /> {t("about.guidelines")}
                </ConfigTitle>
              </ConfigContainer>
            </ConfigsContainer>
          </SectionContainer>

          <Button
            title={t("sign_out")}
            bgColor={colors.red}
            onPress={handleSignOut}
          />
        </SectionsContainer>
      </Container>
    </>
  );
};

export default Configurations;
