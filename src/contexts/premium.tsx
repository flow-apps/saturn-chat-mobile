import api from "@services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePurchases } from "./purchases";
import { useAuth } from "./auth";
import { DateUtils } from "@utils/date";

interface PremiumContextProps {
  isPremium: boolean;
}

const PremiumContext = createContext<PremiumContextProps>(
  {} as PremiumContextProps
);

const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { purchaseSuccess } = usePurchases();
  const { signed } = useAuth();
  const dateUtils = new DateUtils();

  const [isPremium, setIsPremium] = useState(false);

  const handleGetPremium = async () => {
    const res = await api
      .get("/subscriptions/validate")
      .then((res) => res.data)
      .catch((error) => console.log(error));

    console.log(res);

    setIsPremium(res.isActive);
  };

  useEffect(() => {
    if (!signed) return;

    const interval = setInterval(async () => {
      await handleGetPremium();
    }, dateUtils.convertToMillis(30, "SECONDS"));
    
    handleGetPremium();

    return () => {
      clearInterval(interval);
    };
  }, [signed]);

  useEffect(() => {
    if (purchaseSuccess) {
      handleGetPremium();
    }
  }, [purchaseSuccess]);

  return (
    <PremiumContext.Provider value={{ isPremium }}>
      {children}
    </PremiumContext.Provider>
  );
};

const usePremium = () => {
  const premiumContext = useContext(PremiumContext);
  return premiumContext;
};

export { PremiumProvider, usePremium };
