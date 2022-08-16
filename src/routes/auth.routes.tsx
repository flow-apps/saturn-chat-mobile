import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Auth/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import OnBoarding from "../pages/Auth/OnBoarding";

const stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="OnBoarding" component={OnBoarding} />
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="Login" component={Login} />
    </stack.Navigator>
  );
};

export { AuthRoutes };
