import React from 'react';
import { AdMobBanner } from "expo-ads-admob"
import { BannerContainer, Container, RemoveBanner, RemoveBannerText } from './styles';
import { Platform, Dimensions } from 'react-native';
import { Feather } from "@expo/vector-icons"
import config from '../../../config';
import { useState } from 'react';
import { useEffect } from 'react';

type BannerProps = {
  isPremium?: boolean
}

const Banner = ({ isPremium = false }: BannerProps) => {

  const [portrait, setPortrait] = useState(false)

  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER
  const adUnitProdID = Platform.select({
    android: config.ADS.PROD_ADS_IDS.android.BANNER,
    ios: config.ADS.PROD_ADS_IDS.ios.BANNER,
  })
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID

  useEffect(() => {
    Dimensions.addEventListener("change", ({ screen }) => {
      const width = screen.width
      const height = screen.height
      setPortrait(height > width)
    })
  })


  return (
    <Container premium={isPremium}>
      <RemoveBanner>
        <RemoveBannerText>
          <Feather name="info" /> Remover anúncios
        </RemoveBannerText>
      </RemoveBanner>
      <BannerContainer>
        <AdMobBanner 
          adUnitID={adUnitID}
          bannerSize={portrait ? "smartBannerPortrait" : "smartBannerLandscape"}
        />
      </BannerContainer>
    </Container>
  )
}

export default Banner;