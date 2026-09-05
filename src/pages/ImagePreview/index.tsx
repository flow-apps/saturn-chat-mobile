import React, { useEffect, useMemo, useState, useCallback } from "react";
import ReactNative, { Dimensions, StatusBar } from "react-native";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ImageZoom from "react-native-image-pan-zoom";
import Feather from "@expo/vector-icons/Feather";
import { Container, ImageContainer, Image } from "./styles";
import { useRoute } from "@react-navigation/native";
import { HeaderButton } from "@components/Header/styles";
import { FileService } from "@services/file";
import { useAuth } from "@contexts/auth";
import Alert from "@components/Alert";
import FastImage from "react-native-fast-image";
import {
  isScreenshotBlocked,
  useScreenshotProtection,
} from "@hooks/useScreenshotProtection";
import { useTranslate } from "@hooks/useTranslate";

interface ImageDimensions {
  width: number;
  height: number;
}

const ImagePreview = () => {
  const fileService = new FileService();

  const route = useRoute();
  const { getHeadersForAuthFiles } = useAuth();
  const { t } = useTranslate("Settings");
  const { name, original_name, url, antiPrint, conversationType } =
    route.params as {
      name: string;
      original_name: string;
      url: string;
      antiPrint?: boolean;
      conversationType?: "GROUP" | "DIRECT";
    };

  const screenshotBlocked = isScreenshotBlocked({
    antiPrint: antiPrint === true,
    conversationType: conversationType || "DIRECT",
    settingsLoading: false,
  });

  const { screenshotAlertVisible, dismissScreenshotAlert } =
    useScreenshotProtection(screenshotBlocked, false, `image-${url}`);

  const [dimensions, setDimensions] = useState<ImageDimensions>();

  const imageHeaders = useMemo(
    () => getHeadersForAuthFiles(url),
    [getHeadersForAuthFiles, url],
  );

  useEffect(() => {
    let isMounted = true;

    if (url) {
      // 1. Reforça o prefetch caso o usuário acesse a tela diretamente via deep link/push
      FastImage.preload([
        {
          uri: url,
          headers: imageHeaders,
          cache: "immutable",
          priority: FastImage.priority.high,
        },
      ]);

      // 2. Obtém dimensões da imagem
      ReactNative.Image.getSizeWithHeaders(
        url,
        // @ts-ignore
        imageHeaders,
        (width, height) => {
          if (!isMounted) return;
          const screenWidth = Dimensions.get("window").width;
          const scaleFactor = width / screenWidth;
          const imageHeight = height / scaleFactor;
          setDimensions({ width: screenWidth, height: imageHeight });
        },
        (error) => {
          console.warn("Erro ao obter tamanho da imagem:", error);
          // Fallback para exibir a imagem mesmo se getSize falhar
          if (isMounted) {
            const screenWidth = Dimensions.get("window").width;
            setDimensions({ width: screenWidth, height: screenWidth });
          }
        },
      );
    }

    return () => {
      isMounted = false;
    };
  }, [url, imageHeaders]);

  const downloadFile = useCallback(async () => {
    await fileService.downloadFile(url, original_name, imageHeaders);
  }, [fileService, original_name, url, imageHeaders]);

  if (!dimensions) return <Loading />;

  return (
    <>
      <Alert
        visible={screenshotAlertVisible}
        title={t("account.security.screenshot_blocked_title")}
        content={t("account.security.screenshot_blocked_content")}
        okButtonAction={dismissScreenshotAlert}
      />
      <Header bgColor="#111" title={original_name}>
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
      <StatusBar backgroundColor="#111" />
      <Container>
        <ImageContainer>
          {/* @ts-ignore */}
          <ImageZoom
            imageWidth={dimensions.width}
            imageHeight={dimensions.height}
            cropWidth={Dimensions.get("screen").width}
            cropHeight={Dimensions.get("screen").height}
            minScale={1}
            useNativeDriver
            enableCenterFocus
            enableDoubleClickZoom
          >
            <Image
              uri={url}
              style={{
                width: dimensions.width,
                height: dimensions.height,
              }}
            />
          </ImageZoom>
        </ImageContainer>
      </Container>
    </>
  );
};

export default ImagePreview;
