import React, { useCallback } from "react";

import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

import {
  Container,
  FileContainer,
  FileButton,
  FileIconContainer,
  FileImagePreview,
  FileInfosContainer,
  FileName,
  FileOpenAction,
  FileSize,
} from "./styles";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import Alert from "../../Alert";
import { useState } from "react";
import { convertBytesToMB } from "../../../utils/convertSize";
import config from "../../../config";
import Toast from "react-native-simple-toast";
import { useNavigation } from "@react-navigation/native";

interface IFileProps {
  name: string;
  url: string;
  size: number;
  type: string;
}

const FilePreview = ({ name, size, url, type }: IFileProps) => {
  const [downloadWarning, setDownloadWarning] = useState(false);
  const navigation = useNavigation();

  const { colors } = useTheme();

  const handleDownloadFile = () => {
    setDownloadWarning(true);
  };

  const downloadFile = useCallback(async () => {
    setDownloadWarning(false);
    const { granted } = await MediaLibrary.getPermissionsAsync();

    if (!granted) {
      const perm = await MediaLibrary.requestPermissionsAsync();

      if (!perm.granted) {
        return;
      }
    }

    Toast.show("Iniciando download");

    const filePath = config.FILE_PATHS.DOCUMENTS + name;

    try {
      FileSystem.downloadAsync(url, filePath).then(async ({ uri }) => {
        Toast.show("Arquivo baixado com sucesso!");
      });
    } catch (error) {
      Toast.show("Não foi possível realizar o download!");
      new Error(error);
    }
  }, [url, name]);

  const renderIcon = () => {
    switch (type) {
      case "image":
        return <Feather name="image" size={40} color={colors.black} />;

      case "text":
        return <Feather name="file-text" size={40} color={colors.black} />;

      case "application":
        return <Feather name="file-minus" size={40} color={colors.black} />;

      case "video":
        return <Feather name="video" size={40} color={colors.black} />;

      case "audio":
        return <Feather name="speaker" size={40} color={colors.black} />;

      default:
        return <Feather name="file" size={40} color={colors.black} />;
    }
  };

  const handleGoImagePreview = () => {
    return navigation.navigate("ImagePreview", {
      name,
      url,
    });
  };

  return (
    <Container>
      <Alert
        title="❗ Muito cuidado"
        content={`Tem certeza que quer baixar o arquivo? Arquivos maliciosos podem danificar seu telefone!\n\n📁 Arquivo: ${name}`}
        visible={downloadWarning}
        cancelButtonText="Não baixar"
        okButtonText="Baixar"
        okButtonAction={downloadFile}
        cancelButtonAction={() => setDownloadWarning(false)}
      />
      <FileContainer>
        <FileIconContainer>{renderIcon()}</FileIconContainer>
        <FileInfosContainer>
          <FileName numberOfLines={1} lineBreakMode="middle">
            {name}
          </FileName>
          <FileSize>{convertBytesToMB(size)}MB</FileSize>
        </FileInfosContainer>
        <FileOpenAction>
          {type === "image" ? (
            <FileButton onPress={handleGoImagePreview}>
              <FileImagePreview source={{ uri: url }} />
            </FileButton>
          ) : (
            <FileButton onPress={handleDownloadFile}>
              <Feather name="download" size={30} color={colors.secondary} />
            </FileButton>
          )}
        </FileOpenAction>
      </FileContainer>
    </Container>
  );
};

export default React.memo(FilePreview);
