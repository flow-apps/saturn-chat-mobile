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
        inactiveTintColor: colors.light_heading,
        activeBackgroundColor: "#00000000",
        labelPosition: "below-icon",
        keyboardHidesTabBar: true,
        iconStyle: {
          transform: [{ scale: 0.9 }],
          marginBottom: 5
        },
        labelStyle: {
          fontSize: 11,
          fontFamily: fonts["text-bold"],
        },
        style: {
          padding: 15,
          elevation: 10,
          height: 70,
          zIndex: 90,
          backgroundColor: `${colors.shape}`,
          paddingBottom: 5,
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
              name="chat-bubble"
              size={size}
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
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />

      <tabRoutes.Screen
        component={NewGroup}
        name="NewGroup"
        options={{
          title: "Novo Grupo",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
