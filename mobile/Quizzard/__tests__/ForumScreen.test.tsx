import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ForumScreen from "../screens/ForumScreen";
import { Alert } from "react-native";
import { mockForumPosts } from "../mockdata/mockForumPostsData";
import { NavigationContainer } from "@react-navigation/native";
import HostUrlContext from "../app/HostContext";
import { AuthContext } from "../screens/AuthProvider";

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock auth value
const mockAuthValue = {
  token: "test-token",
  user: {
    username: "testuser",
    name: "Test User",
  },
  isLoggedIn: true,
  getToken: () => "test-token",
  login: jest.fn(),
  logout: jest.fn(),
};

// Mock BaseLayout
jest.mock("../screens/BaseLayout", () => {
  return function MockBaseLayout({ children }) {
    return <>{children}</>;
  };
});

const renderWithProviders = (component) => {
  return render(
    <AuthContext.Provider value={mockAuthValue}>
      <HostUrlContext.Provider value="https://api.example.com">
        <NavigationContainer>{component}</NavigationContainer>
      </HostUrlContext.Provider>
    </AuthContext.Provider>
  );
};

describe("ForumScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  it("renders questions list after successful data fetch", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockForumPosts),
      })
    );

    const { getByText } = renderWithProviders(
      <ForumScreen navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText("How to improve my English grammar?")).toBeTruthy();
    });
  });

  // Add a simple render test
  it("can be rendered", () => {
    expect(() => {
      renderWithProviders(<ForumScreen navigation={mockNavigation} />);
    }).not.toThrow();
  });
});
