import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ForumScreen from "../screens/ForumScreen";
import QuizCreationScreen from "../screens/QuizCreationScreen";
import QuizSolvingScreen from "../screens/QuizSolvingScreen";
import QuestionDetailScreen from "../screens/QuestionDetailScreen";
import SearchWordsScreen from "../screens/SearchWordsScreen";
import CreateQuestionScreen from "../screens/CreateQuestionScreen";

import { AuthProvider } from "../screens/AuthProvider";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  QuestionDetail: { questionId: number };
  SearchWords: undefined;
  CreateQuestion: undefined;
  Home: undefined;
  Forum: undefined;
  QuizCreation: undefined;
  QuizSolving: undefined;
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
        name="QuizSolving"
        component={QuizSolvingScreen}
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
