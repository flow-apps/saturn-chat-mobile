import React, { useMemo } from "react";
import Header from "@components/Header";

import PDFViewer from "react-native-pdf";
import { useRoute } from "@react-navigation/core";
import { Container } from "./styles";
import { LinkUtils } from "@utils/link";
import { HeaderButton } from "@components/Header/styles";
import Feather from "@expo/vector-icons/Feather";
import { FileService } from "@services/file";
import { useAuth } from "@contexts/auth";

const PdfPreview = () => {
  const linkUtils = new LinkUtils();
  const fileService = new FileService();
  const route = useRoute();
  const { getHeadersForAuthFiles } = useAuth();
  const { name, original_name, url } = route.params as {
    name: string;
    original_name: string;
    url: string;
  };

  const pdfHeaders = useMemo(
    () => getHeadersForAuthFiles(url),
    [getHeadersForAuthFiles],
  );

  const handleOpenLink = async (link: string) => {
    await linkUtils.openLink(link);
  };

  const downloadFile = async () => {
    await fileService.downloadFile(url, original_name, pdfHeaders);
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
          source={{
            uri: url,
            headers: pdfHeaders,
          }}
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
