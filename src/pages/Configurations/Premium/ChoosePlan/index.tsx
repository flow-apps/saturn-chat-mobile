import React, { useMemo } from "react";
import Header from "@components/Header";
import { useTheme } from "styled-components";
import {
  Animation,
  AnimationContainer,
  AnimationTitle,
  BuyFinishedAnimation,
  BuyFinishedContainer,
  BuyFinishedSubtitle,
  BuyFinishedTitle,
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
import { useTranslate } from "@hooks/useTranslate";
import { usePurchases } from "@contexts/purchases";
import Button from "@components/Button";
import { navigate } from "@routes/rootNavigation";
import Loading from "@components/Loading";
import { SubscriptionPlatform } from "react-native-iap";

const ChoosePlan: React.FC = () => {
  const { colors } = useTheme();
  const {
    subscriptions,
    handleBuySubscription,
    buySubFinished,
    purchaseSuccess,
    purchaseError,
    clearStates,
    loadingPurchase,
  } = usePurchases();
  const { t } = useTranslate("ChoosePlan");

  const planTokens = useMemo(() => {
    let tokens = {};    

    subscriptions.map((sub) => {
      if (sub.platform === SubscriptionPlatform.android) {
        sub.subscriptionOfferDetails.map((offer) => {
          tokens[offer.offerTags[0]] = offer.offerToken;
        });
      }
    });

    return tokens as { [key: string]: string };
  }, [subscriptions]);

  if (loadingPurchase) {
    return <Loading />;
  }

  if (buySubFinished) {
    return (
      <BuyFinishedContainer>
        {purchaseSuccess && (
          <BuyFinishedAnimation
            source={require("@assets/purchase-success.json")}
            loop={false}
            autoPlay
          />
        )}
        {purchaseError && (
          <BuyFinishedAnimation
            source={require("@assets/purchase-error.json")}
            loop={false}
            autoPlay
          />
        )}

        <BuyFinishedTitle>
          {purchaseSuccess && "Assinatura realizada com sucesso!"}
          {purchaseError && "Não foi possível realizar sua assinatura"}
        </BuyFinishedTitle>
        <BuyFinishedSubtitle>
          {purchaseSuccess &&
            "Você agora pode usufruir de vários benefícios disponíveis no plano Star! Mas atenção, pode demorar alguns minutos até que todos os benefícios sejam totalmente liberados, então não se preocupe."}
          {purchaseError &&
            "Seu pagamento pode ter sido negado ou sua compra cancelada pela loja de aplicativos. Verifique e tente novamente mais tarde"}
        </BuyFinishedSubtitle>
        <Button
          title="Avançar"
          style={{ marginTop: 25 }}
          onPress={() => {
            clearStates();
            navigate("Groups");
          }}
        />
      </BuyFinishedContainer>
    );
  }

  return (
    <>
      <Header title={t("header_title")} />
      <Container>
        <AnimationContainer>
          <Animation
            source={require("@assets/calendar.json")}
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
            <PlanBuyButton
              onPress={() =>
                handleBuySubscription(
                  "star_plan",
                  planTokens.monthly,
                  "MONTHLY"
                )
              }
            >
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
            <PlanBuyButton
              onPress={() =>
                handleBuySubscription(
                  "star_plan",
                  planTokens.quarterly,
                  "QUARTERLY"
                )
              }
            >
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
            <PlanBuyButton
              onPress={() =>
                handleBuySubscription("star_plan", planTokens.yearly, "YEARLY")
              }
            >
              <PlanBuyButtonText>{t("button_text")}</PlanBuyButtonText>
            </PlanBuyButton>
          </PlanContainer>
        </PlansContainer>
      </Container>
    </>
  );
};

export default ChoosePlan;
