import React from "react";
import { AdMobBanner } from "expo-ads-admob";
import {
  BannerContainer,
  Container,
  RemoveBanner,
  RemoveBannerText,
} from "./styles";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import config from "../../../config";
import secrets from "../../../secrets.json";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFirebase } from "../../../contexts/firebase";

type BannerProps = {
  isPremium?: boolean;
  size?:
    | "banner"
    | "largeBanner"
    | "mediumRectangle"
    | "fullBanner"
    | "leaderboard"
    | "smartBannerPortrait"
    | "smartBannerLandscape";
};

const Banner = ({ isPremium = false, size = "banner" }: BannerProps) => {
  const { analytics } = useFirebase()
  const { name } = useRoute()
  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER;
  const adUnitProdID = Platform.select({
    android: secrets.AdsID.productionKeys.banner.android,
    ios: secrets.AdsID.productionKeys.banner.ios,
  });
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;

  const navigation = useNavigation()
  const handleGoPremium = async () => {
    await analytics.logEvent("RemoveBannerAD", {
      requested_in: name
    })
    navigation.navigate("PurchasePremium")
  }

  if (isPremium) return <></>;

  return (
    <Container>
      <RemoveBanner onPress={handleGoPremium}>
        <RemoveBannerText>
          <Feather name="info" /> Remover anúncio
        </RemoveBannerText>
      </RemoveBanner>
      <BannerContainer>
        <AdMobBanner
          adUnitID={adUnitID}
          bannerSize={size}
          servePersonalizedAds
        />
      </BannerContainer>
    </Container>
  );
};

export default Banner;
