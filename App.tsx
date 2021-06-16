import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Roboto_500Medium } from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import React from "react";
import { AuthProvider } from "./src/contexts/auth";
import { ThemeControllerProvider } from "./src/contexts/theme";
import { AppearanceProvider } from "react-native-appearance";
import Routes from "./src/routes";
import { SocketProvider } from "./src/contexts/socket";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium,
    FiraCode_500Medium,
  });

  if (!fontLoaded) return <AppLoading />;

  return (
    <AppearanceProvider>
      <ThemeControllerProvider>
        <AuthProvider>
          <SocketProvider>
            <Routes />
          </SocketProvider>
        </AuthProvider>
      </ThemeControllerProvider>
    </AppearanceProvider>
  );
}
