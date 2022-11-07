import React, { createContext, useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import mobileAds, {
  AdEventType,
  InterstitialAd,
} from "react-native-google-mobile-ads";
import secrets from "../secrets.json";
import config from "../config";

interface ADSContextProps {
  unitID: string;
  Interstitial: InterstitialAd;
}

const AdsContext = createContext<ADSContextProps>({} as ADSContextProps);

const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unitID, setUnitID] = useState("");
  const [Interstitial, setInterstitial] = useState<InterstitialAd>();

  useEffect(() => {
    (async () => {
      await mobileAds().setRequestConfiguration({
        testDeviceIdentifiers: __DEV__
          ? [secrets.AdsID.deviceTestID]
          : undefined,
      });

      await mobileAds().initialize();

      const testID = "google-test-id";
      const productionID = Platform.select({
        android: secrets.AdsAppID.android,
        ios: secrets.AdsAppID.ios,
      });
      const adUnitID = __DEV__ ? testID : productionID;
      setUnitID(adUnitID);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const adUnitTestID = config.ADS.TEST_ADS_IDS.INTERSTITIAL;
      const adUnitProdID = Platform.select({
        android: secrets.AdsID.productionKeys.interstitial.android,
        ios: secrets.AdsID.productionKeys.interstitial.ios,
      });
      const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;
      const interstitial = InterstitialAd.createForAdRequest(adUnitID);

      interstitial.addAdEventListener(AdEventType.CLOSED, async () => {
        interstitial.load();
      });
      interstitial.load();

      setInterstitial(interstitial);
    })();

    return () => {
      Interstitial.removeAllListeners()
    }
  }, []);

  return (
    <AdsContext.Provider
      value={{
        unitID,
        Interstitial,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
};

const useAds = () => {
  const adsContext = useContext(AdsContext);
  return adsContext;
};

export { AdsProvider, useAds };
