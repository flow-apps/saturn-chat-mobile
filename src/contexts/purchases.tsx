import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

import {
  initConnection,
  endConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  Subscription,
  PurchaseError,
  useIAP,
} from "react-native-iap";
import configs from "@config";

interface PurchasesContextProps {
  handleBuySubscription: (sku: string, offerToken: string) => any;
  clearStates: () => any;
  subscriptions: Subscription[];
  buySubFinished: boolean;
  purchaseSuccess: boolean;
  purchaseError: boolean;
  loadingPurchase: boolean;
}

const PurchasesContext = createContext<PurchasesContextProps>(
  {} as PurchasesContextProps
);

const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [buySubFinished, setBuySubFinished] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const {
    currentPurchase,
    subscriptions,
    currentPurchaseError,
    finishTransaction,
    getSubscriptions,
    requestSubscription,
  } = useIAP();

  const fetchSubscriptions = async () => {
    await getSubscriptions({
      skus: configs.PRODUCT_SKUS,
    });
  };

  const handleBuySubscription = async (sku: string, offerToken: string) => {
    try {
      setLoadingPurchase(true)
      await requestSubscription({
        sku,
        ...(offerToken && {
          subscriptionOffers: [{ sku, offerToken }],
        }),
      });
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({ message: `[${error.code}]: ${error.message}`, error });
      } else {
        console.log({ message: "handleBuySubscription", error });
      }
      setLoadingPurchase(false)
    }
  };

  const clearStates = () => {
    setBuySubFinished(false);
    setPurchaseError(false);
    setPurchaseSuccess(false);
    setLoadingPurchase(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await initConnection().then((connected) => {
          if (connected) fetchSubscriptions();
        });
        if (Platform.OS === "android") {
          flushFailedPurchasesCachedAsPendingAndroid();
        }
      } catch (error) {
        console.error("Erro ao conectar na Play Store", error.message);
      }
    };
    init();
    return () => {
      endConnection();
    };
  }, []);

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: false,
          });

          console.log(currentPurchase);

          // TODO: envia requisição ao servidor registrando assinatura

          setPurchaseSuccess(true);
          setPurchaseError(false);
          setBuySubFinished(true);
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.log({ message: `[${error.code}]: ${error.message}`, error });
        } else {
          console.log({ message: "handleBuyProduct", error });
        }
        setPurchaseError(true);
        setPurchaseSuccess(false);
        setBuySubFinished(true);
      } finally {
        setLoadingPurchase(false)
      }
    };

    checkCurrentPurchase();
  }, [finishTransaction, currentPurchase]);

  useEffect(() => {
    if (currentPurchaseError) {
      setPurchaseError(true);
      setPurchaseSuccess(false);
      setBuySubFinished(true);
      setLoadingPurchase(false)
    }
  }, [currentPurchaseError]);

  return (
    <PurchasesContext.Provider
      value={{
        handleBuySubscription,
        clearStates,
        loadingPurchase,
        subscriptions,
        buySubFinished,
        purchaseSuccess,
        purchaseError,
      }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};

const usePurchases = () => {
  const purchasesContext = useContext(PurchasesContext);
  return purchasesContext;
};

export { PurchasesProvider, usePurchases };
