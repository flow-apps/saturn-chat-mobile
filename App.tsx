import React, { useEffect, useState } from "react";
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

import { useFonts } from "expo-font";

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
} from "@expo-google-fonts/poppins";

import { ChatProvider } from "./src/contexts/chat";
import {
  reloadAsync,
  fetchUpdateAsync,
  checkForUpdateAsync,
} from "expo-updates";

import * as Constants from "expo-constants";

preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);
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

  useEffect(() => {
    (async () => {
      if (__DEV__ || Constants.default.debugMode) {
        setReady(true);
        return;
      }

      const { isAvailable } = await checkForUpdateAsync()
        .then((result) => result)
        .catch(() => {
          return { isAvailable: false };
        });

      if (isAvailable) {
        await fetchUpdateAsync().then(async (value) => {
          if (value.isNew) {
            await reloadAsync();
            return;
          } else {
            setReady(true);
          }
        });
      } else {
        setReady(true);
      }
    })();
  }, []);

  if (!fontLoaded || !ready) {
    return null;
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
