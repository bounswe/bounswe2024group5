import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { NavigationContainer } from '@react-navigation/native';

// Initialize fetch mock
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}));

const mockNavigate = jest.fn();
const mockSetOptions = jest.fn();
let mockRoute = { params: {}, name: 'Profile' };

// Mock navigation hooks
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    setOptions: mockSetOptions
  }),
  useRoute: () => mockRoute
}));

// Mock navigation stack
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children
  })
}));

const mockAuth = {
  token: 'fake-token',
  user: {
    username: 'testuser',
    name: 'Test User'
  },
  isLoggedIn: true,
  getToken: () => 'fake-token'
};

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const NavigationWrapper = ({ children }) => (
  <NavigationContainer>
    {children}
  </NavigationContainer>
);

describe('ProfileScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRoute = { params: {}, name: 'Profile' };
  });

  const renderWithNavigation = (component) => {
    return render(
      <ErrorBoundary>
        <NavigationWrapper>
          <AuthProvider value={mockAuth}>
            <HostUrlContext.Provider value="https://api.example.com">
              {component}
            </HostUrlContext.Provider>
          </AuthProvider>
        </NavigationWrapper>
      </ErrorBoundary>
    );
  };

  it('successfully loads own profile with all sections', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/profile/me')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            username: 'testuser',
            name: 'Test User',
            points: 100,
            createdQuizzes: [],
            solvedQuizzes: [],
            badges: [],
            profilePicture: 'https://example.com/pic.jpg'
          })
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    const { getByText, queryByText } = renderWithNavigation(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText('Test User')).toBeTruthy();
      expect(getByText('@testuser')).toBeTruthy();
      expect(getByText('100 Points')).toBeTruthy();
      expect(queryByText('Failed to load profile data.')).toBeNull();
    });
  });

  it('handles viewing another user profile', async () => {
    mockRoute = { params: { username: 'otheruser' }, name: 'Profile' };

    fetch.mockImplementation((url) => {
      if (url.includes('/api/profile')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            username: 'otheruser',
            name: 'Other User',
            points: 150,
            createdQuizzes: [],
            solvedQuizzes: [],
            badges: [],
            profilePicture: 'https://example.com/other.jpg'
          })
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
    });

    const { getByText, queryByText } = renderWithNavigation(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText('Other User')).toBeTruthy();
      expect(getByText('@otheruser')).toBeTruthy();
      expect(getByText('150 Points')).toBeTruthy();
      expect(queryByText('Failed to load profile data.')).toBeNull();
    });
  });

  it('handles profile loading error', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Profile not found' })
      })
    );

    const { getByText } = renderWithNavigation(<ProfileScreen />);

    await waitFor(() => {
      expect(getByText('Failed to load profile data.')).toBeTruthy();
      expect(getByText('Retry')).toBeTruthy();
    });
  });
});
