import * as FileSystem from "expo-file-system";

const documentsPath = FileSystem.documentDirectory;

export default {
  API_URL: __DEV__ ? "http://192.168.0.112:3000" : "http://192.168.0.112:3000",
  FILE_PATHS: {
    AUDIO: `${documentsPath}`,
    DOCUMENTS: `${documentsPath}`,
  },
  ADS: {
    PRODUCTIONS_UNIT_IDS: {
      android: "",
      ios: "",
    },
    TEST_ADS_IDS: {
      BANNER: "ca-app-pub-3940256099942544/2934735716",
      INTERSTITIAL: "ca-app-pub-3940256099942544/1033173712",
    },
    PROD_ADS_IDS: {
      android: {
        BANNER: "ca-app-pub-5955119850349278/9936183007",
        INTERSTITIAL: "",
      },
      ios: {
        BANNER: "ca-app-pub-5955119850349278/4745852927",
        INTERSTITIAL: "",
      },
    },
  },
};
