import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ForumScreen from '../screens/ForumScreen';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from '../__mocks__/AuthProvider';
import { mockForumPosts } from '../mockdata/mockForumPostsData';
import { NavigationMock } from '../__mocks__/NavigationMock';
import BaseLayout from '../__mocks__/BaseLayout';

// Use the mock host context
jest.mock('../app/HostContext', () => require('../__mocks__/HostContext'));

describe('ForumScreen', () => {
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

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <AuthProvider value={mockAuthValue}>
        {component}
      </AuthProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockReset();
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  });

  it('renders loading state initially', () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise(() => {})
    );

    const { getByTestId } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders questions list after successful data fetch', async () => {
    global.fetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockForumPosts)
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      );

    const { getByText } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    await waitFor(() => {
      expect(getByText('How to improve my English grammar?')).toBeTruthy();
      expect(getByText('What are the best resources for learning English vocabulary?')).toBeTruthy();
    });
  });

  it('handles upvote action correctly', async () => {
    global.fetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockForumPosts)
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      );

    const { getByTestId } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    await waitFor(() => {
      expect(getByTestId('question-1')).toBeTruthy();
    });

    global.fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ noUpvote: 16 })
      })
    );

    fireEvent.press(getByTestId('upvote-button-1'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/posts/1/upvote',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token'
          })
        })
      );
    });
  });

  it('navigates to search screen when search bar is pressed', () => {
    const { getByTestId } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    fireEvent.press(getByTestId('search-bar'));
    expect(NavigationMock.navigate).toHaveBeenCalledWith('SearchWords');
  });

  it('navigates to create question screen when add button is pressed', () => {
    const { getByTestId } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    fireEvent.press(getByTestId('add-button'));
    expect(NavigationMock.navigate).toHaveBeenCalledWith('CreateQuestion');
  });
  
  it('handles pagination correctly', async () => {
    const paginatedMockData = mockForumPosts.slice(0, 5); // Since PAGE_SIZE is 5
    
    global.fetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockForumPosts) // Full data for total count
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([])
        })
      );

    const { getByTestId } = renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    await waitFor(() => {
      expect(getByTestId('pagination-controls')).toBeTruthy();
    });

    // Test next page
    fireEvent.press(getByTestId('next-page-button'));
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.example.com/api/posts'),
        expect.any(Object)
      );
    });
  });

  it('handles API error gracefully', async () => {
    // Mock failed API call
    global.fetch.mockImplementationOnce(() => 
      Promise.reject(new Error('API Error'))
    );

    const alertSpy = jest.spyOn(Alert, 'alert');

    renderWithProviders(
      <ForumScreen navigation={NavigationMock} />
    );

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Error',
        'Failed to fetch posts. Please try again.'
      );
    });
  });
});