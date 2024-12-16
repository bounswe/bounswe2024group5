import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuizCreationScreen from '../screens/QuizCreationScreen';
import { Alert } from 'react-native';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
};

// Mock auth
jest.mock('../screens/AuthProvider', () => ({
  useAuth: () => ({
    token: 'fake-token',
    user: { username: 'testuser' },
    isLoggedIn: true,
  })
}));

// Mock host context
jest.mock('../app/HostContext', () => 'https://api.example.com');

// Mock FileSystem
jest.mock('expo-file-system', () => ({
  readAsStringAsync: jest.fn(() => Promise.resolve('base64-string')),
}));

describe('QuizCreationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Alert.alert = jest.fn();
    fetch.mockClear();
  });

  it('renders basic quiz creation form', () => {
    const { getByPlaceholderText, getByText } = render(
      <QuizCreationScreen navigation={mockNavigation} />
    );

    // Check if basic form elements are present
    expect(getByPlaceholderText('Untitled Quiz')).toBeTruthy();
    expect(getByPlaceholderText('Enter a word')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('handles submit button press', () => {
    const { getByText } = render(
      <QuizCreationScreen navigation={mockNavigation} />
    );

    // Mock successful API response
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 })
      })
    );

    // Press submit button
    fireEvent.press(getByText('Submit'));

    // Verify fetch was called
    expect(fetch).toHaveBeenCalled();
  });
});
