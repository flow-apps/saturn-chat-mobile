import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatRoutes, HomeRoutes } from "./tabs.routes";
import MyProfile from "../pages/MyProfile";

const StackRoutes = createStackNavigator();

const AppRoutes = () => {
  return (
    <StackRoutes.Navigator headerMode="none">
      <StackRoutes.Screen name="Groups" component={HomeRoutes} />
      <StackRoutes.Screen name="Chat" component={ChatRoutes} />
      <StackRoutes.Screen name="MyProfile" component={MyProfile} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
