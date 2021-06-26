import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeRoutes } from "./tabRoutes/home.routes";
import UserProfile from "../pages/UserProfile";
import GroupConfig from "../pages/GroupConfig";
import Search from "../pages/Search";
import GroupInfos from "../pages/GroupInfos";
import Chat from "../pages/Chat";
import Participants from "../pages/Participants";

const StackRoutes = createStackNavigator();

const AppRoutes = () => {
  return (
    <StackRoutes.Navigator headerMode="none">
      <StackRoutes.Screen name="Groups" component={HomeRoutes} />
      <StackRoutes.Screen name="Chat" component={Chat} />
      <StackRoutes.Screen name="Participants" component={Participants} />
      <StackRoutes.Screen name="UserProfile" component={UserProfile} />
      <StackRoutes.Screen name="Search" component={Search} />
      <StackRoutes.Screen name="GroupConfig" component={GroupConfig} />
      <StackRoutes.Screen name="GroupInfos" component={GroupInfos} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
