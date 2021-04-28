import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import Routes from "./src/routes";
import light from "./src/styles/themes/light";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={light}>
      <Routes />
    </ThemeProvider>
  );
}
