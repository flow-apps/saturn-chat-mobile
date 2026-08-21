import React, { useCallback, useEffect, useState } from "react";
import Routes from "@routes/index";
import { View, ActivityIndicator } from "react-native"; // Import ActivityIndicator
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { Image, StyleSheet } from "react-native";
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
import {} from "react-native-iap";
import { PremiumProvider } from "@contexts/premium";
import { LogLevel, OneSignal } from "react-native-onesignal";
import secrets from "./secrets.json";
import { useAuth } from "@contexts/auth";
import { useRemoteConfigs } from "@contexts/remoteConfigs";

import { isDevice } from "expo-device";
import * as Updates from "expo-updates";

preventAutoHideAsync();

const InitializerGate: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  const { loadingData: authLoading } = useAuth();
  const { loadingRemoteConfigs } = useRemoteConfigs();

  useEffect(() => {
    if (!authLoading && !loadingRemoteConfigs) {
      onReady();
    }
  }, [authLoading, loadingRemoteConfigs, onReady]);

  return null;
};

function App() {
  const [readyForStart, setReadyForStart] = useState(false);
  const [contextsAreReady, setContextsAreReady] = useState(false); // Novo estado para a prontidão dos contextos

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

  OneSignal.Debug.setLogLevel(__DEV__ ? LogLevel.Verbose : LogLevel.Error);
  OneSignal.initialize(secrets.OneSignalAppID);
  
  const configureExpoUpdates = async () => {
    try {
      if (!isDevice || __DEV__) {
        return;
      }

      const { isAvailable: hasNewUpdate } = await Updates.checkForUpdateAsync();

      if (hasNewUpdate) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(`Error fetching latest Expo update: ${error}`);
    } finally {
      setReadyForStart(true);
    }
  };

  useEffect(() => {
    configureExpoUpdates();
  }, []);

  useEffect(() => {
    if (fontLoaded && readyForStart && contextsAreReady) {
      hideAsync();
    }
  }, [fontLoaded, readyForStart, contextsAreReady]);

  if (!fontLoaded || !readyForStart) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={require("@assets/splash.jpg")}
          style={styles.splashImage}
          resizeMode="cover"
        />
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="#FF9D00"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
                              <InitializerGate
                                onReady={() => setContextsAreReady(true)}
                              />
                              {contextsAreReady ? (
                                <Routes />
                              ) : (
                                <View style={styles.splashContainer}>
                                  <Image
                                    source={require("@assets/splash.jpg")}
                                    style={styles.splashImage}
                                    resizeMode="cover"
                                  />
                                  <ActivityIndicator
                                    style={styles.activityIndicator}
                                    size="large"
                                    color="#FF9D00"
                                  />
                                </View>
                              )}
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
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
  activityIndicator: {
    position: "absolute",
    bottom: 100,
  },
});
