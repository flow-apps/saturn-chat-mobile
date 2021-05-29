import React, { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import Loading from "../components/Loading";

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: object | null;
  error: boolean;
  token: string;
  signIn(email: string, password: string): Promise<void>;
  signUp(data: FormData): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem("@FlowChat:user");
      const storageToken = await AsyncStorage.getItem("@FlowChat:token");

      if (storageUser && storageToken) {
        setUser(JSON.parse(storageUser));
        setToken(`Bearer ${storageToken}`);
        api.defaults.headers["authorization"] = `Bearer ${storageToken}`;
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function updateUser(data: any) {
    setUser(data.user);
    await AsyncStorage.setItem("@FlowChat:user", JSON.stringify(data.user));
    await AsyncStorage.setItem("@FlowChat:token", data.token);
    api.defaults.headers["authorization"] = `Bearer ${data.token}`;
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
    setLoading(true);
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
