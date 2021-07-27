import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeRoutes } from "./tabRoutes/home.routes";
import UserProfile from "../pages/UserProfile";
import GroupConfig from "../pages/GroupConfig";
import Search from "../pages/Search";
import GroupInfos from "../pages/GroupInfos";
import Chat from "../pages/Chat";
import Participants from "../pages/Participants";
import ImagePreview from "../pages/ImagePreview";
import InviteUsers from "../pages/GroupConfig/InviteUsers";
import NewInvites from "../pages/GroupConfig/InviteUsers/NewInvites";
import EditGroup from "../pages/GroupConfig/EditGroup";
import EditProfile from "../pages/Configurations/EditProfile";
import SwitchLanguage from "../pages/Configurations/SwitchLanguage";
import Premium from "../pages/Configurations/Premium";
import ChoosePlan from "../pages/Configurations/Premium/ChoosePlan";

const StackRoutes = createStackNavigator();

const AppRoutes = () => {
  return (
    <StackRoutes.Navigator headerMode="none">
      <StackRoutes.Screen name="Groups" component={HomeRoutes} />
      <StackRoutes.Screen name="PurchasePremium" component={Premium} />
      <StackRoutes.Screen name="ChoosePlan" component={ChoosePlan} />
      <StackRoutes.Screen name="EditProfile" component={EditProfile} />
      <StackRoutes.Screen name="SwitchLanguage" component={SwitchLanguage} />
      <StackRoutes.Screen name="Chat" component={Chat} />
      <StackRoutes.Screen name="Participants" component={Participants} />
      <StackRoutes.Screen name="UserProfile" component={UserProfile} />
      <StackRoutes.Screen name="Search" component={Search} />
      <StackRoutes.Screen name="GroupConfig" component={GroupConfig} />
      <StackRoutes.Screen name="EditGroup" component={EditGroup} />
      <StackRoutes.Screen name="InviteUsers" component={InviteUsers} />
      <StackRoutes.Screen name="NewInvites" component={NewInvites} />
      <StackRoutes.Screen name="GroupInfos" component={GroupInfos} />
      <StackRoutes.Screen name="ImagePreview" component={ImagePreview} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
