import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import AppRoutes from "@routes/app.routes";
import {
  LinkingOptions,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import { useAuth } from "@contexts/auth";
import { useCallStatus } from "@contexts/callStatus";
import { AuthRoutes } from "@routes/auth.routes";
import { navigate, navigationRef } from "./rootNavigation";
import Loading from "@components/Loading";
import config from "@config";
import * as Linking from "expo-linking";

import analytics from "@react-native-firebase/analytics";
import { useTheme } from "styled-components";
import * as Notifications from "expo-notifications";
import CallFloatingButton from "@components/CallFloatingButton";
import Button from "@components/Button";
import { useTranslate } from "@hooks/useTranslate";
import fonts from "@styles/fonts";

const BIOMETRICS_KEY = "@SaturnChat:biometrics";
const BIOMETRICS_INTERVAL_KEY = "@SaturnChat:biometricsInterval";
const BIOMETRICS_LAST_AUTHENTICATED_KEY =
  "@SaturnChat:biometricsLastAuthenticated";

const Routes = () => {
  const { signed, loadingData } = useAuth();
  const { activeCallRoomId } = useCallStatus();
  const { title, colors } = useTheme();
  const { t } = useTranslate("Settings");
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [biometricsPreferenceLoaded, setBiometricsPreferenceLoaded] =
    useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authenticatingRef = useRef(false);

  const authenticate = useCallback(async () => {
    if (authenticatingRef.current) {
      return;
    }

    if (activeCallRoomId) {
      setIsUnlocked(true);
      return;
    }

    const [storedPreference, storedInterval, storedLastAuthenticated] =
      await AsyncStorage.multiGet([
        BIOMETRICS_KEY,
        BIOMETRICS_INTERVAL_KEY,
        BIOMETRICS_LAST_AUTHENTICATED_KEY,
      ]).then((entries) => entries.map(([, value]) => value));
    const enabled = storedPreference === "true";
    const intervalMinutes = Number(storedInterval || 0);
    const lastAuthenticated = Number(storedLastAuthenticated || 0);
    const intervalExpired =
      intervalMinutes === 0 ||
      !lastAuthenticated ||
      Date.now() - lastAuthenticated >= intervalMinutes * 60 * 1000;
    setBiometricsEnabled(enabled);
    setBiometricsPreferenceLoaded(true);

    if (!signed || !enabled || !intervalExpired) {
      setIsUnlocked(true);
      return;
    }

    authenticatingRef.current = true;
    setIsAuthenticating(true);
    setIsUnlocked(false);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: t("account.security.unlock_prompt"),
        cancelLabel: t("account.security.cancel"),
      });
      if (result.success) {
        await AsyncStorage.setItem(
          BIOMETRICS_LAST_AUTHENTICATED_KEY,
          String(Date.now()),
        );
      }
      setIsUnlocked(result.success);
    } finally {
      authenticatingRef.current = false;
      setIsAuthenticating(false);
    }
  }, [activeCallRoomId, signed, t]);

  useEffect(() => {
    if (!loadingData) {
      authenticate();
    }
  }, [authenticate, loadingData]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        authenticate();
      }
    });

    return () => subscription.remove();
  }, [activeCallRoomId, authenticate]);

  const linking: LinkingOptions<{}> = {
    prefixes: [config.WEBSITE_URL, "saturnchat://", Linking.createURL("/")],
    config: {
      screens: {
        Invite: "invite/:inviteID",
        [signed ? "Groups" : "OnBoarding"]: "*",
      },
      initialRouteName: (signed ? "Groups" : "OnBoarding") as never,
    },
  };

  const routeNameRef = useRef<string | undefined>("");

  useEffect(() => {
    const openCallFromNotification = (data: Record<string, unknown>) => {
      if (data?.roomId && data.roomId !== activeCallRoomId) {
        navigate("Call", { groupId: data.roomId as string });
      }
    };

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        openCallFromNotification(data);
      },
    );

    const response = Notifications.getLastNotificationResponse();

    if (response) {
      const data = response.notification.request.content.data;
      openCallFromNotification(data);
    }

    return () => {
      subscription.remove();
    };
  }, [activeCallRoomId]);

  if (loadingData) {
    return <Loading />;
  }

  if (signed && !activeCallRoomId && !biometricsPreferenceLoaded) {
    return <Loading />;
  }

  if (
    signed &&
    !activeCallRoomId &&
    biometricsEnabled &&
    !isUnlocked
  ) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          backgroundColor: colors.background,
        }}
      >
        <Text
          style={{
            marginBottom: 24,
            color: colors.black,
            fontSize: 20,
            textAlign: "center",
            fontFamily: fonts.text,
          }}
        >
          {isAuthenticating
            ? t("account.security.authenticating")
            : t("account.security.unlock_message")}
        </Text>
        {!isAuthenticating && (
          <Button
            title={t("account.security.unlock_button")}
            onPress={authenticate}
          />
        )}
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Loading />}
      theme={
        title === "dark"
          ? {
              ...DarkTheme,
              colors: { ...DarkTheme.colors, background: colors.background },
            }
          : undefined
      }
      onReady={() => {
        if (navigationRef.current) {
          routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
        }
      }}
      onStateChange={async () => {
        if (!navigationRef.current) {
          return;
        }
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logEvent("screen_view", { currentRouteName });
        }

        routeNameRef.current = currentRouteName;
      }}
      ref={navigationRef}
    >
      {!loadingData && <CallFloatingButton />}
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
