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
import { ImageDimensions, useImageDimensions } from "@react-native-community/hooks/lib/useImageDimensions";
import { FileService } from "@services/file";
import { useAuth } from "@contexts/auth";

const ImagePreview = () => {
  const fileService = new FileService();

  const route = useRoute();
  const { getHeadersForAuthFiles } = useAuth()
  const { name, original_name, url } = route.params as {
    name: string;
    original_name: string;
    url: string;
  };

  const [dimensions, setDimensions] = useState<ImageDimensions | undefined>()

  const imageHeaders = useMemo(() => getHeadersForAuthFiles(url), [url, getHeadersForAuthFiles]);
  
  useEffect(() => {
    // const d = useImageDimensions({ uri: url }, { headers: imageHeaders as any });
    // setDimensions(d.dimensions)
  }, [])

  const downloadFile = useCallback(async () => {
    await fileService.downloadFile(url, original_name);
  }, [original_name, url]);

  // if (!dimensions) return <Loading />;
  console.log(url);
  

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
            imageWidth={Dimensions.get("screen").width}
            imageHeight={Dimensions.get("screen").height}
            cropWidth={Dimensions.get("screen").width}
            cropHeight={Dimensions.get("screen").height}
            minScale={1}
            useNativeDriver
            enableCenterFocus
            enableDoubleClickZoom
          >
            <Image
              uri={url}
              width={100}
              height={100}
            />
          </ImageZoom>
        </ImageContainer>
      </Container>
    </>
  );
};

export default ImagePreview;
