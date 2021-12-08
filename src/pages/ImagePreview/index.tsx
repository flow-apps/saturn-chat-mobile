import React, { useEffect } from "react";
import ReactNative, { Dimensions } from "react-native";
import Header from "../../components/Header";
import ImageZoom from "react-native-image-pan-zoom"
import { Container, ImageContainer, Image } from "./styles";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { HeaderButton } from "../../components/Header/styles";
import { useCallback } from "react";
import { LinkUtils } from "../../utils/link";
import { useImageDimensions } from "@react-native-community/hooks"

const ImagePreview = () => {
  const linkUtils = new LinkUtils();

  const route = useRoute();
  const { name, url } = route.params as { name: string; url: string };
  const { dimensions } = useImageDimensions({ uri: url })

  useEffect(() => {
    ReactNative.Image.prefetch(url);
  }, []);

  const downloadFile = useCallback(async () => {
    await linkUtils.openLink(url);
  }, [name, url]);

  return (
    <>
      <Header title={name}>
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <ImageContainer>
          <ImageZoom
            minScale={1}
            maxScale={3}
            imageWidth={dimensions?.width}
            imageHeight={dimensions?.height}
            cropWidth={Dimensions.get("screen").width}
            cropHeight={Dimensions.get("screen").height}
            useNativeDriver={true}
          >
            <Image source={{ uri: url }} resizeMode="center" />
          </ImageZoom>
        </ImageContainer>
      </Container>
    </>
  );
};

export default ImagePreview;
