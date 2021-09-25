import React from 'react';
import Header from '../../components/Header';

import PDFViewer from "react-native-pdf"
import LoadingIndicator from '../../components/LoadingIndicator';
import { useRoute } from '@react-navigation/core';
import { Container } from './styles';
import { LinkUtils } from '../../utils/link';


const PdfPreview = () => {

  const route = useRoute()
  const { name, url } = route.params as { name: string; url: string }
  const linkUtils = new LinkUtils()

  const handleOpenLink = async (link: string) => {
    await linkUtils.openLink(link)
  }

  return (
    <>
      <Header title={name} backButton />
      <Container>
        <PDFViewer
          source={{ uri: url, cache: true }}
          style={{ flex: 1 }}
          activityIndicator={LoadingIndicator}
          maxScale={10}
          enableAnnotationRendering
          enableAntialiasing
          onPressLink={handleOpenLink}
        />
      </Container>
    </>
  )
}

export default PdfPreview;