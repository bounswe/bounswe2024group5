import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (newToken: string) => void;
  saveUsername: (newUsername: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState<string | null>(null);

  const login = (newToken: string) => {
    console.log('Login called with:', { newToken });
    setToken(newToken);
  };

  const saveUsername = (newUsername: string) => {
    console.log(`## Username is saved as: ${newUsername}`);
    setUsername(newUsername);
  }

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, saveUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};