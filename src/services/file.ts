import * as DocumentPicker from "expo-document-picker";
import { Platform } from "react-native";
import * as MimeTypes from "react-native-mime-types";

enum FileServiceErrors {
  FILE_SIZE_REACHED_LIMIT = 0,
  FILE_CANCELLED = 1,
}

class FileService {
  readonly filesSizeUsed: number;
  readonly sizeLimit: number;

  constructor(sizeUsed: number, limit?: number) {    
    this.filesSizeUsed = sizeUsed;
    this.sizeLimit = limit || 12;
  }

  private getCorrectURI(uri: string) {
    if (Platform.OS === "android") {
      return encodeURI(`file://${uri}`)
    }

    return uri
  }

  async get() {
    const file = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true
    });
    
    
    if (file.type === "success") {
      const fileSize = Math.trunc(file.size / 1000 / 1000);
      const usageSize = this.filesSizeUsed + fileSize;
      console.log(usageSize);
      const type = MimeTypes.lookup(file.name).split("/")[0] as string;
      if (fileSize > this.sizeLimit || usageSize > this.sizeLimit) {
        return {
          error: true,
          errorType: FileServiceErrors.FILE_SIZE_REACHED_LIMIT,
        };
      }

      file.uri = this.getCorrectURI(file.uri)      

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
}

export { FileService, FileServiceErrors };
