import React from "react";
import Header from "@components/Header";
import { useTheme } from "styled-components";
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
import { useTranslate } from "../../../../hooks/useTranslate";

const ChoosePlan: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslate("ChoosePlan");

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <AnimationContainer>
          <Animation
            source={require("../../../../assets/calendar.json")}
            speed={0.75}
            loop={false}
            autoPlay
          />
          <AnimationTitle>{t("title")}</AnimationTitle>
        </AnimationContainer>
        <DescriptionWrapper>
          <Description>{t("subtitle")}</Description>
        </DescriptionWrapper>
        <PlansContainer>
          <PlanContainer>
            <PlanTitle>{t("monthly")}</PlanTitle>
            <PlanPriceContainer>
              <PlanPrice>R$ 19,99</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>{t("button_text")}</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
          <PlanContainer
            //@ts-ignore
            colors={[colors.shape, colors.background]}
            planColor={colors.primary}
          >
            <PlanTitle planColor={colors.primary}>{t("quarterly")}</PlanTitle>
            <PlanPriceContainer>
              <PlanPrice planColor={colors.primary}>R$ 59,99</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>{t("button_text")}</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
          <PlanContainer
            //@ts-ignore
            colors={[colors.shape, colors.background]}
            planColor="#FF5E0D"
          >
            <PlanTitle planColor="#FF5E0D">{t("yearly")}</PlanTitle>
            <PlanPriceContainer>
              <PlanDiscountText> R$ 239,99 </PlanDiscountText>
              <PlanPrice planColor="#FF5E0D">R$ 219,99</PlanPrice>
            </PlanPriceContainer>
            <PlanBuyButton>
              <PlanBuyButtonText>{t("button_text")}</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
        </PlansContainer>
      </Container>
    </>
  );
};

export default ChoosePlan;
