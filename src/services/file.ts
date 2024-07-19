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


    if (!file.canceled) {
      const selectedFile = file.assets[0]
      const fileSize = selectedFile.size / 1024 / 1024;
      const usageSize = this.filesSizeUsed + fileSize;
      const type = MimeTypes.lookup(selectedFile.name).split("/")[0] as string;
      if (fileSize > this.sizeLimit || usageSize > this.sizeLimit) {
        return {
          error: true,
          errorType: FileServiceErrors.FILE_SIZE_REACHED_LIMIT,
        };
      }

      selectedFile.uri = this.getCorrectURI(selectedFile.uri);

      return {
        error: false,
        errorType: null,
        usageSize,
        fileSize,
        selectedFile: {
          file: selectedFile,
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

      if (["https", "http"].includes(url?.split("//")?.shift())) {
        SimpleToast.show("Invalid image file", SimpleToast.SHORT);
        return;
      }

      const {
        dirs: { DownloadDir, DocumentDir },
      } = RNFB.fs;
      const directoryPath = Platform.select({
        ios: DocumentDir,
        android: DownloadDir,
      });

      const filePath = `${directoryPath}/${fileName}`;
      const mimetype = MimeTypes.lookup(fileName) as string;
      
      if (!mimetype) {
        return SimpleToast.show("Arquivo não disponível para download", SimpleToast.SHORT)
      }

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
            mime: String(mimetype),
            title: fileName,
            path: filePath,
            mediaScannable: true,
            notification: true,
          },
        },
      });

      SimpleToast.show("Iniciando download...",SimpleToast.SHORT);
      RNFB.config(downloadConfig as RNFetchBlobConfig)
        .fetch("GET", url)
        .then((res) => {
          SimpleToast.show("Download concluído!",SimpleToast.SHORT);
        })
        .catch((error) => {
          SimpleToast.show("Falha no download",SimpleToast.SHORT);
        });
    } catch (error) {
      SimpleToast.show("Falha no download",SimpleToast.SHORT);
    }
  }
}

export { FileService, FileServiceErrors };
