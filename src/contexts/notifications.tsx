import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import api from "../services/api";
import secrets from "../secrets.json";

import { useCallback } from "react";
import { Alert, Platform } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "./auth";
import { getWebsocket } from "../services/websocket";
import { navigate } from "../routes/rootNavigation";
import { usePersistedState } from "../hooks/usePersistedState";

interface NotificationsContextProps {
  expoToken: string;
  enabled: boolean;
  toggleEnabledNotifications: () => void
}

const NotificationsContext = createContext<NotificationsContextProps>(
  {} as NotificationsContextProps
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

const NotificationsProvider: React.FC = ({ children }) => {
  const [expoToken, setExpoToken] = useState("");
  const [enabled, setEnabled] = useState(true)
  const [storedToken, setStoredToken] = usePersistedState(
    "@SaturnChat:NotificationToken",
    ""
  );

  const { signed } = useAuth();
  const { colors } = useTheme();

  const registerForPushNotifications = useCallback(async () => {
    let newToken: string;

    if (!Constants.isDevice) {
      return Alert.alert(
        "Algo está errado",
        "Use um dispositivo físico para receber notificações"
      );
    }

    const status = await Notifications.getPermissionsAsync();

    if (!status.granted) {
      const { granted } = await Notifications.requestPermissionsAsync();

      if (!granted) {
        return Alert.alert(
          "Poxa vida",
          "Preciso desta permissão para notificações de novas mensagens"
        );
      }
    }

    newToken = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: secrets.ExpoExperienceID,
      })
    ).data;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        lightColor: colors.primary,
        groupId: "default",
      });

      await Notifications.setNotificationChannelAsync("messages", {
        name: "messages",
        enableVibrate: true,
        enableLights: true,
        importance: Notifications.AndroidImportance.MAX,
        lightColor: colors.primary,
        groupId: "messages",
      });
    }

    await Notifications.setNotificationCategoryAsync("message", [
      {
        identifier: "markAsRead",
        buttonTitle: "Marcar como lido",
      },
      {
        identifier: "replyMessage",
        buttonTitle: "Responder",
        textInput: {
          placeholder: "Sua mensagem...",
          submitButtonTitle: "enviar",
        },
      },
    ]);

    Notifications.addNotificationResponseReceivedListener(async (res) => {
      if (!signed) return;
      const socket = getWebsocket();
      const groupID = res.notification.request.content.data.group_id;

      if (res.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER) {
        return navigate("Chat", { id: groupID });
      }

      socket.emit("connect_in_chat", groupID);

      if (res.actionIdentifier === "replyMessage") {
        const msg = res.userText;
        const notification = res.notification.request.identifier;

        socket?.emit("new_user_message", { message: msg });
        await Notifications.dismissNotificationAsync(notification);
      } else if (res.actionIdentifier === "markAsRead") {
        const messageID = res.notification.request.content.data.id as string;

        await Notifications.dismissNotificationAsync(
          res.notification.request.identifier
        );
        socket?.emit("set_read_message", messageID);
      }
    });

    return newToken;
  }, [expoToken]);

  const toggleEnabledNotifications = useCallback(async () => {
    if (!signed || !expoToken.length) return
    setEnabled(old => !old)

    await api
      .patch(`/users/notify/toggle/${expoToken}?enabled=${enabled ? "no" : "yes"}`)

  }, [expoToken])

  useEffect(() => {
    (async () => {
      const newToken = await registerForPushNotifications();

      if (newToken) {
        setExpoToken(newToken);
        setStoredToken(newToken);

        await api.post("/users/notify/register", {
          notificationToken: newToken,
          platform: Platform.OS,
        })
        .then(res => {
          setEnabled(res.data.send_notifications)
        })
      }
    })();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        expoToken,
        toggleEnabledNotifications,
        enabled
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => {
  const notificationsContext = useContext(NotificationsContext);

  return notificationsContext;
};

export { NotificationsProvider, useNotifications };
