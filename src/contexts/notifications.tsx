import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as Localize from "expo-localization";

import api from "../services/api";
import secrets from "../../secrets.json";

import { useAuth } from "./auth";
import { Platform } from "react-native";
import {
  configureNotificationsHandlers,
  OneSignal,
} from "../configs/notifications";

interface NotificationsContextProps {
  enabled: boolean;
  toggleEnabledNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextProps>(
  {} as NotificationsContextProps
);

const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [enabled, setEnabled] = useState(true);

  const platform = useMemo(() => Platform.OS, []);
  const language = useMemo(() => Localize.locale, []);

  const { signed } = useAuth();

  const toggleEnabledNotifications = async () => {
    if (!signed) return;

    setEnabled((old) => {
      return !old;
    });

    await api.patch(
      `/users/notify/toggle?enabled=${enabled ? "0" : "1"}&platform=${platform}`
    );
  };

  const registerOneSignal = async () => {
    OneSignal.Notifications.clearAll()

    if (!signed) return;

    OneSignal.initialize(secrets.OneSignalAppID);

    if (await OneSignal.Notifications.canRequestPermission()) {
      const hasPermission = await OneSignal.Notifications.requestPermission(
        true
      );
      if (!hasPermission) {
        return;
      }
    }

    configureNotificationsHandlers(signed);

    await api
      .post("/users/notify/register", {
        platform,
        language,
      })
      .then((res) => {
        setEnabled(res.data.send_notification);
      });
  };

  useEffect(() => {
    registerOneSignal();
  }, [signed]);

  return (
    <NotificationsContext.Provider
      value={{
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
