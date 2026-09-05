import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
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
import { usePremium } from "@contexts/premium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setApiBaseURL } from "@services/api";
import { usePersistedState } from "@hooks/usePersistedState";
import * as LocalAuthentication from "expo-local-authentication";
import Constants from "expo-constants";
import * as Application from "expo-application";

const API_PREFERENCE_KEY = "@SaturnChat:useDevApi";
const BIOMETRICS_INTERVAL_KEY = "@SaturnChat:biometricsInterval";
const BIOMETRICS_INTERVALS = [0, 5, 15, 30, 60];

const Settings: React.FC = () => {
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [localAuthAlertVisible, setLocalAuthAlertVisible] = useState(false);
  const [intervalAlertVisible, setIntervalAlertVisible] = useState(false);
  const [useDevApi, setUseDevApi] = useState(false);
  const [useBiometrics, setUseBiometrics] = usePersistedState<boolean>(
    "@SaturnChat:biometrics",
    false,
  );
  const [biometricsInterval, setBiometricsInterval] = usePersistedState<number>(
    BIOMETRICS_INTERVAL_KEY,
    0,
  );

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { signOut } = useAuth();
  const { toggleTheme, currentThemeName } = useThemeController();
  const { toggleEnabledNotifications, enabled } = useNotifications();
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const { t } = useTranslate("Settings");
  const { isPremium } = usePremium();

  const showManageSub = useMemo(() => {
    if (isPremium) {
      return true;
    }

    return false;
  }, [isPremium]);

  // Informações de versão de app, build nativa e perfil EAS
  const appVersion =
    Application.nativeApplicationVersion ||
    Constants.expoConfig?.version ||
    "1.0.0";
  const nativeBuildVersion = Application.nativeBuildVersion;
  const buildProfile = Constants.expoConfig?.extra?.eas?.buildProfile;
  const isBeta = buildProfile === "preview" || __DEV__;

  useEffect(() => {
    const loadApiPreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(API_PREFERENCE_KEY);
        if (storedPreference !== null) {
          setUseDevApi(JSON.parse(storedPreference));
        }
      } catch (error) {
        console.error("Failed to load API preference from AsyncStorage", error);
      }
    };
    loadApiPreference();
  }, []);

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

  const handleGoSendFeedback = useCallback(() => {
    navigation.navigate("SendFeedback");
  }, []);

  const handleGoPrivacyPolicie = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/privacy`);
  };

  const handleGoGuidelines = async () => {
    await linkUtils.openLink(`${config.WEBSITE_URL}/guidelines`);
  };

  const handleToggleDevApi = async (value: boolean) => {
    setUseDevApi(value);
    await setApiBaseURL(value);
  };

  const handleSetBiometrics = async (value: boolean) => {
    if (!value) {
      setUseBiometrics(false);
      return;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      setLocalAuthAlertVisible(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirme para ativar o bloqueio",
      cancelLabel: "Cancelar",
    });

    if (result.success) {
      setUseBiometrics(true);
    }
  };

  const handleSelectBiometricsInterval = () => {
    setIntervalAlertVisible(true);
  };

  const selectedBiometricsInterval = BIOMETRICS_INTERVALS.find(
    (minutes) => minutes === biometricsInterval,
  );

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
        <Alert
          visible={localAuthAlertVisible}
          title={t("account.security.unavailable_title")}
          content={t("account.security.unavailable_content")}
          extraButton={false}
          okButtonText="OK"
          okButtonAction={() => setLocalAuthAlertVisible(false)}
        />
        <Alert
          visible={intervalAlertVisible}
          title={t("account.security.interval_title")}
          content={t("account.security.interval_content")}
          extraButton={false}
          options={BIOMETRICS_INTERVALS.map((minutes) => ({
            text: t(`account.security.intervals.${minutes}`),
            action: () => {
              setBiometricsInterval(minutes);
              setIntervalAlertVisible(false);
            },
          }))}
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
                <CurrentValueText>
                  {Localize.getLocales()[0].languageCode +
                    `-${Localize.getLocales()[0].languageRegionCode}`}
                </CurrentValueText>
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
              <ConfigContainer>
                <ConfigTitle>
                  <MaterialCommunityIcons name="fingerprint" size={16} />{" "}
                  {t("account.security.require_on_open")}
                </ConfigTitle>
                <Switcher
                  currentValue={useBiometrics}
                  onChangeValue={handleSetBiometrics}
                />
              </ConfigContainer>
              {useBiometrics && (
                <ConfigContainer onPress={handleSelectBiometricsInterval}>
                  <ConfigTitle>
                    <MaterialCommunityIcons name="timer-outline" size={16} />{" "}
                    {t("account.security.interval")}
                  </ConfigTitle>
                  <CurrentValueText>
                    {t(
                      `account.security.intervals.${selectedBiometricsInterval || 0}`,
                    )}
                  </CurrentValueText>
                </ConfigContainer>
              )}
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
              <ConfigContainer onPress={handleGoSendFeedback}>
                <ConfigTitle>
                  <Feather name="message-circle" size={16} />{" "}
                  {t("about.feedback")}
                </ConfigTitle>
              </ConfigContainer>
            </ConfigsContainer>
          </SectionContainer>

          {__DEV__ && (
            <SectionContainer>
              <SectionTitle>{t("about.developer_options")}</SectionTitle>
              <ConfigsContainer>
                <ConfigContainer>
                  <ConfigTitle>
                    <Feather name="code" size={16} /> {t("about.use_dev_api")}
                  </ConfigTitle>
                  <Switcher
                    currentValue={useDevApi}
                    onChangeValue={handleToggleDevApi}
                  />
                </ConfigContainer>
              </ConfigsContainer>
            </SectionContainer>
          )}

          <Button
            title={t("sign_out")}
            bgColor={colors.red}
            onPress={handleSignOut}
          />

          <View
            style={{ marginTop: 24, marginBottom: 16, alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 10,
                color: colors.dark_heading || "#888",
                textAlign: "center",
              }}
            >
              Saturn Chat v{appVersion}
              {nativeBuildVersion ? ` (${nativeBuildVersion})` : ""}
              {isBeta ? "\n (Beta)" : ""}
            </Text>
          </View>
        </SectionsContainer>
      </Container>
    </>
  );
};

export default Settings;
