import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ChatRoutes, HomeRoutes } from "./tabs.routes";
import MyProfile from "../pages/MyProfile";
import GroupConfig from "../pages/GroupConfig";
import Search from "../pages/Search";

const StackRoutes = createStackNavigator();

const AppRoutes = () => {
  return (
    <StackRoutes.Navigator headerMode="none">
      <StackRoutes.Screen name="Groups" component={HomeRoutes} />
      <StackRoutes.Screen name="Chat" component={ChatRoutes} />
      <StackRoutes.Screen name="MyProfile" component={MyProfile} />
      <StackRoutes.Screen name="Search" component={Search} />
      <StackRoutes.Screen name="GroupConfig" component={GroupConfig} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
