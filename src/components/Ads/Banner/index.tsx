import React, { useState, useEffect } from 'react';
import { AdMobBanner } from "expo-ads-admob"
import { BannerContainer, Container, RemoveBanner, RemoveBannerText } from './styles';
import { Platform, Dimensions } from 'react-native';
import { Feather } from "@expo/vector-icons"
import config from '../../../config';

type BannerProps = {
  isPremium?: boolean
  size?: 'banner' | 'largeBanner' | 'mediumRectangle' | 'fullBanner' | 'leaderboard' | 'smartBannerPortrait' | 'smartBannerLandscape';
}

const Banner = ({ isPremium = false, size = "banner" }: BannerProps) => {
  const adUnitTestID = config.ADS.TEST_ADS_IDS.BANNER
  const adUnitProdID = Platform.select({
    android: config.ADS.PROD_ADS_IDS.android.BANNER,
    ios: config.ADS.PROD_ADS_IDS.ios.BANNER,
  })
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID

  if (isPremium) return <></>


  return (
    <Container>
      <RemoveBanner>
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
  )
}

export default Banner;