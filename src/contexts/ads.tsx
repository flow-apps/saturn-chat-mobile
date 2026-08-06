import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Platform } from "react-native";
import mobileAds, {
  AdEventType,
  InterstitialAd,
} from "react-native-google-mobile-ads";
import secrets from "../../secrets.json";
import config from "../config";
import { useAuth } from "./auth";

interface ADSContextProps {
  unitID: string;
  Interstitial: InterstitialAd | undefined;
  showInterstitialAd: (onAdClosed?: () => void) => void;
}

const AdsContext = createContext<ADSContextProps>({} as ADSContextProps);

const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [unitID, setUnitID] = useState("");
  const [Interstitial, setInterstitial] = useState<InterstitialAd>();

  useEffect(() => {
    (async () => {
      await mobileAds().setRequestConfiguration({
        testDeviceIdentifiers: __DEV__ ? [secrets.AdsID.deviceTestID] : [],
      });

      await mobileAds().initialize();

      const adUnitTestID = config.ADS.TEST_ADS_IDS.INTERSTITIAL;
      const adUnitProdID = Platform.select({
        android: secrets.AdsID.productionKeys.interstitial.android,
        ios: secrets.AdsID.productionKeys.interstitial.ios,
      });
      const adUnitID = __DEV__ ? adUnitTestID : adUnitProdID;

      if (adUnitID) {
        setUnitID(adUnitID);
        const interstitial = InterstitialAd.createForAdRequest(adUnitID);

        const closeListener = interstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            // Recarrega o anúncio para a próxima vez
            interstitial.load();
          }
        );

        interstitial.load();
        setInterstitial(interstitial);

        return () => {
          closeListener();
          interstitial.removeAllListeners();
        };
      }
    })();
  }, []);

  const showInterstitialAd = useCallback(
    (onAdClosed?: () => void) => {
      if (Interstitial?.loaded && !user?.isPremium) {
        const unsubscribe = Interstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            onAdClosed?.();
            unsubscribe();
          }
        );
        Interstitial.show();
      } else {
        onAdClosed?.();
      }
    },
    [Interstitial, user]
  );

  return (
    <AdsContext.Provider
      value={{
        unitID,
        Interstitial,
        showInterstitialAd,
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
