import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForumScreen from '../screens/ForumScreen';
import mockForumPosts from '../mockdata/mockForumData';
import HostUrlContext from '../app/HostContext';

// Mock dependencies
jest.mock('../app/HostContext', () => ({
  __esModule: true,
  default: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) => children({}),
  },
}));

jest.mock('../screens/AuthProvider', () => ({
  useAuth: () => ({
    token: 'test-token',
  }),
}));

describe('ForumScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };


  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock fetch to return test questions
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockForumPosts),
      })
    );

    // Mock AsyncStorage
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));
    AsyncStorage.setItem.mockResolvedValue();
  });

  it('renders loading indicator initially', async () => {
    const { getByTestId } = render(<ForumScreen navigation={mockNavigation} />);
    
    // Since loading is happening, we should see an activity indicator
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('renders questions after loading', async () => {
    const { findByText } = render(<ForumScreen navigation={mockNavigation} />);
    
    // Wait for questions to load
    const question1Title = await findByText('Test Question 1');
    const question2Title = await findByText('Test Question 2');
    
    expect(question1Title).toBeTruthy();
    expect(question2Title).toBeTruthy();
  });

  it('navigates to create question screen', async () => {
    const { getByTestId } = render(<ForumScreen navigation={mockNavigation} />);
    
    // Simulate press on add button
    const addButton = getByTestId('add-question-button');
    fireEvent.press(addButton);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateQuestion');
  });

  it('navigates to search screen', async () => {
    const { getByTestId } = render(<ForumScreen navigation={mockNavigation} />);
    
    // Simulate press on search bar
    const searchBar = getByTestId('search-bar');
    fireEvent.press(searchBar);
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SearchWords');
  });

  it('handles upvote successfully', async () => {
    // Mock upvote fetch response
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes('/upvote')) {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ noUpvote: 11 }),
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockForumPosts),
      });
    });

    const { findByTestId } = render(<ForumScreen navigation={mockNavigation} />);
    
    // Wait for questions to load and find upvote button
    const upvoteButton = await findByTestId('upvote-1');
    fireEvent.press(upvoteButton);

    // Check if the upvote was processed
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/posts/1/upvote'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });

  it('handles fetch error', async () => {
    // Mock fetch error
    global.fetch = jest.fn().mockImplementation(() => 
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'Server Error' }),
      })
    );

    // Spy on Alert
    const alertSpy = jest.spyOn(Alert, 'alert');

    render(<ForumScreen navigation={mockNavigation} />);
    
    // Wait for error alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Error', 
        expect.stringContaining('Failed to fetch')
      );
    });
  });
});