import React, { useCallback, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { convertBytesToMB } from "../../../utils/convertSize";
import Alert from "../../Alert";
import FastImage from "react-native-fast-image";

import {
  Container,
  FileButton,
  FileContainer,
  FileIconContainer,
  FileImagePreview,
  FileInfosContainer,
  FileName,
  FileOpenAction,
  FileSize,
} from "./styles";
import { useEffect } from "react";
import { Linking } from "react-native";
import { LinkUtils } from "../../../utils/link";

interface IFileProps {
  name: string;
  url: string;
  size: number;
  type: string;
}

const FilePreview = ({ name, size, url, type }: IFileProps) => {
  const [downloadWarning, setDownloadWarning] = useState(false);
  const { colors } = useTheme();
  const linkUtils = new LinkUtils()
  const navigation = useNavigation();

  useEffect(() => {
    if (type === "image") {
      FastImage.preload([
        {
          uri: url,
          cache: "immutable",
          priority: "high",
        },
      ]);
    }
  }, []);

  const handleDownloadFile = () => {
    setDownloadWarning(true);
  };

  const downloadFile = useCallback(async () => {
    setDownloadWarning(false);

    await linkUtils.openLink(url)
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
          <FileName>{name}</FileName>
          <FileSize>{convertBytesToMB(size)}MB</FileSize>
        </FileInfosContainer>
        <FileOpenAction>
          {type === "image" ? (
            <FileButton onPress={handleGoImagePreview}>
              <FileImagePreview
                source={{ uri: url, cache: "immutable", priority: "high" }}
              />
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
