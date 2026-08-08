import * as DocumentPicker from "expo-document-picker";
import * as MimeTypes from "react-native-mime-types";
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
   console.log("TODO: IMPLEMENTAR DOWNLOAD");
   
  }
}

export { FileService, FileServiceErrors };
