import React from 'react';

export const AuthContext = React.createContext(null);

export const useAuth = () => {
  return {
    token: 'fake-token',
    user: {
      username: 'testuser',
      name: 'Test User'
    },
    isLoggedIn: true,
    getToken: () => 'fake-token',
    login: jest.fn(),
    logout: jest.fn(),
  };
};

export const AuthProvider = ({ children, value }) => {
  return (
    <AuthContext.Provider value={value || useAuth()}>
      {children}
    </AuthContext.Provider>
  );
};
