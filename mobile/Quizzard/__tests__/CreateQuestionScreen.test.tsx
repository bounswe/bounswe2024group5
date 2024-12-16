import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CreateQuestionScreen from "../screens/CreateQuestionScreen";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HostUrlContext from "../app/HostContext";

// Mock useAuth hook
jest.mock("../screens/AuthProvider", () => ({
  useAuth: () => ({
    token: "test-token",
    user: {
      username: "testuser",
      name: "Test User",
    },
    isLoggedIn: true,
    getToken: () => "test-token",
    login: jest.fn(),
    logout: jest.fn(),
  }),
}));

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock BaseLayout
jest.mock("../screens/BaseLayout", () => {
  return function MockBaseLayout({ children }) {
    return <>{children}</>;
  };
});

const renderWithProviders = (component) => {
  return render(
    <HostUrlContext.Provider value="https://api.example.com">
      <NavigationContainer>{component}</NavigationContainer>
    </HostUrlContext.Provider>
  );
};

describe("CreateQuestionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
    Alert.alert = jest.fn();
  });

  it("renders create question form correctly", () => {
    const { getByPlaceholderText, getByText } = renderWithProviders(
      <CreateQuestionScreen navigation={mockNavigation} />
    );

    expect(getByPlaceholderText("Question Title*")).toBeTruthy();
    expect(getByPlaceholderText("Question Content*")).toBeTruthy();
    expect(getByPlaceholderText("Tags (comma-separated)*")).toBeTruthy();
    expect(getByText("Submit Post")).toBeTruthy();
  });

  it("can be rendered", () => {
    expect(() => {
      renderWithProviders(<CreateQuestionScreen navigation={mockNavigation} />);
    }).not.toThrow();
  });
});
