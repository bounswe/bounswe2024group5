import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ForumScreen from "../screens/ForumScreen";
import QuizCreationScreen from "../screens/QuizCreationScreen";
import QuizSolvingScreen from "../screens/QuizSolvingScreen";
import QuestionDetailScreen from "../screens/QuestionDetailScreen";
import SearchWordsScreen from "../screens/SearchWordsScreen";
import CreateQuestionScreen from "../screens/CreateQuestionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import QuizWelcomePage from "../screens/QuizWelcomePage";
import QuizFinishScreen from "../screens/QuizFinishScreen"; // Import the finish screen
import { AuthProvider } from "../screens/AuthProvider";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import OtherUserProfileScreen from "../screens/OtherUserProfileScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  QuestionDetail: {
    questionId: number;
    title: string;
    content: string;
    username?: string;
    noUpvote?: number;
    createdAt?: string;
  };
  SearchWords: undefined;
  CreateQuestion: undefined;
  Home: undefined;
  Forum: undefined;
  QuizCreation: undefined;
  QuizSolving: undefined;
  QuizFinish: {
    quiz: {
      title: string;
      description: string;
      difficulty: string;
      elo: number;
      id: number;
      image: string;
      questions: any[];
      createdAt: string;
      updatedAt: string;
      username: string;
    };
    questions: any[];
    selectedAnswers: string[];
    alreadyFinished: boolean;
  };
  Profile: undefined;
  ProfileSettings: undefined;
  OtherUserProfileScreen: undefined;
  QuizWelcome: {
    quiz: {
      title: string;
      description: string;
      difficulty: string;
      elo: number;
      id: number;
      image: string;
      questions: any[];
      createdAt: string;
      updatedAt: string;
      username: string;
    };
  };
  SearchResults: { keyword: string };
  Leaderboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forum"
        component={ForumScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizCreation"
        component={QuizCreationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizWelcome"
        component={QuizWelcomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={({ route }) => ({
          title: `Search: "${route.params.keyword}"`,
        })}
      />
      <Stack.Screen
        name="QuizSolving"
        component={QuizSolvingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizFinish"
        component={QuizFinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuestionDetail"
        component={QuestionDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchWords"
        component={SearchWordsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateQuestion"
        component={CreateQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtherUserProfileScreen"
        component={OtherUserProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
