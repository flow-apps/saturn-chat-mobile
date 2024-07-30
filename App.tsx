import React, { useEffect } from "react";
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

import { HomeProvider } from "@contexts/home";
import { PurchasesProvider } from "@contexts/purchases";
import { withIAPContext } from "react-native-iap";
import { PremiumProvider } from "@contexts/premium";
import { LogLevel, OneSignal } from "react-native-onesignal";
import secrets from "./secrets.json";

import { isDevice } from "expo-device";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

preventAutoHideAsync();

function App() {
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

  OneSignal.Debug.setLogLevel(__DEV__ ? LogLevel.Verbose : LogLevel.None);
  OneSignal.initialize(secrets.OneSignalAppID);

  const configureExpoUpdates = async () => {
    try {
      if (!isDevice || __DEV__) {
        return;
      }

      const { isAvailable: hasNewUpdate } = await Updates.checkForUpdateAsync();

      if (hasNewUpdate) {
        await Updates.fetchUpdateAsync().then(() => {
          Alert.alert("Nova atualização baixada");
        });
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      Alert.alert(`Error fetching latest Expo update: ${error}`);
    }
  };

  useEffect(() => {
    configureExpoUpdates();
  }, []);

  if (!fontLoaded) {
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
