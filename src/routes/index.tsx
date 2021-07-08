import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import React from "react";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const Routes = () => {
  const { signed, loadingData } = useAuth();

  if (loadingData) return <AppLoading />;

  return (
    <NavigationContainer>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
