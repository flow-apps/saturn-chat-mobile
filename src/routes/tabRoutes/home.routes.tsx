import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "styled-components";
import Configurations from "../../pages/Configurations";
import Home from "../../pages/Home";
import NewGroup from "../../pages/NewGroup";
import fonts from "../../styles/fonts";

const tabRoutes = createBottomTabNavigator();

const HomeRoutes = () => {
  const { colors } = useTheme();

  return (
    <tabRoutes.Navigator
      lazy
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark_gray,
        activeBackgroundColor: "#00000000",
        labelPosition: "below-icon",
        keyboardHidesTabBar: true,
        labelStyle: {
          fontSize: 14,
          fontFamily: fonts.heading,
          marginTop: 5,
        },
        style: {
          padding: 15,
          height: 55,
          elevation: 10,
          zIndex: 90,
          backgroundColor: `${colors.shape}`,
        },
      }}
    >
      <tabRoutes.Screen
        component={Home}
        name="Groups"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="chat-bubble-outline"
              size={size - 3}
              color={color}
            />
          ),
        }}
      />

      <tabRoutes.Screen
        component={Configurations}
        name="UserConfigs"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size - 3} color={color} />
          ),
        }}
      />

      <tabRoutes.Screen
        component={NewGroup}
        name="NewGroup"
        options={{
          title: "Novo Grupo",
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={size - 3} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
