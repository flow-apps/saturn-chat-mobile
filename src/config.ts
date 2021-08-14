import * as FileSystem from "expo-file-system";

const documentsPath = FileSystem.documentDirectory;

export default {
  API_URL: __DEV__ ? "http://192.168.0.112:3000" : "http://192.168.0.112:3000",
  WEBSITE_URL: "https://saturn-chat-web.vercel.app",
  FILE_PATHS: {
    AUDIO: `${documentsPath}`,
    DOCUMENTS: `${documentsPath}`,
  },
  ADS: {
    TEST_ADS_IDS: {
      BANNER: "ca-app-pub-3940256099942544/2934735716",
      INTERSTITIAL: "ca-app-pub-3940256099942544/1033173712",
    },
  },
};
