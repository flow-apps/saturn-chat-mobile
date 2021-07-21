import * as FileSystem from "expo-file-system";

const documentsPath = FileSystem.documentDirectory;

export default {
  API_URL: __DEV__ ? "http://192.168.0.112:3000" : "http://192.168.0.112:3000",
  FILE_PATHS: {
    AUDIO: `${documentsPath}`,
    DOCUMENTS: `${documentsPath}`,
  },
};
