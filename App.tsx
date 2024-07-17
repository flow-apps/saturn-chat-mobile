import React, { useEffect, useState } from "react";
import Routes from "@routes/index";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";

import { AuthProvider } from "@contexts/auth";
import { ThemeControllerProvider } from "@contexts/theme";
import { NotificationsProvider } from "@contexts/notifications";
import { AdsProvider } from "@contexts/ads";
import { AudioPlayerProvider } from "@contexts/audioPlayer";
import { FirebaseProvider } from "@contexts/firebase";
import { RemoteConfigsProvider } from "@contexts/remoteConfigs";
import { WebsocketProvider } from "@contexts/websocket";

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

import { ChatProvider } from "@contexts/chat";
import {
  reloadAsync,
  fetchUpdateAsync,
  checkForUpdateAsync,
  isEnabled
} from "expo-updates";

import * as Constants from "expo-constants";
import { HomeProvider } from "@contexts/home";
import { PurchasesProvider } from "@contexts/purchases";
import { withIAPContext } from "react-native-iap";
import { PremiumProvider } from "@contexts/premium";

preventAutoHideAsync();

function App() {
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
      if (__DEV__ || Constants.default.debugMode || !isEnabled) {
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
          <PurchasesProvider>
            <PremiumProvider>
              <WebsocketProvider>
                <NotificationsProvider>
                  <AdsProvider>
                    <ChatProvider>
                      <AudioPlayerProvider>
                        <RemoteConfigsProvider>
                          <HomeProvider>
                            <Routes />
                          </HomeProvider>
                        </RemoteConfigsProvider>
                      </AudioPlayerProvider>
                    </ChatProvider>
                  </AdsProvider>
                </NotificationsProvider>
              </WebsocketProvider>
            </PremiumProvider>
          </PurchasesProvider>
        </AuthProvider>
      </FirebaseProvider>
    </ThemeControllerProvider>
  );
}

export default withIAPContext(App);
