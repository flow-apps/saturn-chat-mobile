import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { navigationRef } from "./rootNavigation";

const Routes = () => {
  const { signed, loadingData } = useAuth();

  if (loadingData) return <AppLoading />;

  return (
    <NavigationContainer ref={navigationRef}>
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
