import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { BASE_URL } from "../utils/config";

interface AuthContextProps {
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setRefetchUserDigis: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUserDigis: boolean;
  loading: boolean;
  userToken: string;
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(undefined);
  const [refetchUserDigis, setRefetchUserDigis] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await isLoggedIn();
      setLoading(false);
    };

    getUser();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        email,
        password,
        name,
      });
      const { token } = res.data;
      await SecureStore.setItemAsync("token", token);
      await isLoggedIn();
    } catch (error: any) {
      setUser(null);
      setUserToken("");
      console.log(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token } = res.data;
      await SecureStore.setItemAsync("token", token);
      await isLoggedIn();
    } catch (error: any) {
      setUser(null);
      setUserToken("");
      console.log("login failed.");
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setUser(null);
      setUserToken("");
    } catch (error: any) {
      console.log("logout failed.");
    }
  };

  const isLoggedIn = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No token found");
      const res = await axios.get(`${BASE_URL}/auth/getMe`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const user = res.data;
      setUser(user);
      setUserToken(token);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        setLoading,
        setUserToken,
        setUser,
        setRefetchUserDigis,
        refetchUserDigis,
        loading,
        userToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
