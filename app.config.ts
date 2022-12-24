import { ExpoConfig, ConfigContext } from "@expo/config";
import secrets from "./src/secrets.json";

export default ({ config }: ConfigContext): ExpoConfig => {  
  return {
    ...config,
    name: "Saturn Chat",
    slug: "SaturnChat",
    version: "0.0.1",
    orientation: "default",
    icon: "./assets/icon.png",
    scheme: "saturnchat",
    platforms: ["android", "ios"],
    assetBundlePatterns: ["**/*", "./src/assets"],
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics",
    ],
    experiments: {
      turboModules: true,
    },
    isDetached: true,
    androidStatusBar: {
      backgroundColor: "#0088ff",
      barStyle: "light-content",
    },
    updates: {
      fallbackToCacheTimeout: 1000,
      checkAutomatically: "ON_LOAD",
      enabled: true,
    },
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
  };
};
