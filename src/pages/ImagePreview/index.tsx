import React, { useEffect } from "react";
import ReactNative, { Dimensions, StatusBar } from "react-native";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ImageZoom from "react-native-image-pan-zoom";
import Feather from "@expo/vector-icons/Feather";
import { Container, ImageContainer, Image } from "./styles";
import { useRoute } from "@react-navigation/native";
import { HeaderButton } from "../../components/Header/styles";
import { useCallback } from "react";
import { LinkUtils } from "../../utils/link";
import { useImageDimensions } from "@react-native-community/hooks";

const ImagePreview = () => {
  const linkUtils = new LinkUtils();

  const route = useRoute();
  const { name, url } = route.params as { name: string; url: string };
  const { dimensions } = useImageDimensions({ uri: url });

  useEffect(() => {
    ReactNative.Image.prefetch(url);
  }, []);

  const downloadFile = useCallback(async () => {
    await linkUtils.openLink(url);
  }, [name, url]);

  if (!dimensions) return <Loading />;

  return (
    <>
      <Header bgColor="#111" title={name}>
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
              source={{ uri: url }}
              width={dimensions.width}
              height={dimensions.height}
              resizeMode="center"
            />
          </ImageZoom>
        </ImageContainer>
      </Container>
    </>
  );
};

export default ImagePreview;
