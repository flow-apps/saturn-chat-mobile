import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";
import api from "../services/api";
import websocket from "../configs/websocket";
import * as auth from "../services/auth";

import { Platform } from "react-native";
import { UserData } from "../../@types/interfaces";

import analytics from "@react-native-firebase/analytics";
import { OneSignal } from "../configs/notifications";

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  loadingData: boolean;
  user: UserData | null;
  loginError: boolean;
  registerError: boolean;
  token: string;
  updateUser: (data: any) => Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signUp(data: FormData): Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserData | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    setLoadingData(true);
    const storageUser = await AsyncStorage.getItem("@SaturnChat:user");
    const storageToken = await AsyncStorage.getItem("@SaturnChat:token");
    const headerToken = `Bearer ${storageToken}`;

    if (storageUser && storageToken) {
      const parsedUser = JSON.parse(String(storageUser));

      OneSignal.login(parsedUser.id);
      OneSignal.User.addEmail(parsedUser.email);
      
      api.defaults.headers["authorization"] = headerToken;
      websocket.query.token = headerToken;
      setUser(parsedUser);
      setToken(headerToken);
    }
    setLoadingData(false);
  };

  const updateUser = async (data: { token?: string; user: UserData }) => {
    OneSignal.login(data.user.id);
    OneSignal.User.addEmail(data.user.email);

    if (data.token) {
      const headerToken = `Bearer ${data.token}`;

      await AsyncStorage.setItem("@SaturnChat:token", data.token, () => {
        api.defaults.headers["authorization"] = headerToken;
        websocket.query.token = headerToken;
        setToken(headerToken);
      });
    }
    await AsyncStorage.setItem(
      "@SaturnChat:user",
      JSON.stringify(data.user),
      () => {
        setUser(data.user);
      }
    );
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setLoginError(false);
    auth
      .signIn(email, password)
      .then(async (response) => {
        const userId = response.data.user.id;

        await analytics().setUserId(userId);

        await updateUser(response.data);
        setLoginError(false);
      })
      .catch(() => {
        setLoginError(true);
      })
      .finally(() => setLoading(false));
  };

  const signUp = async (data: FormData) => {
    setLoading(true);
    setRegisterError(false);
    auth
      .signUp(data)
      .then(async (response) => {
        const userId = response.data.user.id;

        await analytics().setUserId(userId);

        await updateUser(response.data);
        setRegisterError(false);
      })
      .catch(() => {
        setRegisterError(true);
      })
      .finally(() => setLoading(false));
  };

  const signOut = () => {
    AsyncStorage.multiRemove(["@SaturnChat:user", "@SaturnChat:token"]).then(
      async () => {
        await api.delete(`/users/notify/unregister?platform=${Platform.OS}`);

        OneSignal.logout();
        api.defaults.headers["authorization"] = undefined;
        websocket.query.token = "";
        setToken("");
        setUser(null);
      }
    );
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        loadingData,
        user,
        signIn,
        signUp,
        signOut,
        updateUser,
        token,
        registerError,
        loginError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
