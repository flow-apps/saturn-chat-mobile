import { isDevice } from "expo-device";
import { Platform } from "react-native";

const configs = {
  PROD_API_URL: "https://saturnchat.azurewebsites.net/",
  DEV_API_URL: isDevice ? "http://192.168.1.201:3000" : "http://10.0.2.2:3000",
  STORAGE_URL: "https://saturnchatstorage.blob.core.windows.net/",
  SATURN_CHAT_DOMAINS: ["saturn-chat.vercel.app", "saturnchat.com.br"],
  WEBSITE_URL: "https://saturnchat.com.br",
  OFICIAL_GROUP_ID: "d10dfadb-08d1-4eb8-8a82-3a7b379604d3",
  PRODUCT_SKUS: Platform.select({
    android: ["star_plan"],
  }),
  ICE_SERVERS_CONFIG: {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  },
  ADS: {
    TEST_ADS_IDS: {
      BANNER: "ca-app-pub-3940256099942544/2934735716",
      INTERSTITIAL: "ca-app-pub-3940256099942544/1033173712",
    },
  },
};

export default configs;
