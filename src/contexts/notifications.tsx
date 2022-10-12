import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as Localize from "expo-localization";
import OneSignal from "react-native-onesignal";

import api from "../services/api";
import secrets from "../secrets.json";

import { useAuth } from "./auth";
import { Alert } from "react-native";

interface NotificationsContextProps {
  expoToken: string;
  enabled: boolean;
  toggleEnabledNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextProps>(
  {} as NotificationsContextProps
);

const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expoToken, setExpoToken] = useState("");
  const [enabled, setEnabled] = useState(true);

  const { signed, user } = useAuth();

  const toggleEnabledNotifications = async () => {
    if (!signed || !expoToken.length) return;
    setEnabled((old) => !old);

    await api.patch(
      `/users/notify/toggle/${expoToken}?enabled=${enabled ? "no" : "yes"}`
    );
  };

  const registerOneSignal = useCallback(() => {
    if (!signed) return;
    
    OneSignal.setLocationShared(false);
    OneSignal.setLanguage(Localize.locale);
    OneSignal.setExternalUserId(user.id);
    OneSignal.promptForPushNotificationsWithUserResponse((res) => {
      if (!res) {
        Alert.alert(
          "Oh não!",
          "Sem essa permissão você não receberá notificações do app, como de mensagens novas!"
        );
      }
    });
    OneSignal.setAppId(secrets.OneSignalAppID);
    console.log("[ OneSignal ] Connection ready!");
  }, [signed, user]);

  useEffect(() => {
    registerOneSignal();
  }, [signed]);

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
