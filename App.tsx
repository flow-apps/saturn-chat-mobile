import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import AppLoading from "expo-app-loading";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";
import light from "./src/styles/themes/light";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium,
    FiraCode_500Medium,
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={light}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
