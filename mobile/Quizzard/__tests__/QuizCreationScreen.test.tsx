// __tests__/QuizCreationScreen.test.tsx

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import QuizCreationScreen from "../screens/QuizCreationScreen";
import HostUrlContext from "../app/HostContext"; // Adjust path as needed
import { useAuth } from "../screens/AuthProvider"; // Adjust path as needed
import { NavigationContainer } from "@react-navigation/native";
import { Alert } from "react-native";

// Mock 'expo-image-picker' before importing the component
jest.mock("expo-image-picker");

// Mock AuthProvider
jest.mock("../screens/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

// Mock react-native-element-dropdown
jest.mock("react-native-element-dropdown", () => {
  const React = require("react");
  const { View, Text } = require("react-native");
  return {
    Dropdown: ({ label, onSelect, data }: any) => (
      <View>
        {data.map((item: any) => (
          <Text key={item.value} onPress={() => onSelect(item.value)}>
            {item.label}
          </Text>
        ))}
      </View>
    ),
  };
});

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

// Mock useNavigation and useFocusEffect
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }),
    useFocusEffect: jest.fn(),
  };
});

describe("QuizCreationScreen", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    (useAuth as jest.Mock).mockReturnValue({ token: "test-token" });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the quiz creation screen elements", () => {
    const { getByPlaceholderText, getByText } = render(
      <HostUrlContext.Provider value="http://localhost:8080">
        <NavigationContainer>
          <QuizCreationScreen
            navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
          />
        </NavigationContainer>
      </HostUrlContext.Provider>
    );

    // Check if quiz title input is present
    expect(getByPlaceholderText("Untitled Quiz")).toBeTruthy();
    // Check if "Quiz from Favorites" button is present
    expect(getByText("Quiz from Favorites")).toBeTruthy();
    // Check if "+ Upload Image" text is present
    expect(getByText("+ Upload Image")).toBeTruthy();
    // Check if "Enter quiz description..." input is present
    expect(getByPlaceholderText("Enter quiz description...")).toBeTruthy();
    // Check for "+ Question" button
    expect(getByText("+ Question")).toBeTruthy();
    // Check if submit button is present
    expect(getByText("Submit")).toBeTruthy();
  });

  it("shows an alert if trying to submit without a title", async () => {
    const alertMock = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    // Mock GET /api/favorite-question
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });

    const { getByText } = render(
      <HostUrlContext.Provider value="http://localhost:8080">
        <NavigationContainer>
          <QuizCreationScreen
            navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
          />
        </NavigationContainer>
      </HostUrlContext.Provider>
    );

    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Quiz must have a title.");
    });

    alertMock.mockRestore();
  });

  it("allows entering a title and creating a quiz", async () => {
    const alertMock = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    // Mock GET /api/favorite-question
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });

    // Mock POST /api/quizzes
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const { getByText, getByPlaceholderText } = render(
      <HostUrlContext.Provider value="http://localhost:8080">
        <NavigationContainer>
          <QuizCreationScreen
            navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
          />
        </NavigationContainer>
      </HostUrlContext.Provider>
    );

    const titleInput = getByPlaceholderText("Untitled Quiz");
    fireEvent.changeText(titleInput, "My Test Quiz");

    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Success",
        "Quiz created successfully!"
      );
      expect(mockNavigate).toHaveBeenCalledWith("Home");
    });

    alertMock.mockRestore();
  });

  it("handles API errors when submitting quiz", async () => {
    const alertMock = jest.spyOn(Alert, "alert").mockImplementation(() => {});

    // Mock GET /api/favorite-question
    fetchMock.mockResponseOnce(JSON.stringify([]), { status: 200 });

    // Mock POST /api/quizzes with an error
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Failed to create quiz" }),
      { status: 500 }
    );

    const { getByText, getByPlaceholderText } = render(
      <HostUrlContext.Provider value="http://localhost:8080">
        <NavigationContainer>
          <QuizCreationScreen
            navigation={{ navigate: mockNavigate, goBack: mockGoBack }}
          />
        </NavigationContainer>
      </HostUrlContext.Provider>
    );

    const titleInput = getByPlaceholderText("Untitled Quiz");
    fireEvent.changeText(titleInput, "My Test Quiz");

    const submitButton = getByText("Submit");
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Error",
        expect.stringContaining("Failed to create quiz")
      );
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    alertMock.mockRestore();
  });
});
