import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
      setOptions: mockSetOptions
    }),
    useRoute: () => ({
      params: {},
      name: 'ProfileSettings'
    })
  };
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children
  })
}));

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({
    cancelled: false,
    assets: [{ uri: 'file://test-image.jpg' }]
  }))
}));

global.fetch = jest.fn();

const mockAuth = {
  token: 'fake-token',
  user: {
    username: 'testuser',
    isLoggedIn: true
  },
  getToken: () => 'fake-token'
};

describe('ProfileSettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Alert.alert = jest.fn();

    fetch.mockImplementation((url, options) => {
      const headers = options?.headers || {};
      const token = headers.Authorization?.split(' ')[1];

      if (!token || token === 'null') {
        return Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({ message: 'Unauthorized' })
        });
      }

      if (url.includes('/api/profile/me')) {
        if (options?.method === 'GET') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              name: 'John Doe',
              email: 'john@example.com',
              profilePicture: 'https://example.com/old-pic.jpg'
            })
          });
        } else if (options?.method === 'PUT') {
          // Simulate failure by default unless we handle success test
          return Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({
              message: 'Failed to update profile'
            })
          });
        }
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  it('successfully updates the profile with changing the profile picture', async () => {
    fetch.mockImplementation((url, options) => {
      const headers = options?.headers || {};
      const token = headers.Authorization?.split(' ')[1];

      if (!token || token === 'null') {
        return Promise.resolve({
          ok: false,
          status: 401,
          json: () => Promise.resolve({ message: 'Unauthorized' })
        });
      }

      if (url.includes('/api/profile/me') && options?.method === 'GET') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: 'John Doe',
            email: 'john@example.com',
            profilePicture: 'https://example.com/old-pic.jpg'
          })
        });
      } else if (url.includes('/api/profile/me') && options?.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: 'Jane Doe',
            email: 'jane@example.com',
            profilePicture: 'https://example.com/new-pic.jpg'
          })
        });
      }

      return Promise.reject(new Error('Not found'));
    });

    const { getByText, getByPlaceholderText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <NavigationContainer>
            <ProfileSettingsScreen />
          </NavigationContainer>
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'jane@example.com');

    const changePhotoButton = getByText('Change Photo');
    fireEvent.press(changePhotoButton);

    const saveButton = getByText('Save Changes');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/profile/me',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining('"name":"Jane Doe"')
        })
      );
    });

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Profile updated successfully!');
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('shows an error when failing to update the profile', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <NavigationContainer>
            <ProfileSettingsScreen />
          </NavigationContainer>
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    });

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Jane Doe');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'jane@example.com');

    const saveButton = getByText('Save Changes');
    fireEvent.press(saveButton);

    await waitFor(() => {
      const putCall = fetch.mock.calls.find(call => 
        call[0].includes('/api/profile/me') && 
        call[1].method === 'PUT'
      );
      expect(putCall[1].headers['Authorization']).toBe('Bearer fake-token');
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to update profile');
    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('shows an error when failing to load the profile', async () => {
    fetch.mockImplementation((url) => {
      const headers = {};
      if (url.includes('/api/profile/me') && !url.includes('PUT')) {
        return Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve({
            message: 'Failed to load profile'
          })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          name: 'Jane Doe',
          email: 'jane@example.com',
          profilePicture: 'https://example.com/new-pic.jpg'
        })
      });
    });

    render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <NavigationContainer>
            <ProfileSettingsScreen />
          </NavigationContainer>
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to load profile');
    });
  });
});
