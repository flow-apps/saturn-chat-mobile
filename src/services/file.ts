import * as DocumentPicker from "expo-document-picker";
import * as MimeTypes from "react-native-mime-types";
import RNFB, { RNFetchBlobConfig } from "rn-fetch-blob";
import { Platform } from "react-native";
import SimpleToast from "react-native-simple-toast";

enum FileServiceErrors {
  FILE_SIZE_REACHED_LIMIT = 0,
  FILE_CANCELLED = 1,
}

class FileService {
  readonly filesSizeUsed: number;
  readonly sizeLimit: number;

  constructor(sizeUsed?: number, limit?: number) {
    this.filesSizeUsed = sizeUsed || 0;
    this.sizeLimit = limit || 12;
  }

  private getCorrectURI(uri: string) {
    // if (Platform.OS === "android" && !uri.startsWith("file://") || !uri.startsWith("file:///")) {
    //   return encodeURI(`file://${uri}`);
    // }

    return uri;
  }

  async get() {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (file.type === "success") {
      const fileSize = file.size / 1024 / 1024;
      const usageSize = this.filesSizeUsed + fileSize;
      const type = MimeTypes.lookup(file.name).split("/")[0] as string;
      if (fileSize > this.sizeLimit || usageSize > this.sizeLimit) {
        return {
          error: true,
          errorType: FileServiceErrors.FILE_SIZE_REACHED_LIMIT,
        };
      }

      file.uri = this.getCorrectURI(file.uri);

      return {
        error: false,
        errorType: null,
        usageSize,
        fileSize,
        selectedFile: {
          file,
          type,
        },
      };
    } else {
      return {
        error: true,
        errorType: FileServiceErrors.FILE_CANCELLED,
      };
    }
  }

  async downloadFile(url: string, fileName: string) {
    try {
      const {
        dirs: { DownloadDir, DocumentDir },
      } = RNFB.fs;
      const directoryPath = Platform.select({
        ios: DocumentDir,
        android: DownloadDir,
      });

      const filePath = `${directoryPath}/${fileName}`;
      const mimetype = MimeTypes.lookup(fileName) as string;
      const downloadConfig: RNFetchBlobConfig = Platform.select({
        ios: {
          fileCache: true,
          path: filePath,
          notification: true,
        },
        android: {
          fileCache: true,
          path: filePath,
          addAndroidDownloads: {
            useDownloadManager: true,
            mime: mimetype,
            title: fileName,
            path: filePath,
            mediaScannable: true,
            notification: true,
          },
        },
      });

      SimpleToast.show("Iniciando download...");
      RNFB.config(downloadConfig as RNFetchBlobConfig)
        .fetch("GET", url)
        .then((res) => {
          SimpleToast.show("Download concluído!");
        })
        .catch((error) => {
          SimpleToast.show("Falha no download");
        });
    } catch (error) {
      SimpleToast.show("Falha no download");
    }
  }
}

export { FileService, FileServiceErrors };
