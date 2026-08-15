import axios from "axios";
import config from "@config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_PREFERENCE_KEY = "@SaturnChat:useDevApi";

const DEV_API_URL = config.DEV_API_URL;

const api = axios.create({
  baseURL: config.PROD_API_URL,
});

export const setApiBaseURL = async (useDev: boolean) => {
  const newBaseURL = useDev ? DEV_API_URL : config.PROD_API_URL;
  api.defaults.baseURL = newBaseURL;
  await AsyncStorage.setItem(API_PREFERENCE_KEY, JSON.stringify(useDev));
  console.log(`API Base URL set to: ${newBaseURL}`);
};

(async () => {
  try {
    const storedPreference = await AsyncStorage.getItem(API_PREFERENCE_KEY);
    const useDev = storedPreference && __DEV__ ? JSON.parse(storedPreference) : false;
    await setApiBaseURL(useDev);
  } catch (error) {
    console.error("Failed to load API preference from AsyncStorage", error);
    await setApiBaseURL(false);
  }
})();

export default api;
