const configs = {
  API_URL: __DEV__ ? "http://192.168.0.108:3000" : "https://278d-45-239-139-159.sa.ngrok.io",
  SATURN_CHAT_DOMAINS: ["saturn-chat.vercel.app", "saturnchat.app"],
  WEBSITE_URL: "https://saturn-chat.vercel.app",
  ADS: {
    TEST_ADS_IDS: {
      BANNER: "ca-app-pub-3940256099942544/2934735716",
      INTERSTITIAL: "ca-app-pub-3940256099942544/1033173712",
    },
  },
};

export default configs
