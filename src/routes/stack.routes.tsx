import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./tabs.routes";

const StackRoutes = createStackNavigator();

const AppRoutes = () => {
  return (
    <StackRoutes.Navigator headerMode="none">
      <StackRoutes.Screen name="Groups" component={TabRoutes} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
