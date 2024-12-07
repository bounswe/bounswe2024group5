import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import QuizCreationPage from '../screens/QuizCreationScreen';
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

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{
      uri: 'file://test-image.jpg',
      type: 'image/jpeg',
    }],
  }),
  MediaTypeOptions: {
    Images: 'Images',
  },
}));

// Mock the BaseDropdown component
jest.mock('../components/BaseDropdown', () => require('../__mocks__/BaseDropdown'));

describe('QuizCreationScreen', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockGoBack.mockClear();
    mockNavigate.mockClear();
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  it('successfully creates a quiz with one question', async () => {
    // Mock the file upload response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('https://example.com/uploaded-image.jpg'),
      })
    );

    // Mock the quiz creation response
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      })
    );

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <QuizCreationPage navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Fill in quiz title and description
    const titleInput = getByPlaceholderText('Untitled Quiz');
    const descriptionInput = getByPlaceholderText('Enter quiz description...');
    
    await act(async () => {
      fireEvent.changeText(titleInput, 'Test Quiz');
      fireEvent.changeText(descriptionInput, 'This is a test quiz');
    });

    // Add a question
    const addQuestionButton = getByText('+ Question');
    await act(async () => {
      fireEvent.press(addQuestionButton);
    });

    // Fill in question details
    const wordInput = getByPlaceholderText('Enter a word');
    await act(async () => {
      fireEvent.changeText(wordInput, 'test');
    });

    // Select question type from dropdown
    const dropdownButton = getByTestId('dropdown-button');
    await act(async () => {
      fireEvent.press(dropdownButton);
    });

    const englishToTurkishOption = getByTestId('dropdown-option-english_to_turkish');
    await act(async () => {
      fireEvent.press(englishToTurkishOption);
    });

    // Upload image
    const uploadButton = getByText('+ Upload Image');
    await act(async () => {
      fireEvent.press(uploadButton);
      // Wait for file upload to complete
      await waitFor(() => expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/file/upload',
        expect.any(Object)
      ));
    });

    // Submit the quiz
    const submitButton = getByText('Submit');
    await act(async () => {
      fireEvent.press(submitButton);
    });

    // Verify the quiz creation API call
    await waitFor(() => {
      expect(fetch).toHaveBeenLastCalledWith('https://api.example.com/api/quizzes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': expect.any(String),
          'Authorization': 'Bearer test-token',
        },
        body: expect.stringMatching(/"title":"Test Quiz".*"questionType":"english_to_turkish"/),
      });
    });

    // Verify navigation after successful creation
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Quiz created successfully!');
    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });

  it('shows error when trying to submit without title', async () => {
    const { getByText } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <QuizCreationPage navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    const submitButton = getByText('Submit');
    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(Alert.alert).toHaveBeenCalledWith('Quiz must have a title.');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('shows error when trying to submit without questions', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <HostUrlContext.Provider value="https://api.example.com">
          <QuizCreationPage navigation={{ navigate: mockNavigate, goBack: mockGoBack }} />
        </HostUrlContext.Provider>
      </AuthProvider>
    );

    // Fill in only the title
    const titleInput = getByPlaceholderText('Untitled Quiz');
    await act(async () => {
      fireEvent.changeText(titleInput, 'Test Quiz');
    });

    const submitButton = getByText('Submit');
    await act(async () => {
      fireEvent.press(submitButton);
    });

    expect(Alert.alert).toHaveBeenCalledWith('Quiz must have at least one question.');
    expect(fetch).not.toHaveBeenCalled();
  });
}); 