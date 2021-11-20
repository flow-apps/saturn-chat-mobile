import React from "react";
import Header from "../../components/Header";

import PDFViewer from "react-native-pdf";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useRoute } from "@react-navigation/core";
import { Container } from "./styles";
import { LinkUtils } from "../../utils/link";
import { HeaderButton } from "../../components/Header/styles";
import { Feather } from "@expo/vector-icons"

const PdfPreview = () => {
  const route = useRoute();
  const { name, url } = route.params as { name: string; url: string };
  const linkUtils = new LinkUtils();

  const handleOpenLink = async (link: string) => {
    await linkUtils.openLink(link);
  };

  const downloadFile = async () => {
    await linkUtils.openLink(url)
  }

  return (
    <>
      <Header title={name} >
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <PDFViewer
          source={{ uri: url, cache: true }}
          style={{ flex: 1 }}
          activityIndicator={LoadingIndicator}
          minScale={0.8}
          maxScale={10}
          enableAnnotationRendering
          enableAntialiasing
          onPressLink={handleOpenLink}
        />
      </Container>
    </>
  );
};

export default PdfPreview;
