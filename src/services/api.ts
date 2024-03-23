import axios from "axios";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const token = AsyncStorage.getItem("@SaturnChat:token") || undefined;

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    // @ts-ignore
    authorization: token,
  },
});

export default api;
