import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import api from "../services/api";
import secrets from "../secrets.json";

import { useCallback } from "react";
import { Alert, Platform } from "react-native";
import { useTheme } from "styled-components";
import { useAuth } from "./auth";
import { usePersistedState } from "../hooks/usePersistedState";
import { configureNotifications } from "../configs/notifications";

interface NotificationsContextProps {
  expoToken: string;
  enabled: boolean;
  toggleEnabledNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextProps>(
  {} as NotificationsContextProps
);

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldPlaySound: true,
//     shouldShowAlert: true,
//     shouldSetBadge: true,
//     priority: Notifications.AndroidNotificationPriority.HIGH,
//   }),
// });

const NotificationsProvider: React.FC = ({ children }) => {
  const [expoToken, setExpoToken] = useState("");
  const [enabled, setEnabled] = useState(true);
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
          "Preciso desta permissão para notificações de novas mensagens. Você poderá desativa-lás nas configurações quando quiser."
        );
      }
    }

    newToken = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: secrets.ExpoExperienceID,
      })
    ).data;

    await configureNotifications({ signed })

    return newToken;
  }, [expoToken]);

  const toggleEnabledNotifications = async () => {
    if (!signed || !expoToken.length) return;
    setEnabled((old) => !old);

    await api.patch(
      `/users/notify/toggle/${expoToken}?enabled=${enabled ? "no" : "yes"}`
    );
  };

  useEffect(() => {
    (async () => {
      const newToken = await registerForPushNotifications();

      if (newToken) {
        setExpoToken(newToken);
        setStoredToken(newToken);

        await api
          .post("/users/notify/register", {
            notificationToken: newToken,
            platform: Platform.OS,
          })
          .then((res) => {
            setEnabled(res.data.send_notification);
          });
      }
    })();
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        expoToken,
        toggleEnabledNotifications,
        enabled,
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
