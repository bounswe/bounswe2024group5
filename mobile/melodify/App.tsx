import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FeedPage from "./screens/FeedPage";
import ProfilePage from "./screens/ProfilePage";
import CreatePostScreen from "./screens/CreatePostScreen";
import ProfileSettingsScreen from "./screens/ProfileSettingsScreen";
import SeePostScreen from "./screens/SeePostScreen";
import SearchResultPage from "./screens/SearchResultPage";
import { AuthProvider } from "./screens/AuthProvider";
import CommentScreen from "./screens/CommentScreen";

const Tab = createBottomTabNavigator();

function HomeTabs({ route }) {
  const { registeredUser } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#111927",
        },
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedPage}
        initialParams={{ registeredUser }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        initialParams={{ registeredUser }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

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
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SeePostScreen"
        component={SeePostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResultPage"
        component={SearchResultPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
