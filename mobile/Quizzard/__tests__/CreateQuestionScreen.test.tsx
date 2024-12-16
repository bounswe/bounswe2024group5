import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateQuestionScreen from '../screens/CreateQuestionScreen';
import { Alert } from 'react-native';
import { AuthProvider } from '../__mocks__/AuthProvider';
import { NavigationMock } from '../__mocks__/NavigationMock';
import BaseLayout from '../__mocks__/BaseLayout';

// Use the mock host context
jest.mock('../app/HostContext', () => require('../__mocks__/HostContext'));

describe('CreateQuestionScreen', () => {
  const mockAuthValue = {
    token: 'test-token',
    user: {
      username: 'testuser',
      name: 'Test User'
    },
    isLoggedIn: true,
    getToken: () => 'test-token',
    login: jest.fn(),
    logout: jest.fn(),
  };

  const renderWithProviders = (component) => {
    return render(
      <AuthProvider value={mockAuthValue}>
        {component}
      </AuthProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockReset();
  });

  it('renders create question form correctly', () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <CreateQuestionScreen navigation={NavigationMock} />
    );

    expect(getByPlaceholderText('Question Title*')).toBeTruthy();
    expect(getByPlaceholderText('Question Content*')).toBeTruthy();
    expect(getByPlaceholderText('Tags (comma-separated)*')).toBeTruthy();
    expect(getByText('Submit Post')).toBeTruthy();
  });

  it('handles form submission correctly', async () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <CreateQuestionScreen navigation={NavigationMock} />
    );

    fireEvent.changeText(getByPlaceholderText('Question Title*'), 'Test Question');
    fireEvent.changeText(getByPlaceholderText('Question Content*'), 'Test Content');
    fireEvent.changeText(getByPlaceholderText('Tags (comma-separated)*'), 'test,question');

    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        status: 201,
        headers: {
          get: () => 'application/json'
        },
        json: () => Promise.resolve({ id: 1 })
      })
    );

    fireEvent.press(getByText('Submit Post'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/posts',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            title: 'Test Question',
            content: 'Test Content',
            tags: ['test', 'question']
          })
        })
      );
      expect(NavigationMock.goBack).toHaveBeenCalled();
    });
  });

  it('displays error for unauthorized submission', async () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <CreateQuestionScreen navigation={NavigationMock} />
    );

    fireEvent.changeText(getByPlaceholderText('Question Title*'), 'Test Question');
    fireEvent.changeText(getByPlaceholderText('Question Content*'), 'Test Content');
    fireEvent.changeText(getByPlaceholderText('Tags (comma-separated)*'), 'test,question');

    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        status: 401,
        headers: {
          get: () => 'application/json'
        },
        json: () => Promise.resolve({ error: 'Unauthorized' })
      })
    );

    const alertSpy = jest.spyOn(Alert, 'alert');
    
    fireEvent.press(getByText('Submit Post'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Unauthorized',
        'Please log in to submit a question.'
      );
    });
  });

  // ... remaining tests with renderWithProviders
});