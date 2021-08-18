import React, { useRef } from "react";
import * as Linking from "expo-linking"
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { navigationRef } from "./rootNavigation";
import { useFirebase } from "../contexts/firebase";
import Loading from "../components/Loading";
import config from "../config";


const Routes = () => {
  const { analytics } = useFirebase()
  const { signed, loadingData } = useAuth();

  const linking: LinkingOptions = {
    prefixes: [config.WEBSITE_URL, "saturnchat://"],
    config: {
      screens: {
        Invite: "invite/:inviteID",
        [signed ? "Groups" : "OnBoarding"]: "*"
      },
      initialRouteName: signed ? "Groups" : "OnBoarding",
    },
  }
  
  const routeNameRef = useRef<string>()

  if (loadingData) return <AppLoading />;

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Loading />}
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
