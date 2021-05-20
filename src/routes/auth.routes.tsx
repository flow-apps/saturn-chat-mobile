import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Auth/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

const stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <stack.Navigator headerMode="none">
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="Login" component={Login} />
    </stack.Navigator>
  );
};

export { AuthRoutes };
