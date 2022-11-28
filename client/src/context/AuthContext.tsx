import React, { createContext, useState } from "react";

interface AuthContextProps {
  login: () => void;
  logout: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
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
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => {
    console.log("login");
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        setLoading,
        setUserToken,
        setUser,
        loading,
        userToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
