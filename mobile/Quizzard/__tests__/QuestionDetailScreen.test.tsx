import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import QuestionDetailScreen from '../screens/QuestionDetailScreen';
import { Alert } from 'react-native';
import { AuthProvider } from '../__mocks__/AuthProvider';
import { mockForumPosts } from '../mockdata/mockForumPostsData';
import { NavigationMock } from '../__mocks__/NavigationMock';
import BaseLayout from '../__mocks__/BaseLayout';

// Use the mock host context
jest.mock('../app/HostContext', () => require('../__mocks__/HostContext'));

describe('QuestionDetailScreen', () => {
  const mockQuestion = mockForumPosts[0];
  
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

  const mockRoute = {
    params: {
      questionId: mockQuestion.id,
      title: mockQuestion.title,
      content: mockQuestion.content,
      username: mockQuestion.username,
      noUpvote: mockQuestion.noUpvote,
      createdAt: mockQuestion.createdAt
    }
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

  it('renders question details correctly', async () => {
    global.fetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockQuestion)
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      );

    const { getByText, getByTestId } = renderWithProviders(
      <QuestionDetailScreen navigation={NavigationMock} route={mockRoute} />
    );

    await waitFor(() => {
      expect(getByText(mockQuestion.title)).toBeTruthy();
      expect(getByText(mockQuestion.content)).toBeTruthy();
    });
  });

  // ... remaining tests with renderWithProviders
});