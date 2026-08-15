import React, { memo, useState, useEffect } from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import {
  BannerContainer,
  Container,
  RemoveBanner,
  RemoveBannerText,
} from "./styles";
import { Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import config from "@config";
import secrets from "@secrets";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import analytics from "@react-native-firebase/analytics";
import { useTranslate } from "@hooks/useTranslate";
import { usePremium } from "@contexts/premium";
import { AnimatePresence } from "moti";

type BannerProps = {
  isPremium?: boolean;
  rotate?: boolean;
  size?: BannerAdSize;
};

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const Banner = ({ rotate, size = BannerAdSize.BANNER }: BannerProps) => {
  const { name } = useRoute();

  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER;
  const adUnitProdID = Platform.select({
    android: secrets.AdsID.productionKeys.banner.android,
    ios: secrets.AdsID.productionKeys.banner.ios,
  });
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { isPremium } = usePremium();

  const { t } = useTranslate("Components.Ads");

  const [retryCount, setRetryCount] = useState(0);
  const [retryKey, setRetryKey] = useState(0);

  const handleGoPremium = async () => {
    navigation.navigate("PurchasePremium");
    await analytics().logEvent("RemoveBannerAD", {
      requested_in: name,
    });
  };

  const handleAdFailedToLoad = (error: any) => {
    console.log("Erro ao carregar AD: ", error);
    if (retryCount < MAX_RETRIES) {
      console.log(
        `Tentando recarregar o anúncio... Tentativa ${retryCount + 1}`,
      );
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        setRetryKey((prev) => prev + 1);
      }, RETRY_DELAY);
    } else {
      console.log(
        "Número máximo de tentativas de carregamento de anúncio atingido.",
      );
    }
  };

  if (isPremium) return <></>;

  return (
    <AnimatePresence>
      <Container
        from={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "timing",
          duration: 1200,
        }}
        style={{
          transform: [
            {
              rotate: rotate ? "180deg" : "0deg",
            },
          ],
        }}
      >
        <RemoveBanner onPress={handleGoPremium}>
          <RemoveBannerText>
            <Feather name="info" /> {t("remove_ad")}
          </RemoveBannerText>
        </RemoveBanner>
        <BannerContainer>
          {adUnitID && (
            <BannerAd
              key={retryKey}
              unitId={adUnitID}
              size={size}
              onAdFailedToLoad={handleAdFailedToLoad}
            />
          )}
        </BannerContainer>
      </Container>
    </AnimatePresence>
  );
};

export default memo(Banner, (prev, next) => {
  return prev.isPremium === next.isPremium;
});
