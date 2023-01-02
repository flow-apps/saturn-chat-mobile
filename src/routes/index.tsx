import React, { useRef } from "react";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/auth";
import AppRoutes from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { navigationRef } from "./rootNavigation";
import { useFirebase } from "../contexts/firebase";
import Loading from "../components/Loading";
import config from "../config";
import * as Linking from "expo-linking";

const Routes = () => {
  const { analytics } = useFirebase();
  const { signed, loadingData } = useAuth();

  const linking: LinkingOptions<{}> = {
    prefixes: [config.WEBSITE_URL, "saturnchat://", Linking.createURL("/")],
    config: {
      screens: {
        Invite: "invite/:inviteID",
        [signed ? "Groups" : "OnBoarding"]: "*",
      },
      initialRouteName: (signed ? "Groups" : "OnBoarding") as never,
    },
  };

  const routeNameRef = useRef<string>("");

  if (loadingData) {
    return <Loading />;
  }

  return (
    <NavigationContainer
      linking={linking}
      fallback={<Loading />}
      onReady={() => {
        if (navigationRef.current && routeNameRef.current) {
          routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
        }
      }}
      onStateChange={async () => {
        if (!navigationRef.current || !routeNameRef.current) return;

        const previousRouteName = navigationRef.current.getCurrentRoute().name;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logEvent("screen_view", { currentRouteName });
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
