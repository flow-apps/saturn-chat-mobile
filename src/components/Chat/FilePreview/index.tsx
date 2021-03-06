import React, { useCallback, useState, useMemo } from "react";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { convertBytesToMB } from "../../../utils/convertSize";
import Alert from "../../Alert";
import FastImage from "react-native-fast-image";
import * as MimeTypes from "react-native-mime-types";

import {
  Container,
  FileButton,
  FileContainer,
  FileIconActionWrapper,
  FileIconContainer,
  FileImagePreview,
  FileInfosContainer,
  FileName,
  FileOpenAction,
  FilePreviewContainer,
  FileSize,
} from "./styles";
import { useEffect } from "react";
import { LinkUtils } from "../../../utils/link";
import { createThumbnail } from "react-native-create-thumbnail";
import AudioPreview from "./AudioPreview";

interface IFilePreviewProps {
  name: string;
  original_name: string;
  url: string;
  size: number;
  type: string;
  deleted: boolean;
}

const FilePreview = ({ name, original_name, size, url, type, deleted }: IFilePreviewProps) => {
  const [downloadWarning, setDownloadWarning] = useState(false);
  const [videoThumb, setVideoThumb] = useState<string>();
  const { colors } = useTheme();
  const linkUtils = new LinkUtils();
  const navigation = useNavigation();
  const mimeType = useMemo(() => MimeTypes.lookup(name), []);

  useEffect(() => {
    (async () => {      
      if (type === "image") {
        FastImage.preload([
          {
            uri: url,
            cache: "immutable",
            priority: "high",
          },
        ]);
      } else if (type === "video") {
        const thumb = await createThumbnail({
          url,
          format: "jpeg",
        });

        setVideoThumb(thumb.path);
      }
    })();
  }, []);

  const handleDownloadFile = () => {
    setDownloadWarning(true);
  };

  const downloadFile = useCallback(async () => {
    setDownloadWarning(false);

    await linkUtils.openLink(url);
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
        return <Feather name="disc" size={40} color={colors.black} />;

      default:
        return <Feather name="file" size={40} color={colors.black} />;
    }
  };

  const renderPreview = () => {
    if (type === "image") {
      return (
        <FileButton onPress={handleGoImagePreview}>
          <FileImagePreview
            source={{ uri: url, cache: "immutable", priority: "high" }}
          />
        </FileButton>
      );
    } else if (type === "video") {
      return (
        <FileButton onPress={handleGoVideoPreview}>
          <FileIconActionWrapper>
            <Feather name="play-circle" size={25} color={"#fff"} />
          </FileIconActionWrapper>
          <FileImagePreview
            source={{ uri: videoThumb, cache: "immutable", priority: "high" }}
          />
        </FileButton>
      );
    } else if (type === "application" && mimeType === "application/pdf") {
      return (
        <FileButton onPress={handleGoPdfPreview}>
          <FilePreviewContainer>
            <MaterialCommunityIcons
              name="pdf-box"
              size={35}
              color={colors.secondary}
            />
          </FilePreviewContainer>
        </FileButton>
      );
    }

    return (
      <FileButton onPress={handleDownloadFile}>
        <Feather name="download" size={30} color={colors.secondary} />
      </FileButton>
    );
  };

  const handleGoImagePreview = () => {
    return navigation.navigate("ImagePreview", {
      name: original_name,
      url,
    });
  };

  const handleGoVideoPreview = () => {
    return navigation.navigate("VideoPreview", {
      name: original_name,
      url,
      poster: videoThumb,
    });
  };

  const handleGoPdfPreview = () => {
    return navigation.navigate("PdfPreview", {
      name: original_name,
      url,
    });
  };

  return (
    <>
      <Container>
        <Alert
          title="??? Muito cuidado"
          content={`Tem certeza que quer baixar o arquivo? Arquivos maliciosos podem danificar seu telefone!\n\n???? Arquivo: ${name}`}
          visible={downloadWarning}
          cancelButtonText="N??o baixar"
          okButtonText="Baixar"
          okButtonAction={downloadFile}
          cancelButtonAction={() => setDownloadWarning(false)}
        />
        <FileContainer>
          <FileIconContainer>{renderIcon()}</FileIconContainer>
          <FileInfosContainer>
            <FileName ellipsizeMode="middle">{original_name}</FileName>
            <FileSize>{convertBytesToMB(size)}</FileSize>
          </FileInfosContainer>
          <FileOpenAction>{renderPreview()}</FileOpenAction>
        </FileContainer>
      </Container>
      {type === "audio" && (
        <AudioPreview deleted={deleted} audio={{ name, url }} />
      )}
    </>
  );
};

export default React.memo(FilePreview, (prev, next) => {
  return prev.url === next.url && prev.deleted === next.deleted;
});
