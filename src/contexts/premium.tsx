import api from "@services/api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePurchases } from "./purchases";
import { useAuth } from "./auth";

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
  const [isPremium, setIsPremium] = useState(false);
  const { signed } = useAuth();

  const handleGetPremium = async () => {
    const res = await api
      .get("/subscriptions/validate")
      .then((res) => res.data)
      .catch((error) => console.log(error));

    console.log(res);
    

    setIsPremium(res.isActive);
  };

  useEffect(() => {
    if (signed)
      handleGetPremium();
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
