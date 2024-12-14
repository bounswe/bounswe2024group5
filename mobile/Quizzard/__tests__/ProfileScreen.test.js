import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ProfileScreen from '../screens/ProfileScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock fetch
global.fetch = jest.fn();

// Mock navigation
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

// Mock auth context
const mockAuth = {
  user: {
    username: 'testuser',
    token: 'fake-token'
  },
  logout: jest.fn()
};

// Mock the auth hook
jest.mock('../screens/AuthProvider', () => ({
  useAuth: () => mockAuth,
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
    useRoute: () => ({
      params: {},
      name: 'Profile',
    }),
  };
});

// Mock BaseLayout
jest.mock('../screens/BaseLayout', () => {
  return function MockBaseLayout({ children }) {
    return <>{children}</>;
  };
});

describe('ProfileScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  const renderWithNavigation = (component) => {
    return render(
      <NavigationContainer>
        <AuthProvider value={mockAuth}>
          <HostUrlContext.Provider value="https://api.example.com">
            {component}
          </HostUrlContext.Provider>
        </AuthProvider>
      </NavigationContainer>
    );
  };

  it('successfully loads own profile with all sections', async () => {
    const headers = {
      'Authorization': 'Bearer fake-token',
      'Content-Type': 'application/json',
    };

    // Mock profile data
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              username: 'testuser',
              name: 'Test User',
              email: 'test@example.com',
              profilePicture: 'https://example.com/profile.jpg',
              score: 100,
              englishProficiency: 'B2',
            }),
        })
      )
      // Mock followers data
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ followers: [], following: [] }),
        })
      )
      // Mock created quizzes
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              quizzes: [
                {
                  id: 1,
                  title: 'Test Quiz',
                  difficulty: 1500,
                  createdAt: '2024-03-20',
                },
              ],
            }),
        })
      )
      // Mock quiz attempts
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              id: 1,
              quizId: 1,
              completed: true,
              score: 80,
            },
          ]),
        })
      );

    const { getByText } = renderWithNavigation(
      <ProfileScreen 
        route={{ params: {} }}
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }} 
      />
    );

    await waitFor(() => {
      expect(getByText('Test User')).toBeTruthy();
    }, { timeout: 3000 });

    expect(getByText('100 Points')).toBeTruthy();
    expect(getByText('Level: B2')).toBeTruthy();

    // Verify fetch calls were made with correct headers
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/api/profile/me',
      expect.objectContaining({
        headers
      })
    );
  });

  it('handles viewing another user profile', async () => {
    // Mock other user's profile data
    fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              username: 'otheruser',
              name: 'Other User',
              profilePicture: 'https://example.com/other-profile.jpg',
              score: 150,
              englishProficiency: 'C1',
            }),
        })
      )
      // Mock followers data
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ followers: [], following: [] }),
        })
      );

    const { getByText, findByText } = renderWithNavigation(
      <ProfileScreen 
        route={{ params: { username: 'otheruser' } }}
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
      />
    );

    await waitFor(() => {
      expect(getByText('Other User')).toBeTruthy();
      expect(getByText('@otheruser')).toBeTruthy();
      expect(getByText('150 Points')).toBeTruthy();
    });
  });

  it('handles profile loading error', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () =>
          Promise.resolve({
            message: 'Profile not found',
          }),
      })
    );

    const { getByText } = renderWithNavigation(
      <ProfileScreen 
        route={{ params: {} }}
        navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
      />
    );

    await waitFor(() => {
      expect(getByText('Failed to load profile data.')).toBeTruthy();
    });
  });
}); 