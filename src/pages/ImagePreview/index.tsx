import React, { useEffect, useMemo, useState } from "react";
import ReactNative, { Dimensions, StatusBar } from "react-native";
import Header from "@components/Header";
import Loading from "@components/Loading";
import ImageZoom from "react-native-image-pan-zoom";
import Feather from "@expo/vector-icons/Feather";
import { Container, ImageContainer, Image } from "./styles";
import { useRoute } from "@react-navigation/native";
import { HeaderButton } from "@components/Header/styles";
import { useCallback } from "react";
import { FileService } from "@services/file";
import { useAuth } from "@contexts/auth";

interface ImageDimensions {
  width: number;
  height: number;
}

const ImagePreview = () => {
  const fileService = new FileService();

  const route = useRoute();
  const { getHeadersForAuthFiles } = useAuth();
  const { name, original_name, url } = route.params as {
    name: string;
    original_name: string;
    url: string;
  };


  const [dimensions, setDimensions] = useState<ImageDimensions>();
  const imageHeaders = useMemo(
    () => getHeadersForAuthFiles(url),
    [getHeadersForAuthFiles]
  );

  useEffect(() => {
    if (url) {
      ReactNative.Image.getSizeWithHeaders(
        url,
        // @ts-ignore
        imageHeaders,
        (width, height) => {
          const screenWidth = Dimensions.get("window").width;
          const scaleFactor = width / screenWidth;
          const imageHeight = height / scaleFactor;
          setDimensions({ width: screenWidth, height: imageHeight });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [url, imageHeaders]);

  const downloadFile = useCallback(async () => {
    await fileService.downloadFile(url, original_name);
  }, [original_name, url]);

  if (!dimensions) return <Loading />;

  return (
    <>
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
              width={dimensions.width}
              height={dimensions.height}
              // @ts-ignore
              headers={imageHeaders}
              resizeMode="contain"
            />
          </ImageZoom>
        </ImageContainer>
      </Container>
    </>
  );
};

export default ImagePreview;
