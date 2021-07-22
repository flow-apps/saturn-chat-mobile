import React, { createContext, useState, useEffect, useContext } from "react"
import { Alert, Platform } from "react-native"
import * as Ads from "expo-ads-admob"
import Constants from "expo-constants"
import config from "../config"

interface ADSContextProps {
  unitID: string
}

const AdsContext = createContext<ADSContextProps>({} as ADSContextProps)

const AdsProvider: React.FC = ({ children }) => {

  const [unitID, setUnitID] = useState("")

  useEffect(() => {
    (async () => {
      const isAvailable = await Ads.isAvailableAsync()

      if (!isAvailable) return 

      await Ads.setTestDeviceIDAsync("0e0abd67-09ac-4d13-b2d5-a0acffd3ca79")

      const testID = "google-test-id"
      const productionID = Platform.select({
        android: config.ADS.PRODUCTIONS_UNIT_IDS.android,
        ios: config.ADS.PRODUCTIONS_UNIT_IDS.ios
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

  return (
    <AdsContext.Provider value={{
      unitID
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
