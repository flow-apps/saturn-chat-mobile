import React from "react";
import Header from "../../../../components/Header";
import { useTheme } from "styled-components";
import Feather from "@expo/vector-icons/Feather";
import {
  Animation,
  AnimationContainer,
  AnimationTitle,
  Container,
  Description,
  DescriptionWrapper,
  PlanBuyButton,
  PlanBuyButtonText,
  PlanContainer,
  PlanDiscountText,
  PlanPrice,
  PlanPriceContainer,
  PlansContainer,
  PlanTitle,
} from "./styles";

const ChoosePlan: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <Header title="Escolha seu plano"  />
      <Container>
        <AnimationContainer>
          <Animation
            source={require("../../../../assets/calendar.json")}
            speed={0.75}
            loop={false}
            autoPlay
          />
          <AnimationTitle>Estamos quase lá!</AnimationTitle>
        </AnimationContainer>
        <DescriptionWrapper>
          <Description>
            Agora você deve escolher qual plano você quer, podendo escolher
            entre os planos mensais, trimestrais ou anuais.{"\n\n"}Lembre-se, se for sua
            primeira assinatura você ganha 1 mês grátis!
          </Description>
        </DescriptionWrapper>
        <PlansContainer>
          <PlanContainer>
            <PlanTitle>Mensal</PlanTitle>
            <PlanPriceContainer>
              <PlanPrice>R$ 39,99</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>Eu quero esse!</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
          <PlanContainer
            colors={[colors.shape, colors.background]}
            planColor={colors.primary}
          >
            <PlanTitle planColor={colors.primary}>Trimestral</PlanTitle>
            <PlanPriceContainer>
              <PlanPrice planColor={colors.primary}>R$ 119,99</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>Eu quero esse!</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
          <PlanContainer
            colors={[colors.shape, colors.background]}
            planColor="#FF5E0D"
          >
            <PlanTitle planColor="#FF5E0D">Anual</PlanTitle>
            <PlanPriceContainer>
              <PlanDiscountText> R$ 479,88 </PlanDiscountText>
              <PlanPrice planColor="#FF5E0D">R$ 439,89</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>Eu quero esse!</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
        </PlansContainer>
      </Container>
    </>
  );
};

export default ChoosePlan;
