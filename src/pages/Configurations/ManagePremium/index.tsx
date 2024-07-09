import React, { useEffect, useState } from "react";

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
import { usePurchases } from "@contexts/purchases";
import { DateUtils } from "@utils/date";
import { PaymentState } from "@type/enums";
import { useTranslate } from "@hooks/useTranslate";
import Loading from "@components/Loading";

const ManagePremium: React.FC = () => {
  const [cancelPlanAlert, setCancelPlanAlert] = useState(false);

  const dateUtils = new DateUtils();
  const { t } = useTranslate("ManagePremium");
  const { colors } = useTheme();
  const { userSubscription, handleGetUserSubscription } = usePurchases();

  const getPaymentStatus = () => {
    return t(`payments.${userSubscription?.payment_state}`);
  };

  useEffect(() => {
    handleGetUserSubscription();
  }, []);

  if (!userSubscription)
    return <Loading />

  return (
    <>
      <Header title={t("header_title")} />
      <Alert
        visible={cancelPlanAlert}
        title={t("alerts.cancel_plan.title")}
        content={t("alerts.cancel_plan.content")}
        okButtonText={t("alerts.cancel_plan.ok_text")}
        cancelButtonText={t("alerts.cancel_plan.cancel_text")}
        cancelButtonAction={() => {}}
        okButtonAction={() => setCancelPlanAlert(false)}
      />
      <Container>
        <ManagePremiumTitle>{t("title")}</ManagePremiumTitle>
        <ManagePremiumSubtitle>{t("subtitle")}</ManagePremiumSubtitle>
        <ManagePremiumCardContainer>
          <ManagePremiumCardPeriodContainer>
            <ManagePremiumCardPeriodLabel>
              {t("plan_labels.plan")}
            </ManagePremiumCardPeriodLabel>
            <ManagePremiumCardPeriod>
              {t(`periods.${userSubscription.subscription_period}`)}
            </ManagePremiumCardPeriod>
          </ManagePremiumCardPeriodContainer>
          <ManagePremiumInfosContainer>
            <ManagePremiumInfoWrapper>
              <ManagePremiumInfoLabel>
                {t("plan_labels.status")}
              </ManagePremiumInfoLabel>
              <ManagePremiumInfoText>
                {getPaymentStatus()}
              </ManagePremiumInfoText>
            </ManagePremiumInfoWrapper>
            <ManagePremiumInfoWrapper>
              <ManagePremiumInfoLabel>
                {t("plan_labels.start")}
              </ManagePremiumInfoLabel>
              <ManagePremiumInfoText>
                {dateUtils.formatToDate(userSubscription?.started_at, true)}
              </ManagePremiumInfoText>
            </ManagePremiumInfoWrapper>
            <ManagePremiumInfoWrapper>
              {!userSubscription.isPaused ? (
                <>
                  <ManagePremiumInfoLabel>
                    {t("plan_labels.expire")}
                  </ManagePremiumInfoLabel>
                  <ManagePremiumInfoText>
                    {dateUtils.formatToDate(userSubscription?.expiry_in, true)}
                  </ManagePremiumInfoText>
                </>
              ) : (
                <>
                  <ManagePremiumInfoLabel>
                    {t("plan_labels.resume")}
                  </ManagePremiumInfoLabel>
                  <ManagePremiumInfoText>
                    {dateUtils.formatToDate(userSubscription?.resume_in, true)}
                  </ManagePremiumInfoText>
                </>
              )}
            </ManagePremiumInfoWrapper>
          </ManagePremiumInfosContainer>
          <ManagePremiumCancelPlanContainer>
            <Button
              title={t("cancel_text")}
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
