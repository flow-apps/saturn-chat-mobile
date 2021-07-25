import * as Ads from "expo-ads-admob"
import { Platform } from "react-native"
import config from "../config"

type showInterstitialProps = {
  onDismiss?: () => any
}

export const showInterstitial = async ({ onDismiss }: showInterstitialProps) => {
  const adUnitTestID = config.ADS.TEST_ADS_IDS.INTERSTITIAL
  const adUnitProdID = Platform.select({
    android: config.ADS.PROD_ADS_IDS.android.INTERSTITIAL,
    ios: config.ADS.PROD_ADS_IDS.ios.INTERSTITIAL,
  })
  const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID

  if (!adUnitID) {
    if (onDismiss) await onDismiss()
    return
  }

  if (onDismiss) {
    Ads.AdMobInterstitial.addEventListener("interstitialDidClose", async () => {
      await onDismiss()
      Ads.AdMobInterstitial.removeAllListeners()
    })
    Ads.AdMobInterstitial.addEventListener("interstitialDidFailToLoad", onDismiss)
    Ads.AdMobInterstitial.addEventListener("interstitialWillLeaveApplication",
      Ads.AdMobInterstitial.dismissAdAsync
    )
  }

  await Ads.AdMobInterstitial.setAdUnitID(adUnitID)
  await Ads.AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
      .then(Ads.AdMobInterstitial.showAdAsync)
}