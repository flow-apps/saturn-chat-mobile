import React from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import Configurations from "../../pages/Configurations";
import Friends from "../../pages/Friends";
import Home from "../../pages/Home";
import NewGroup from "../../pages/NewGroup";
import fonts from "../../styles/fonts";
import { useTranslate } from "../../hooks/useTranslate";

const tabRoutes = createBottomTabNavigator();

const HomeRoutes = () => {
  const { colors } = useTheme();
  const { t } = useTranslate("TabBar")

  return (
    <tabRoutes.Navigator
      screenOptions={{
        // @ts-ignore
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.light_heading,
        tabBarActiveBackgroundColor: "#00000000",
        tabBarLabelPosition: "below-icon",
        // @ts-ignore
        tabBarKeyboardHidesTabBar: true,
        tabBarIconStyle: {
          transform: [{ scale: 0.9 }],
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fonts["text-bold"],
        },
        tabBarStyle: {
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
          title: t("groups"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="groups" size={size + 6} color={color} />
          ),
        }}
      />

      <tabRoutes.Screen
        component={Friends}
        name="Friends"
        options={{
          title: t("friends"),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size + 6} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />

      <tabRoutes.Screen
        component={NewGroup}
        name="NewGroup"
        options={{
          title: t("new_group"),
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
          title: t("settings"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
