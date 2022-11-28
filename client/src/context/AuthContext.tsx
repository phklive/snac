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
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [userToken, setUserToken] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await isLoggedIn();
      setLoading(false);
      setRefetch(false);
    };
    getUser();
  }, [refetch]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token } = res.data;
      await SecureStore.setItemAsync("token", token);
      setUserToken(token);
    } catch (error: any) {
      console.log("login failed.");
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      setUserToken("");
    } catch (error: any) {
      console.log("logout failed.");
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, {
        email,
        password,
        name,
      });
      const { token } = res.data;
      await SecureStore.setItemAsync("token", token);
      setUserToken(token);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const isLoggedIn = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await axios.get(`${BASE_URL}/auth/getMe`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const user = res.data;
      if (!user) {
        setUser(null);
        setUserToken("");
      }
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
        setRefetch,
        loading,
        userToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
