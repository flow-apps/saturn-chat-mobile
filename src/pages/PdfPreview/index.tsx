import React from "react";
import Header from "../../components/Header";

import PDFViewer from "react-native-pdf";
import { useRoute } from "@react-navigation/core";
import { Container } from "./styles";
import { LinkUtils } from "../../utils/link";
import { HeaderButton } from "../../components/Header/styles";
import { Feather } from "@expo/vector-icons";
import { FileService } from "../../services/file";

const PdfPreview = () => {
  const linkUtils = new LinkUtils();
  const fileService = new FileService();
  const route = useRoute();
  const { name, original_name, url } = route.params as {
    name: string;
    original_name: string;
    url: string;
  };

  const handleOpenLink = async (link: string) => {
    await linkUtils.openLink(link);
  };

  const downloadFile = async () => {
    await fileService.downloadFile(url, original_name);
  };

  return (
    <>
      <Header title={original_name}>
        <HeaderButton onPress={downloadFile}>
          <Feather name="download" size={25} color="#fff" />
        </HeaderButton>
      </Header>
      <Container>
        <PDFViewer
          source={{ uri: url, cache: true, cacheFileName: name }}
          style={{ flex: 1 }}
          trustAllCerts={false}
          minScale={0.8}
          maxScale={10}
          enableAntialiasing
          onPressLink={handleOpenLink}
          enableAnnotationRendering
        />
      </Container>
    </>
  );
};

export default PdfPreview;
