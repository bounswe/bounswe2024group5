// __tests__/ProfileSettingsScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen'; // Update the path accordingly
import { AuthProvider, mockAuth } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';

// Mock fetch
global.fetch = jest.fn();

// Mock navigation
const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

// Mock the auth hook
jest.mock('../screens/AuthProvider', () => ({
  useAuth: () => mockAuth,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
  useFocusEffect: jest.fn(),
}));

jest.mock('../screens/BaseLayout', () => {
  return function MockBaseLayout({ children }) {
    return children;
  };
});

describe('ProfileSettingsScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('successfully updates the profile without changing the profile picture', async () => {
    // Mock the initial GET request to fetch user profile
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'John Doe',
            email: 'john.doe@example.com',
            profilePicture: 'https://example.com/profile.jpg',
          }),
      })
    );

    // Mock the PUT request to update user profile
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            profilePicture: 'https://example.com/profile.jpg',
          }),
      })
    );

    // Mock Alert.alert
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <ProfileSettingsScreen navigation={{ goBack: mockGoBack, navigate: mockNavigate }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Wait for initial render and animations
    await act(async () => {
      jest.runAllTimers();
    });

    // Wait for the initial profile data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Update the name and email
    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.changeText(nameInput, 'Jane Doe');
    fireEvent.changeText(emailInput, 'jane.doe@example.com');

    // Press the 'Save Changes' button
    const saveButton = getByText('Save Changes');
    await act(async () => {
      fireEvent.press(saveButton);
      jest.runAllTimers();
    });

    // Wait for the PUT request to be called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    // Verify the PUT request was made with correct parameters
    expect(fetch).toHaveBeenLastCalledWith('https://api.example.com/api/profile/me', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        profilePicture: 'https://example.com/profile.jpg',
      }),
    });

    // Verify that Alert.alert was called with success message
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Profile updated successfully.', [
      {
        text: 'OK',
        onPress: expect.any(Function),
      },
    ]);

    // Simulate pressing the 'OK' button on the alert
    const alertCallback = Alert.alert.mock.calls[0][2][0].onPress;
    act(() => {
      alertCallback();
    });

    // Verify that navigation.goBack was called
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('successfully updates the profile with changing the profile picture', async () => {
    // Mock the initial GET request to fetch user profile
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'John Doe',
            email: 'john.doe@example.com',
            profilePicture: 'https://example.com/profile.jpg',
          }),
      })
    );

    // Mock the image upload POST request
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('https://example.com/new-profile.jpg'),
      })
    );

    // Mock the PUT request to update user profile with new profile picture
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            profilePicture: 'https://example.com/new-profile.jpg',
          }),
      })
    );

    // Mock Alert.alert
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <ProfileSettingsScreen navigation={{ goBack: mockGoBack, navigate: mockNavigate }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Wait for initial render and animations
    await act(async () => {
      jest.runAllTimers();
    });

    // Wait for the initial profile data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Update the name and email
    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.changeText(nameInput, 'Jane Doe');
    fireEvent.changeText(emailInput, 'jane.doe@example.com');

    // Mock ImagePicker.launchImageLibraryAsync
    const mockImagePicker = require('expo-image-picker');
    mockImagePicker.launchImageLibraryAsync = jest.fn().mockResolvedValue({
      canceled: false,
      assets: [
        {
          uri: 'file://new-profile.jpg',
          fileName: 'new-profile.jpg',
          type: 'image/jpeg',
        },
      ],
    });

    // Press the 'Change Photo' button
    const changePhotoButton = getByText('Change Photo');
    await act(async () => {
      fireEvent.press(changePhotoButton);
      jest.runAllTimers();
    });

    // Press the 'Save Changes' button
    const saveButton = getByText('Save Changes');
    await act(async () => {
      fireEvent.press(saveButton);
      jest.runAllTimers();
    });

    // Wait for the upload and PUT requests to be called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));

    // Verify the image upload POST request
    expect(fetch).toHaveBeenNthCalledWith(2, 'https://api.example.com/api/file/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer test-token',
      },
      body: expect.any(FormData),
    });

    // Verify that the profile update PUT request includes the new profile picture URL
    expect(fetch).toHaveBeenNthCalledWith(3, 'https://api.example.com/api/profile/me', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        profilePicture: 'https://example.com/new-profile.jpg',
      }),
    });

    // Verify that Alert.alert was called with success message
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Profile updated successfully.', [
      {
        text: 'OK',
        onPress: expect.any(Function),
      },
    ]);

    // Simulate pressing the 'OK' button on the alert
    const alertCallback = Alert.alert.mock.calls[0][2][0].onPress;
    act(() => {
      alertCallback();
    });

    // Verify that navigation.goBack was called
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('handles API failure when updating the profile', async () => {
    // Mock the initial GET request to fetch user profile
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'John Doe',
            email: 'john.doe@example.com',
            profilePicture: 'https://example.com/profile.jpg',
          }),
      })
    );

    // Mock the PUT request to update user profile with failure
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () =>
          Promise.resolve({
            message: 'Invalid email format.',
          }),
      })
    );

    // Mock Alert.alert
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <ProfileSettingsScreen navigation={{ goBack: mockGoBack, navigate: mockNavigate }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Wait for initial render and animations
    await act(async () => {
      jest.runAllTimers();
    });

    // Wait for the initial profile data to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Update the name and email with invalid email
    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');

    fireEvent.changeText(nameInput, 'Jane Doe');
    fireEvent.changeText(emailInput, 'invalid-email');

    // Press the 'Save Changes' button
    const saveButton = getByText('Save Changes');
    await act(async () => {
      fireEvent.press(saveButton);
      jest.runAllTimers();
    });

    // Wait for the PUT request to be called
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    // Verify the PUT request was made with correct parameters
    expect(fetch).toHaveBeenLastCalledWith('https://api.example.com/api/profile/me', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'invalid-email',
        profilePicture: 'https://example.com/profile.jpg',
      }),
    });

    // Verify that Alert.alert was called with error message
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid email format.');

    // Verify that navigation.goBack was not called
    expect(mockGoBack).not.toHaveBeenCalled();
  });
});
