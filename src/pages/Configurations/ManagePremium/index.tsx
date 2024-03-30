import React, { useState } from "react";

import {
  Container,
  ManagePremiumCancelPlanContainer,
  ManagePremiumCardContainer,
  ManagePremiumCardPeriod,
  ManagePremiumCardPeriodContainer,
  ManagePremiumCardPeriodLabel,
  ManagePremiumInfoLabel,
  ManagePremiumInfoText,
  ManagePremiumInfoWrapper,
  ManagePremiumInfosContainer,
  ManagePremiumSubtitle,
  ManagePremiumTitle,
} from "./styles";
import Header from "@components/Header";
import Button from "@components/Button";
import { useTheme } from "styled-components";
import Alert from "@components/Alert";

const ManagePremium: React.FC = () => {
  const { colors } = useTheme();
  const [cancelPlanAlert, setCancelPlanAlert] = useState(false);

  return (
    <>
      <Header title="Gerenciar plano Star" />
      <Alert
        visible={cancelPlanAlert}
        title="❗ Tem certeza disso?"
        content="Ao cancelar sua assinatura você perde TODOS os beneficios concedidos pelo plano. Além disso, você NÃO RECEBERÁ O REEMBOLSO DO MÊS JÁ PAGO (mas poderá utilizar os benefícios até a data de renovação)."
        okButtonText="Manter plano"
        cancelButtonText="Cancelar plano"
        cancelButtonAction={() => {}}
        okButtonAction={() => setCancelPlanAlert(false)}
      />
      <Container>
        <ManagePremiumTitle>Gerencie seu plano Star</ManagePremiumTitle>
        <ManagePremiumSubtitle>
          Aqui você vê detalhes sobre seu plano como a data de renovação do
          plano, o status de pagamento. Você também pode cancelar sua assinatura
          a qualquer momento por aqui.
        </ManagePremiumSubtitle>
        <ManagePremiumCardContainer>
          <ManagePremiumCardPeriodContainer>
            <ManagePremiumCardPeriodLabel>
              Plano da assinatura:
            </ManagePremiumCardPeriodLabel>
            <ManagePremiumCardPeriod>Mensal</ManagePremiumCardPeriod>
          </ManagePremiumCardPeriodContainer>
          <ManagePremiumInfosContainer>
            <ManagePremiumInfoWrapper>
              <ManagePremiumInfoLabel>
                Status da assinatura
              </ManagePremiumInfoLabel>
              <ManagePremiumInfoText>Pago</ManagePremiumInfoText>
            </ManagePremiumInfoWrapper>
            <ManagePremiumInfoWrapper>
              <ManagePremiumInfoLabel>Data de aquisição</ManagePremiumInfoLabel>
              <ManagePremiumInfoText>09/12/2024</ManagePremiumInfoText>
            </ManagePremiumInfoWrapper>
            <ManagePremiumInfoWrapper>
              <ManagePremiumInfoLabel>Data de renovação</ManagePremiumInfoLabel>
              <ManagePremiumInfoText>09/01/2025</ManagePremiumInfoText>
            </ManagePremiumInfoWrapper>
          </ManagePremiumInfosContainer>
          <ManagePremiumCancelPlanContainer>
            <Button
              title="Cancelar assinatura"
              bgColor={colors.red}
              onPress={() => setCancelPlanAlert(true)}
            />
          </ManagePremiumCancelPlanContainer>
        </ManagePremiumCardContainer>
      </Container>
    </>
  );
};

export default ManagePremium;
