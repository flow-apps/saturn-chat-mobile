import React from "react";
import Header from "../../../components/Header";
import { Container, Content, Title } from "./styles";

const SwitchLanguage: React.FC = () => {
  return (
    <>
      <Header title="Idiomas"  />
      <Container>
        <Title>Entenda como funciona os idiomas</Title>
        <Content>
          O idioma do aplicativo é definido através do idioma padrão do
          dispositivo.{"\n\n"}Para trocar o idioma, basta entrar nas
          configurações do dispositivo e alterar o idioma, que o aplicativo
          trocará o idioma automaticamente.
        </Content>
      </Container>
    </>
  );
};

export default SwitchLanguage;
