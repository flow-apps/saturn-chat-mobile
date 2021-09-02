import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import perf, { FirebasePerformanceTypes } from "@react-native-firebase/perf";

const token = AsyncStorage.getItem("@SaturnChat:token") || undefined;

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    authorization: token,
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const httpMetric = perf().newHttpMetric(
      String(config.url),
      config.method as FirebasePerformanceTypes.HttpMethod
    );

    // @ts-ignore
    config.metadata = { httpMetric };

    await httpMetric.start();
  } finally {
    return config;
  }
});

api.interceptors.response.use(
  async (response: AxiosResponse & { config: { metadata?: any } }) => {
    try {
      const { httpMetric } = response.config.metadata as {
        httpMetric: FirebasePerformanceTypes.HttpMetric;
      };

      httpMetric.setHttpResponseCode(response.status);
      httpMetric.setResponseContentType(response.headers["content-type"]);
      await httpMetric.stop();
    } finally {
      return response;
    }
  },

  async (error) => {
    try {
      const { httpMetric } = error.config.metadata as {
        httpMetric: FirebasePerformanceTypes.HttpMetric;
      };

      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers["content-type"]);
      httpMetric.putAttribute("message", error.response.data.message);
      await httpMetric.stop();
    } finally {
      return Promise.reject(error);
    }
  }
);

export default api;
