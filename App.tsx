import React from "react";
import Routes from "./src/routes";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";

import { AuthProvider } from "./src/contexts/auth";
import { ThemeControllerProvider } from "./src/contexts/theme";
import { NotificationsProvider } from "./src/contexts/notifications";
import { AdsProvider } from "./src/contexts/ads";
import { AudioPlayerProvider } from "./src/contexts/audioPlayer";
import { FirebaseProvider } from "./src/contexts/firebase";
import { RemoteConfigsProvider } from "./src/contexts/remoteConfigs";
import { WebsocketProvider } from "./src/contexts/websocket";

import { Roboto_500Medium, Roboto_900Black } from "@expo-google-fonts/roboto";
import { FiraCode_500Medium } from "@expo-google-fonts/fira-code";

import {
  RobotoMono_400Regular,
  RobotoMono_600SemiBold,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_300Light_Italic,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ChatProvider } from "./src/contexts/chat";

export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Roboto_500Medium,
    Roboto_900Black,
    RobotoMono_400Regular,
    RobotoMono_600SemiBold,
    RobotoMono_700Bold,
    FiraCode_500Medium,
  });

  if (!fontLoaded) {
    preventAutoHideAsync();
    return <></>;
  }

  hideAsync();

  return (
    <ThemeControllerProvider>
      <FirebaseProvider>
        <AuthProvider>
          <WebsocketProvider>
            <NotificationsProvider>
              <AdsProvider>
                <ChatProvider>
                  <AudioPlayerProvider>
                    <RemoteConfigsProvider>
                      <Routes />
                    </RemoteConfigsProvider>
                  </AudioPlayerProvider>
                </ChatProvider>
              </AdsProvider>
            </NotificationsProvider>
          </WebsocketProvider>
        </AuthProvider>
      </FirebaseProvider>
    </ThemeControllerProvider>
  );
}
