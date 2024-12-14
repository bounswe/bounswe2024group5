import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import QuizCreationScreen from '../screens/QuizCreationScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';

// Mock fetch
global.fetch = jest.fn();

// Mock navigation and route
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockRoute = {
  params: {}
};

// Mock auth context with proper token
const mockAuth = {
  user: {
    username: 'testuser',
    token: 'fake-token',
    isLoggedIn: true
  }
};

// Mock navigation container
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack
  }),
  useRoute: () => mockRoute
}));

describe('QuizCreationScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    mockGoBack.mockClear();
    jest.clearAllMocks();
    Alert.alert = jest.fn();
  });

  it('successfully creates a quiz with one question', async () => {
    // Mock successful quiz creation
    fetch.mockImplementation((url) => {
      if (url.includes('/api/answer-suggestion')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(['suggestion1', 'suggestion2', 'suggestion3'])
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 })
      });
    });

    const { getByPlaceholderText, getByText, getAllByPlaceholderText, getByTestId } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <QuizCreationScreen />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Fill in quiz title
    const titleInput = getByPlaceholderText('Untitled Quiz');
    fireEvent.changeText(titleInput, 'Test Quiz');

    // Select question type
    const questionTypeDropdown = getByTestId('question-type-dropdown');
    fireEvent.press(questionTypeDropdown);
    
    // Wait for dropdown options to appear and select Multiple Choice
    await waitFor(() => {
      const option = getByText('Select type');
      fireEvent.press(option);
    });

    // Fill in question details
    const wordInput = getAllByPlaceholderText('Enter a word')[0];
    fireEvent.changeText(wordInput, 'test');

    // Fill in choices
    fireEvent.changeText(getByPlaceholderText('Choice A'), 'correct answer');
    fireEvent.changeText(getByPlaceholderText('Choice B'), 'wrong answer 1');
    fireEvent.changeText(getByPlaceholderText('Choice C'), 'wrong answer 2');
    fireEvent.changeText(getByPlaceholderText('Choice D'), 'wrong answer 3');

    // Submit quiz
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/quizzes',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Authorization': 'Bearer fake-token',
            'Content-Type': 'application/json'
          },
          body: expect.stringContaining('"title":"Test Quiz"')
        })
      );
    });

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Quiz created successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('shows error when trying to submit without questions', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <QuizCreationScreen />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Fill in only title
    const titleInput = getByPlaceholderText('Untitled Quiz');
    fireEvent.changeText(titleInput, 'Test Quiz');

    // Try to submit without filling in question details
    fireEvent.press(getByText('Submit'));

    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Quiz must have at least one question.');
    expect(fetch).not.toHaveBeenCalled();
  });
}); 