import React from "react";
import { AuthContext } from "../screens/AuthProvider";

const defaultAuthValue = {
  token: "test-token",
  user: {
    username: "testuser",
    name: "Test User",
  },
  isLoggedIn: true,
  getToken: () => "test-token",
  login: jest.fn(),
  logout: jest.fn(),
};

export const AuthProvider = ({ children, value = defaultAuthValue }) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
