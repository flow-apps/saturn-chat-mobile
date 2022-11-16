import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useTheme } from "styled-components";
import Configurations from "../../pages/Configurations";
import Friends from "../../pages/Friends";
import Home from "../../pages/Home";
import NewGroup from "../../pages/NewGroup";
import fonts from "../../styles/fonts";

const tabRoutes = createBottomTabNavigator();

const HomeRoutes = () => {
  const { colors } = useTheme();

  return (
    <tabRoutes.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.light_heading,
        activeBackgroundColor: "#00000000",
        labelPosition: "below-icon",
        keyboardHidesTabBar: true,
        iconStyle: {
          transform: [{ scale: 0.9 }],
          marginBottom: 5,
        },
        labelStyle: {
          fontSize: 10,
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
        name="GroupsChat"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="groups" size={size + 5} color={color} />
          ),
        }}
      />

      <tabRoutes.Screen
        component={Friends}
        name="Friends"
        options={{
          title: "Amigos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size + 5} color={color} />
          ),
          unmountOnBlur: true,
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
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
