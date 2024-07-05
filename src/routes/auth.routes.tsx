import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@pages/Auth/Home";
import Register from "@pages/Auth/Register";
import Login from "@pages/Auth/Login";
import OnBoarding from "@pages/Auth/OnBoarding";
import { useTheme } from "styled-components";

const stack = createStackNavigator();

const AuthRoutes = () => {
  const { colors } = useTheme();

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background, opacity: 1 },
      }}
    >
      <stack.Screen name="OnBoarding" component={OnBoarding} />
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="Login" component={Login} />
    </stack.Navigator>
  );
};

export { AuthRoutes };
