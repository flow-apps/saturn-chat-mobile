import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import AppLoading from "expo-app-loading";
import React, { useCallback, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import light from "./src/styles/themes/light";
import dark from "./src/styles/themes/dark";

import { ToggleThemeProvider, useToggleTheme } from "./src/contexts/theme";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium,
    FiraCode_500Medium,
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <ToggleThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ToggleThemeProvider>
  );
}
