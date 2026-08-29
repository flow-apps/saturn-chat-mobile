import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
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
  interstitial: InterstitialAd | undefined;
  isAdLoaded: boolean;
  showInterstitialAd: (onAdClosed?: () => void) => void;
}

const AdsContext = createContext<ADSContextProps>({} as ADSContextProps);

const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [unitID, setUnitID] = useState("");
  const [interstitial, setInterstitial] = useState<InterstitialAd>();
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    let unsubscribeLoaded: (() => void) | undefined;
    let unsubscribeClosed: (() => void) | undefined;
    let adInstance: InterstitialAd;

    const setupAds = async () => {
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
        adInstance = InterstitialAd.createForAdRequest(adUnitID);

        unsubscribeLoaded = adInstance.addAdEventListener(
          AdEventType.LOADED,
          () => {
            setIsAdLoaded(true);
          }
        );

        unsubscribeClosed = adInstance.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setIsAdLoaded(false);
            adInstance.load();
          }
        );

        adInstance.load();
        setInterstitial(adInstance);
      }
    };

    setupAds();

    return () => {
      if (unsubscribeLoaded) unsubscribeLoaded();
      if (unsubscribeClosed) unsubscribeClosed();
    };
  }, []);

  const showInterstitialAd = useCallback(
    (onAdClosed?: () => void) => {
      if (interstitial && isAdLoaded && !user?.isPremium) {
        const unsubscribe = interstitial.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            onAdClosed?.();
            unsubscribe();
          }
        );
        
        interstitial.show();
      } else {
        onAdClosed?.();
      }
    },
    [interstitial, isAdLoaded, user?.isPremium]
  );

  const contextValue = useMemo(
    () => ({
      unitID,
      interstitial,
      isAdLoaded,
      showInterstitialAd,
    }),
    [unitID, interstitial, isAdLoaded, showInterstitialAd]
  );

  return (
    <AdsContext.Provider value={contextValue}>
      {children}
    </AdsContext.Provider>
  );
};

const useAds = () => {
  return useContext(AdsContext);
};

export { AdsProvider, useAds };