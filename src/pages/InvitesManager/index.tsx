import React from "react";
import Header from "../../components/Header";
import {
  Container,
  PresentationContainer,
  PresentationTitle,
  PresentationSubtitle,
} from "./styles";

const InvitesManager: React.FC = () => {
  return (
    <>
      <Header title="Convites e solicitações" />
      <Container>
        <PresentationContainer>
          <PresentationTitle>Convites e solicitações</PresentationTitle>
          <PresentationSubtitle>
            Gerencie seus convites e solicitações de amizade que você recebeu.
          </PresentationSubtitle>
        </PresentationContainer>
      </Container>
    </>
  );
};

export default InvitesManager;
