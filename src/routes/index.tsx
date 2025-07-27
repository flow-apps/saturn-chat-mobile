import React, { useRef } from "react";
import AppRoutes from "@routes/app.routes";
import {
  LinkingOptions,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import { useAuth } from "@contexts/auth";
import { AuthRoutes } from "@routes/auth.routes";
import { navigationRef } from "./rootNavigation";
import Loading from "@components/Loading";
import config from "@config";
import * as Linking from "expo-linking";

import analytics from "@react-native-firebase/analytics";
import { useTheme } from "styled-components";

const Routes = () => {
  const { signed, loadingData } = useAuth();
  const { title, colors } = useTheme();

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
      theme={
        title === "dark"
          ? {
              ...DarkTheme,
              colors: { ...DarkTheme.colors, background: colors.background },
            }
          : undefined
      }
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
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
