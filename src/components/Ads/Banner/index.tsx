import React, { memo, useState } from "react";
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

const Banner = ({ rotate, size = BannerAdSize.BANNER }: BannerProps) => {
  const { name } = useRoute();
  const [show, setShow] = useState(false);

  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER;
  const adUnitProdID = Platform.select({
    android: secrets.AdsID.productionKeys.banner.android,
    ios: secrets.AdsID.productionKeys.banner.ios,
  });
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;

  const navigation = useNavigation<StackNavigationProp<any>>();

  const { isPremium } = usePremium();

  const { t } = useTranslate("Components.Ads");

  const handleGoPremium = async () => {
    navigation.navigate("PurchasePremium");
    await analytics().logEvent("RemoveBannerAD", {
      requested_in: name,
    });
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
          <BannerAd
            unitId={adUnitID}
            size={size}
            onAdOpened={() => setShow(true)}
            onAdFailedToLoad={(error) => {
              console.log("Erro ao carregar AD: ", error);
            }}
          />
        </BannerContainer>
      </Container>
    </AnimatePresence>
  );
};

export default memo(Banner, (prev, next) => {
  return prev.isPremium === next.isPremium;
});
