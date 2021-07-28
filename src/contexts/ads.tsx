import React, { createContext, useState, useEffect, useContext } from "react"
import { Alert, Platform } from "react-native"
import * as Ads from "expo-ads-admob"
import Constants from "expo-constants"
import secrets from "../secrets.json"
import config from "../config"

interface ADSContextProps {
  unitID: string;
  Interstitial: typeof Ads.AdMobInterstitial;
}

const AdsContext = createContext<ADSContextProps>({} as ADSContextProps)

const AdsProvider: React.FC = ({ children }) => {

  const [unitID, setUnitID] = useState("")
  const [Interstitial, setInterstitial] = useState<typeof Ads.AdMobInterstitial>
    (Ads.AdMobInterstitial)

  useEffect(() => {
    (async () => {
      const isAvailable = await Ads.isAvailableAsync()

      if (!isAvailable) return 
      if (__DEV__) await Ads.setTestDeviceIDAsync(secrets.AdsID.deviceTestID)

      const testID = "google-test-id"
      const productionID = Platform.select({
        android: secrets.AdsAppID.android,
        ios: secrets.AdsAppID.ios
      })
      const adUnitID = Constants.isDevice && __DEV__ ? testID : productionID
      if (adUnitID) setUnitID(adUnitID)

      const status = await Ads.getPermissionsAsync()
      if (!status.granted) {
        Alert.alert("Preciso de permissão para fazer a veiculação de anúncios, que ajudam a manter esse app incrível!")
        const { granted } = await Ads.requestPermissionsAsync()

        if (granted) return
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const interstitial = Ads.AdMobInterstitial
      const adUnitTestID = config.ADS.TEST_ADS_IDS.INTERSTITIAL
      const adUnitProdID = Platform.select({
        android: secrets.AdsID.productionKeys.interstitial.android,
        ios: secrets.AdsID.productionKeys.interstitial.ios,
      })
      const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID

      if (!adUnitID) {
        return
      }
      
      await interstitial.setAdUnitID(adUnitID)
      await interstitial.requestAdAsync()

      interstitial.addEventListener("interstitialDidClose", async () => {
        await interstitial.requestAdAsync()
      })
      interstitial.addEventListener("interstitialWillLeaveApplication",
      interstitial.dismissAdAsync
    )

      setInterstitial(interstitial)
    })()
  }, [])

  return (
    <AdsContext.Provider value={{
      unitID,
      Interstitial
    }}>
      { children }
    </AdsContext.Provider>
  )
}

const useAds = () => {
  const adsContext = useContext(AdsContext)

  return adsContext
}

export { AdsProvider, useAds }
