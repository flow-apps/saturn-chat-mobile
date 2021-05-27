import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components";
import Chat from "../pages/Chat";
import Configurations from "../pages/Configurations";
import Home from "../pages/Home";
import NewGroup from "../pages/NewGroup";
import Participants from "../pages/Participants";
import fonts from "../styles/fonts";

const tabRoutes = createBottomTabNavigator();

const HomeRoutes = () => {
  const { colors } = useTheme();

  return (
    <tabRoutes.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark_gray,
        labelPosition: "below-icon",
        labelStyle: styles.label,
        style: styles.tabBar,
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
            <Feather name="plus" size={size} color={color} />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

const ChatRoutes = () => {
  const { colors } = useTheme();

  return (
    <tabRoutes.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark_gray,
        labelPosition: "below-icon",
        labelStyle: styles.label,
        style: styles.tabBar,
      }}
    >
      <tabRoutes.Screen
        component={Chat}
        name="ChatTalk"
        options={{
          title: "Conversa",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="chat-bubble-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <tabRoutes.Screen
        component={Participants}
        name="Participants"
        options={{
          title: "Participantes",
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes, ChatRoutes };

const styles = StyleSheet.create({
  tabBar: {
    padding: 15,
    height: 70,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 10,
    zIndex: 99,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
