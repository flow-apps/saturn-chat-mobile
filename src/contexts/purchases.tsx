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
  subscriptions: Subscription[];
}

const PurchasesContext = createContext<PurchasesContextProps>(
  {} as PurchasesContextProps
);

const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subFinished, setSubFinished] = useState(false);
  const {
    currentPurchase,
    subscriptions,
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
    }
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
            isConsumable: true,
          });

          // TODO: envia requisição ao servidor registrando assinatura

          setSubFinished(true);
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.log({ message: `[${error.code}]: ${error.message}`, error });
        } else {
          console.log({ message: "handleBuyProduct", error });
        }
      }
    };

    checkCurrentPurchase();
  }, [finishTransaction, currentPurchase]);

  return (
    <PurchasesContext.Provider value={{ handleBuySubscription, subscriptions }}>
      {children}
    </PurchasesContext.Provider>
  );
};

const usePurchases = () => {
  const purchasesContext = useContext(PurchasesContext);
  return purchasesContext;
};

export { PurchasesProvider, usePurchases };
