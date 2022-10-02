import React, { useEffect, useState } from "react";
import ReactNative, { Dimensions, Pressable } from "react-native";
import Header from "../../components/Header";
import ImageZoom from "react-native-image-pan-zoom";
import { Container, ImageContainer, Image } from "./styles";
import { useRoute } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { HeaderButton } from "../../components/Header/styles";
import { useCallback } from "react";
import { LinkUtils } from "../../utils/link";
import { useImageDimensions } from "@react-native-community/hooks";
import Loading from "../../components/Loading";
import { AnimatePresence, MotiView } from "moti";

const ImagePreview = () => {
  const [hiddenHeader, setHiddenHeader] = useState(false);

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

  const handleHiddenAndShowHeader = () => {
    setHiddenHeader((old) => !old);
  };

  if (!dimensions) return <Loading />;

  return (
    <>
      <Header bgColor="#00000000" title={name}>
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
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
