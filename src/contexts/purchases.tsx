import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";

import {
  initConnection,
  endConnection,
  Subscription,
  ProductSubscription,
  useIAP,
  ErrorCode,
} from "react-native-iap";
import configs from "@config";
import api from "@services/api";
import { useAuth } from "./auth";
import { PaymentState } from "@type/enums";
import { UserData } from "@type/interfaces";
import { SubscriptionPeriod } from "react-native-iap";

interface PurchasesContextProps {
  handleBuySubscription: (
    sku: string,
    offerToken: string,
    period: PlanPeriods,
  ) => any;
  handleGetUserSubscription: () => Promise<void>;
  clearStates: () => any;
  subscriptions: ProductSubscription[];
  buySubFinished: boolean;
  purchaseSuccess: boolean;
  purchaseError: boolean;
  loadingPurchase: boolean; 
  currentPlanSelected: PlanPeriods | undefined;
  userSubscription: UserSubscription | null;
}

const PurchasesContext = createContext<PurchasesContextProps>(
  {} as PurchasesContextProps,
);

type PlanPeriods = "MONTHLY" | "QUARTERLY" | "YEARLY";

export interface UserSubscription {
  id: string;
  auto_renewing: boolean;
  cancel_reason: number;
  expiry_in: number;
  hasSubscription: boolean;
  isActive: boolean;
  isPaused: boolean;
  package_name: string;
  payment_state: PaymentState;
  purchase_token: string;
  purchase_type: number;
  resume_in: number | null;
  started_at: number;
  subscription_id: string;
  subscription_period: SubscriptionPeriod;
  user: UserData;
  user_id: string;
}

const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [buySubFinished, setBuySubFinished] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);
  const [currentPlanSelected, setCurrentPlanSelected] = useState<PlanPeriods>();
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);

  const { signed } = useAuth();
  const {
    subscriptions,
    finishTransaction,
    getActiveSubscriptions,
    requestPurchase,
    fetchProducts,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      try {
        if (purchase?.productId) {
          await finishTransaction({
            purchase: purchase,
            isConsumable: false,
          });

          await api
            .post("/subscriptions", {
              purchase_token: purchase.purchaseToken,
              product_id: purchase.productId,
              package_name: "com.flowapps.saturnchat",
              period: currentPlanSelected,
            })
            .then((res) => {
              setUserSubscription({
                ...res.data,
                hasSubscription: true,
                isPaused: !!res.data.resume_in,
                isActive: true,
              });
              setPurchaseSuccess(true);
              setPurchaseError(false);
              setBuySubFinished(true);
              setLoadingPurchase(false);
            })
            .catch((error) => {
              console.log(error);
              setPurchaseError(true);
              setPurchaseSuccess(false);
              setBuySubFinished(true);
              setLoadingPurchase(false);
            });
        }
      } catch (error) {
        if (error) {
          console.log({ message: `[${error}]`, error });
        } else {
          console.log({ message: "handleBuyProduct", error });
        }
        setPurchaseError(true);
        setPurchaseSuccess(false);
        setBuySubFinished(true);
        setLoadingPurchase(false);
      }
    },
    onPurchaseError: (error) => {
      if (error.code !== ErrorCode.UserCancelled) {
        console.log({ message: `[${error.code}]: ${error.message}`, error });
      }
      setPurchaseError(true);
      setPurchaseSuccess(false);
      setBuySubFinished(true);
      setLoadingPurchase(false);
    },
  });

  const fetchSubscriptions = async () => {
    await fetchProducts({
      type: "subs",
      skus: configs.PRODUCT_SKUS as string[],
    });
  };

  const handleBuySubscription = async (
    sku: string,
    offerToken: string,
    period: PlanPeriods,
  ) => {
    try {
      setLoadingPurchase(true);
      setCurrentPlanSelected(period);
      await requestPurchase({
        type: "subs",
        request: {
          google: {
            skus: configs.PRODUCT_SKUS as string[],
            ...(offerToken && {
              subscriptionOffers: [{ sku, offerToken }],
            }),
          },
        },
      });
    } catch (error) {
      if (error) {
        console.log({ message: `[${error}]`, error });
      } else {
        console.log({ message: "handleBuySubscription", error });
      }
      setLoadingPurchase(false);
    }
  };

  const clearStates = () => {
    setBuySubFinished(false);
    setPurchaseError(false);
    setPurchaseSuccess(false);
    setLoadingPurchase(false);
    setCurrentPlanSelected(undefined);
  };

  const handleGetUserSubscription = async () => {
    await api
      .get("/subscriptions")
      .then((res) => {
        setUserSubscription(res.data);
      })
      .catch((error) => console.log("Erro ao buscar Subscription", error));
  };

  useEffect(() => {
    const init = async () => {
      try {
        await initConnection()
          .then(async (connected) => {
            if (connected) {
              await fetchSubscriptions();
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.error("Erro ao conectar na Play Store", error);
      }
    };

    if (Device.isDevice) init();

    return () => {
      endConnection();
    };
  }, []);

  useEffect(() => {
    if (!signed) return;

    (async () => {
      await handleGetUserSubscription();
    })();
  }, [signed]);

  return (
    <PurchasesContext.Provider
      value={{
        handleBuySubscription,
        handleGetUserSubscription,
        clearStates,
        currentPlanSelected,
        loadingPurchase,
        subscriptions,
        buySubFinished,
        purchaseSuccess,
        purchaseError,
        userSubscription,
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
