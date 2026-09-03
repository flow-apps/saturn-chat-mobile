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
import Alert from "@components/Alert";
import {
  isScreenshotBlocked,
  useScreenshotProtection,
} from "@hooks/useScreenshotProtection";
import { useTranslate } from "@hooks/useTranslate";

const PdfPreview = () => {
  const linkUtils = new LinkUtils();
  const fileService = new FileService();
  const route = useRoute();
  const { getHeadersForAuthFiles } = useAuth();
  const { t } = useTranslate("Settings");
  const { name, original_name, url, antiPrint, conversationType } = route.params as {
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
    useScreenshotProtection(screenshotBlocked, false, `pdf-${url}`);

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
      <Alert
        visible={screenshotAlertVisible}
        title={t("account.security.screenshot_blocked_title")}
        content={t("account.security.screenshot_blocked_content")}
        okButtonAction={dismissScreenshotAlert}
      />
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
