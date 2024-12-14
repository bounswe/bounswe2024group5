// __tests__/ProfileSettingsScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Mock fetch
global.fetch = jest.fn();

// Mock navigation and route
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockRoute = {
  params: {},
  name: 'ProfileSettings'
};

// Mock auth context
const mockAuth = {
  user: {
    username: 'testuser',
    token: 'fake-token',
    isLoggedIn: true
  }
};

// Mock ImagePicker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({
    canceled: false,
    assets: [{ uri: 'file://test-image.jpg' }]
  }))
}));

// Mock navigation container
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack
  }),
  useRoute: () => mockRoute
}));

describe('ProfileSettingsScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    jest.clearAllMocks();
    Alert.alert = jest.fn();
  });

  it('successfully updates the profile with changing the profile picture', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/profile') && url.includes('GET')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            name: 'John Doe',
            email: 'john@example.com',
            profilePicture: 'https://example.com/old-pic.jpg'
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

    const { getByText, getByPlaceholderText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <ProfileSettingsScreen />
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
        'https://api.example.com/api/profile',
        expect.objectContaining({
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          }
        })
      );
    });

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Profile updated successfully!');
    expect(mockGoBack).toHaveBeenCalled();
  });
});
