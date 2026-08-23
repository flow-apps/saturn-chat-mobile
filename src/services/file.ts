import * as DocumentPicker from "expo-document-picker";
import * as MimeTypes from "react-native-mime-types";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import SimpleToast from "react-native-simple-toast";

enum FileServiceErrors {
  FILE_SIZE_REACHED_LIMIT = 0,
  FILE_CANCELLED = 1,
}

class FileService {
  readonly filesSizeUsed: number;
  readonly sizeLimit: number;
  private isPermissionPending = false;

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
      const selectedFile = file.assets[0];
      const fileSize =
        (selectedFile.size ?? Number.MAX_SAFE_INTEGER) / 1024 / 1024;
      const usageSize = this.filesSizeUsed + fileSize;
      const mimeTypeResult = MimeTypes.lookup(selectedFile.name);
      const type =
        typeof mimeTypeResult === "string"
          ? mimeTypeResult.split("/")[0]
          : "application";
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

  async getMimeTypeFromExtension(fileName: string) {
    const extension = fileName.split(".").pop()?.toLowerCase();

    const mimeTypes: Record<string, string> = {
      pdf: "application/pdf",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      json: "application/json",
      zip: "application/zip",
      txt: "text/plain",
      mp3: "audio/mpeg",
      mp4: "video/mp4",
    };

    return mimeTypes[extension || ""] || "application/octet-stream";
  }

  async downloadFile(
    url: string,
    fileName: string,
    headers: Record<string, string> = {},
  ): Promise<string | null> {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) return null;

      const tempUri = `${FileSystem.cacheDirectory}${fileName}`;
      const downloaded = await FileSystem.downloadAsync(url, tempUri, {
        headers,
      });

      if (downloaded.status !== 200) {
        SimpleToast.show(`Erro HTTP ${downloaded.status}`, SimpleToast.LONG);
        return null;
      }

      // 1. Obtém o MIME type da resposta da API ou infere pela extensão do arquivo
      const contentTypeHeader =
        downloaded.headers["content-type"] ||
        downloaded.headers["Content-Type"];
      const detectedMimeType =
        contentTypeHeader || this.getMimeTypeFromExtension(fileName);

      // 2. Lê o arquivo baixado como Base64
      const base64Data = await FileSystem.readAsStringAsync(downloaded.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 3. Cria o arquivo no SAF com o MIME type correto
      const destinationUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          await detectedMimeType,
        );

      // 4. Escreve os dados Base64 no arquivo criado
      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        destinationUri,
        base64Data,
        { encoding: FileSystem.EncodingType.Base64 },
      );

      // 5. Remove do cache temporário
      await FileSystem.deleteAsync(downloaded.uri, { idempotent: true });

      SimpleToast.show(
        `Arquivo "${fileName}" baixado com sucesso!`,
        SimpleToast.LONG,
      );
      return destinationUri;
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
      SimpleToast.show("Falha ao salvar o arquivo.", SimpleToast.LONG);
      return null;
    }
  }
}

export { FileService, FileServiceErrors };
