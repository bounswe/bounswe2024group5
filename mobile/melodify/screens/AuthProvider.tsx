import React, { createContext, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType } from "../database/AuthTypes"; // Ensure correct path

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = async (token: string) => {
    setUserToken(token);
    await AsyncStorage.setItem("userToken", token);
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
