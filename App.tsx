import React from "react";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";

import { AuthProvider } from "./src/contexts/auth";
import { ThemeControllerProvider } from "./src/contexts/theme";
import { AppearanceProvider } from "react-native-appearance";
import { NotificationsProvider } from "./src/contexts/notifications"
import { AdsProvider } from "./src/contexts/ads"

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import { Roboto_500Medium, Roboto_900Black } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium,
    Roboto_900Black,
    FiraCode_500Medium,
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <AppearanceProvider>
      <ThemeControllerProvider>
        <AuthProvider>
          <NotificationsProvider>
            <AdsProvider>
              <Routes />
            </AdsProvider>
          </NotificationsProvider>
        </AuthProvider>
      </ThemeControllerProvider>
    </AppearanceProvider>
  );
}
