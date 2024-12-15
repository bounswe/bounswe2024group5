import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import QuizCreationScreen from '../screens/QuizCreationScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock animations
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Animated: {
      ...RN.Animated,
      timing: () => ({ start: cb => cb && cb() }),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        interpolate: jest.fn()
      }))
    }
  };
});

global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockSetOptions = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    setOptions: mockSetOptions
  }),
  useRoute: () => ({
    params: {},
    name: 'QuizCreation'
  })
}));

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
  },
  isLoggedIn: true,
  getToken: () => 'fake-token'
};

describe('QuizCreationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Alert.alert = jest.fn();

    fetch.mockImplementation((url, options) => {
      if (url.includes('/api/answer-suggestion')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            correctAnswerSuggestions: ['correct answer'],
            wrongAnswerSuggestions: ['wrong1', 'wrong2', 'wrong3']
          })
        });
      }
      if (url.includes('/api/quizzes') && options?.method === 'POST') {
        const body = JSON.parse(options.body);
        if (body.title && body.questions?.length > 0) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({ id: 1 })
          });
        }
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  it('successfully creates a quiz with one question', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <NavigationContainer>
            <QuizCreationScreen />
          </NavigationContainer>
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Fill in quiz details
    fireEvent.changeText(getByPlaceholderText('Untitled Quiz'), 'Test Quiz');
    fireEvent.changeText(getByPlaceholderText('Enter a word'), 'test word');

    // Fill in choices
    fireEvent.changeText(getByPlaceholderText('Choice A'), 'correct answer');
    fireEvent.changeText(getByPlaceholderText('Choice B'), 'wrong1');
    fireEvent.changeText(getByPlaceholderText('Choice C'), 'wrong2');
    fireEvent.changeText(getByPlaceholderText('Choice D'), 'wrong3');

    // Submit quiz
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      const postCalls = fetch.mock.calls.filter(([url, opts]) =>
        url.includes('/api/quizzes') &&
        opts.method === 'POST'
      );
      expect(postCalls.length).toBeGreaterThan(0);
      const lastCall = postCalls[postCalls.length - 1];
      const requestBody = JSON.parse(lastCall[1].body);

      expect(requestBody).toEqual({
        title: 'Test Quiz',
        questions: [{
          word: 'test word',
          type: 'multipleChoice',
          options: {
            A: 'correct answer',
            B: 'wrong1',
            C: 'wrong2',
            D: 'wrong3'
          }
        }]
      });

      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Quiz created successfully!');
      expect(mockNavigate).toHaveBeenCalledWith('Home');
    });
  });

  it('shows error when trying to submit without questions', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthProvider value={mockAuth}>
        <HostUrlContext.Provider value="https://api.example.com">
          <NavigationContainer>
            <QuizCreationScreen />
          </NavigationContainer>
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    fireEvent.changeText(getByPlaceholderText('Untitled Quiz'), '');
    fireEvent.press(getByText('Submit'));

    expect(Alert.alert).toHaveBeenCalledWith('Quiz must have a title.');
    expect(fetch).not.toHaveBeenCalled();
  });
});
