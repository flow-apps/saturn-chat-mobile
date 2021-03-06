import { ExpoConfig, ConfigContext } from "@expo/config"
import secrets from "./src/secrets.json"

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "Saturn Chat",
    slug: "SaturnChat",
    version: "0.0.1",
    orientation: "default",
    icon: "./assets/icon.png",
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics"
    ],
    experiments: {
      turboModules: true,
    },
    isDetached: true,
    androidNavigationBar: {
      visible: "sticky-immersive"
    },
    androidStatusBar: {
      backgroundColor: "#0088ff",
      barStyle: "light-content",
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0088FF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
      checkAutomatically: "ON_LOAD",
      enabled: true,
    },
    assetBundlePatterns: ["**/*", "./src/assets"],
    ios: {
      supportsTablet: true,
      buildNumber: "0.0.1",
      bundleIdentifier: "com.flowapps.saturnchat",
      googleServicesFile: "./GoogleService-Info.plist",
      config: {
        googleMobileAdsAppId: secrets.AdsAppID.ios,
      },
    },
    android: {
      // @ts-ignore
      jsEngine: "hermes", 
      allowBackup: true,
      package: "com.flowapps.saturnchat",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0088FF",
      },
      config: {
        googleMobileAdsAppId: secrets.AdsAppID.android,
      },
    },
    web: {
      favicon: "./assets/favicon.png",
      config: {
        firebase: secrets.Firebase.web_config
      }
    },
});
