import React from "react";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
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
import { StackNavigationProp } from "@react-navigation/stack";

type BannerProps = {
  isPremium?: boolean;
  size?: BannerAdSize;
};

const Banner = ({ isPremium = false, size = BannerAdSize.BANNER }: BannerProps) => {
  const { analytics } = useFirebase()
  const { name } = useRoute()
  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER;
  const adUnitProdID = Platform.select({
    android: secrets.AdsID.productionKeys.banner.android,
    ios: secrets.AdsID.productionKeys.banner.ios,
  });
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;

  const navigation = useNavigation<StackNavigationProp<any>>();
  const handleGoPremium = async () => {
    await analytics().logEvent("RemoveBannerAD", {
      requested_in: name
    })
    navigation.navigate("PurchasePremium")
  }

  if (isPremium) return <></>;

  return (
    <Container
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1200
      }}
    >
      <RemoveBanner onPress={handleGoPremium}>
        <RemoveBannerText>
          <Feather name="info" /> Remover anúncio
        </RemoveBannerText>
      </RemoveBanner>
      <BannerContainer>
        <BannerAd
          unitId={adUnitID}
          size={size}
        />
      </BannerContainer>
    </Container>
  );
};

export default Banner;
