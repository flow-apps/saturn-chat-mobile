import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { navigationRef } from "./rootNavigation";
import { useFirebase } from "../contexts/firebase";

const Routes = () => {
  const { analytics } = useFirebase()
  const { signed, loadingData } = useAuth();

  const routeNameRef = useRef<string>()

  if (loadingData) return <AppLoading />;

  return (
    <NavigationContainer 
      onReady={() => routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name}
      onStateChange={async () => {
        const previousRouteName = navigationRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          await analytics.setCurrentScreen(currentRouteName);
        }

        routeNameRef.current = currentRouteName;
      }}
      ref={navigationRef}
    >
      {signed ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
