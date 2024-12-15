import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import QuizCreationScreen from '../screens/QuizCreationScreen';
import { AuthProvider } from '../__mocks__/AuthProvider';
import HostUrlContext from '../app/HostContext';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { act } from 'react-test-renderer';
import { 
  mockQuizData, 
  mockAnswerSuggestions, 
  mockQuestionTypes, 
  initialQuestionState 
} from '../__mocks__/QuizCreationMock';

// Mock modules
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

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({
    canceled: false,
    assets: [{ uri: 'file://test-image.jpg' }]
  }))
}));

// Initialize fetch mock
global.fetch = jest.fn(() => Promise.resolve({
  ok: true,
  json: () => Promise.resolve({})
}));

// Navigation mocks
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

const mockAuth = {
  token: 'fake-token',
  user: { username: 'testuser' },
  isLoggedIn: true,
  getToken: () => 'fake-token'
};

const renderApp = () => 
  render(
    <AuthProvider value={mockAuth}>
      <HostUrlContext.Provider value="https://api.example.com">
        <NavigationContainer>
          <QuizCreationScreen />
        </NavigationContainer>
      </HostUrlContext.Provider>
    </AuthProvider>
  );

describe('QuizCreationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
    Alert.alert = jest.fn();

    fetch.mockImplementation((url, options) => {
      if (url.includes('/api/answer-suggestion')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAnswerSuggestions)
        });
      }
      if (url.includes('/api/quizzes') && options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ id: 1 })
        });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  afterEach(cleanup);

  it('successfully creates a quiz with one question', async () => {
    const { getByPlaceholderText, getByText } = renderApp();

    // Fill quiz title
    fireEvent.changeText(getByPlaceholderText('Untitled Quiz'), mockQuizData.title);

    // Fill word
    const wordInput = getByPlaceholderText('Enter a word');
    fireEvent.changeText(wordInput, mockQuizData.questions[0].word);

    // Fill choices
    fireEvent.changeText(getByPlaceholderText('Choice A'), mockQuizData.questions[0].correctAnswer);
    fireEvent.changeText(getByPlaceholderText('Choice B'), mockQuizData.questions[0].wrongAnswers[0]);
    fireEvent.changeText(getByPlaceholderText('Choice C'), mockQuizData.questions[0].wrongAnswers[1]);
    fireEvent.changeText(getByPlaceholderText('Choice D'), mockQuizData.questions[0].wrongAnswers[2]);

    // Wait for state updates
    await new Promise(resolve => setTimeout(resolve, 100));

    // Submit quiz
    fireEvent.press(getByText('Submit'));

    // Wait for API call
    await waitFor(() => {
      const postCalls = fetch.mock.calls.filter(call => 
        call[0].includes('/api/quizzes') && 
        call[1].method === 'POST'
      );
      expect(postCalls.length).toBeGreaterThan(0);

      const [, opts] = postCalls[0];
      const body = JSON.parse(opts.body);
      expect(body).toMatchObject({
        title: mockQuizData.title,
        questions: [{
          questionType: 'multipleChoice',
          word: mockQuizData.questions[0].word,
          correctAnswer: mockQuizData.questions[0].correctAnswer,
          wrongAnswers: mockQuizData.questions[0].wrongAnswers
        }]
      });
    }, { timeout: 3000 });

    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Quiz created successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  // ...existing test cases...
});
