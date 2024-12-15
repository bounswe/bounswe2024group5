import React from 'react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children, value }) => {
  // Use provided value or fallback to a default mock
  const authValue = value || {
    token: 'test-token',
    user: {
      username: 'testuser',
      name: 'Test User'
    },
    isLoggedIn: true,
    getToken: () => 'test-token',
    login: () => {},
    logout: () => {},
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
