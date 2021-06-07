import { Feather, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useTheme } from "styled-components";
import Chat from "../../pages/Chat";
import Participants from "../../pages/Participants";
import fonts from "../../styles/fonts";

const tabRoutes = createBottomTabNavigator();

const ChatRoutes = () => {
  const { colors } = useTheme();
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpened(true));
    Keyboard.addListener("keyboardDidHide", (e) => setKeyboardOpened(false));
  }, []);

  return (
    <tabRoutes.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.dark_gray,
        labelPosition: "below-icon",
        labelStyle: {
          fontSize: 16,
          fontFamily: fonts.heading,
        },
        style: {
          display: keyboardOpened ? "none" : "flex",
          padding: 15,
          height: 70,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          elevation: 10,
          zIndex: 90,
        },
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

export { ChatRoutes };
