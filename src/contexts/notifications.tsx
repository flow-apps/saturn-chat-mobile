import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import * as Localize from "expo-localization";

import api from "../services/api";
import secrets from "../secrets.json";

import { useAuth } from "./auth";
import { Alert, Platform } from "react-native";
import { configureNotificationsHandlers, OneSignal } from "../configs/notifications";

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

  const { signed, user } = useAuth();

  const toggleEnabledNotifications = async () => {
    if (!signed) return;

    setEnabled((old) => {
      OneSignal.disablePush(!old);
      return !old;
    });

    await api.patch(
      `/users/notify/toggle?enabled=${
        enabled ? "no" : "yes"
      }&platform=${platform}`
    );
  };

  const registerOneSignal = useCallback(async () => {
    if (!signed) return;

    OneSignal.setLocationShared(false);
    OneSignal.setLanguage(Localize.locale);
    OneSignal.promptForPushNotificationsWithUserResponse((res) => {
      if (!res) {
        Alert.alert(
          "Oh não!",
          "Sem essa permissão você não receberá notificações do app, como de mensagens novas!"
        );
      }
    });
    OneSignal.setAppId(secrets.OneSignalAppID);

    configureNotificationsHandlers(signed);

    await api
      .post("/users/notify/register", {
        platform,
        language,
      })
      .then((res) => {
        setEnabled(res.data.send_notification);
      });
  }, [signed, user]);

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
