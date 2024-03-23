import React from "react";
import Header from "../../../components/Header";
import { Container, Content, Title } from "./styles";
import { useTranslate } from "../../../hooks/useTranslate";

const SwitchLanguage: React.FC = () => {
  const { t } = useTranslate("SwitchLanguage");

  return (
    <>
      <Header title="Idiomas" />
      <Container>
        <Title>{t("title")}</Title>
        <Content>{t("subtitle")}</Content>
      </Container>
    </>
  );
};

export default SwitchLanguage;
