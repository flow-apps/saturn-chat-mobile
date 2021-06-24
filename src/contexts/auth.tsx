import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { UserData } from "../../@types/interfaces";
import FormData from "form-data";

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UserData | null;
  error: boolean;
  token: string;
  signIn(email: string, password: string): Promise<void>;
  signUp(data: FormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@FlowChat:user");
      const storageToken = await AsyncStorage.getItem("@FlowChat:token");

      if (storageUser && storageToken) {
        api.defaults.headers["authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(String(storageUser)));
        setToken(`Bearer ${storageToken}`);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function updateUser(data: any) {
    await AsyncStorage.multiSet([
      ["@FlowChat:user", JSON.stringify(data.user)],
      ["@FlowChat:token", data.token],
    ]);
    api.defaults.headers["authorization"] = `Bearer ${data.token}`;
    setUser(data.user);
  }

  async function signIn(email: string, password: string) {
    setError(false);
    auth
      .signIn(email, password)
      .then(async (response) => {
        await updateUser(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }

  async function signUp(data: FormData) {
    setError(false);
    auth
      .signUp(data)
      .then(async (response) => {
        await updateUser(response.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }

  function signOut() {
    AsyncStorage.multiRemove(["@FlowChat:user", "@FlowChat:token"]).then(() => {
      api.defaults.headers["authorization"] = undefined;
      setUser(null);
      setError(false);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        signIn,
        signUp,
        signOut,
        token,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
