import React from "react";

import { Container, Subtitle, Title } from "./styles";
import Header from "@components/Header";
import { useRoute } from "@react-navigation/native";

const Report: React.FC = () => {
  const { params } = useRoute();
  const { type, group_id, message_id, user_id } = params as any;

  return (
    <>
      <Header title="Denunciar" />
      <Container>
        <Title>Faça sua denúncia</Title>
        <Subtitle>
          Encontrou algo que não parece certo? Realize sua denúncia
          para que nós possamos analisar a situação e tomar as medidas cabíveis. Não
          se preocupe, sua denúncia é totalmente anônima.
        </Subtitle>
      </Container>
    </>
  );
};

export default Report;
