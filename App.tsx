import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as Updates from "expo-updates";
import { isDevice } from "expo-device";
import { LogLevel, OneSignal } from "react-native-onesignal";

import Routes from "@routes/index";
import secrets from "./secrets.json";

import { AuthProvider, useAuth } from "@contexts/auth";
import { ThemeControllerProvider } from "@contexts/theme";
import { NotificationsProvider } from "@contexts/notifications";
import { AdsProvider } from "@contexts/ads";
import { AudioPlayerProvider } from "@contexts/audioPlayer";
import { FirebaseProvider } from "@contexts/firebase";
import {
  RemoteConfigsProvider,
  useRemoteConfigs,
} from "@contexts/remoteConfigs";
import { WebsocketProvider } from "@contexts/websocket";
import { ChatProvider } from "@contexts/chat";
import { HomeProvider } from "@contexts/home";
import { PurchasesProvider } from "@contexts/purchases";
import { PremiumProvider } from "@contexts/premium";
import { CallStatusProvider } from "@contexts/callStatus";
import CallFloatingButton from "@components/CallFloatingButton";

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
import { registerGlobals } from "@stream-io/react-native-webrtc";

preventAutoHideAsync();

OneSignal.Debug.setLogLevel(__DEV__ ? LogLevel.Verbose : LogLevel.Error);
OneSignal.initialize(secrets.OneSignalAppID);
registerGlobals();

function App() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { isUpdateAvailable } = Updates.useUpdates();

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
    const handleUpdate = async () => {
      try {
        setIsUpdating(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } catch (error) {
        setIsUpdating(false);
      }
    };

    if (isUpdateAvailable && isDevice && !__DEV__) {
      handleUpdate();
    }
  }, [isUpdateAvailable]);

  useEffect(() => {
    if (fontLoaded && !isUpdating) {
      hideAsync();
    }
  }, [fontLoaded, isUpdating]);

  if (!fontLoaded || isUpdating) {
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
                            <CallStatusProvider>
                              <HomeProvider>
                                <CallFloatingButton />
                                <Routes />
                              </HomeProvider>
                            </CallStatusProvider>
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
