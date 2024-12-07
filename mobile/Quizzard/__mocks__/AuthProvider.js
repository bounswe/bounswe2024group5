import React from 'react';

const AuthContext = React.createContext(null);

const mockAuthValue = {
  token: 'test-token',
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
};

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockAuthValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => mockAuthValue;

// Export the mock value for direct access in tests if needed
export const mockAuth = mockAuthValue;