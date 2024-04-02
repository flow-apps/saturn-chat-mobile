import React from "react";
import Header from "@components/Header";
import { Container, Content, Title } from "./styles";
import { useTranslate } from "@hooks/useTranslate";
import Banner from "@components/Ads/Banner";
import { BannerAdSize } from "react-native-google-mobile-ads";

const SwitchLanguage: React.FC = () => {
  const { t } = useTranslate("SwitchLanguage");

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <Title>{t("title")}</Title>
        <Content>{t("subtitle")}</Content>
        <Banner size={BannerAdSize.MEDIUM_RECTANGLE} />
      </Container>
    </>
  );
};

export default SwitchLanguage;
