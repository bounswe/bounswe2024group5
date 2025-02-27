// LoginScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { LinearGradient } from "expo-linear-gradient";
import { RegisteredUser, Profile } from "../database/types";
import CustomModal from "../components/CustomModal";
import HostUrlContext from "../app/HostContext";
import HostContext from "../app/HostContext";

const LoginScreen = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const { login, saveUsername, token } = useAuth();

  const fetchUserProfile = async (token) => {
    try {
      console.log("username is:", username);
      const response = await fetch(`${hostUrl}/api/profile/${username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      if (response.ok) {
        console.log("Login screen - User profile data:", user);
        return user;
      } else {
        console.error("Failed to fetch user profile data", response);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password");
      setModalVisible(true);
      return;
    }

    try {
      const response = await fetch(`${hostUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.token);
        saveUsername(username);
        navigation.navigate("Home");
      } else {
        // Handle specific error messages from the backend
        if (data.message.includes("Username does not exist")) {
          setErrorMessage("Account not found. Please check your username.");
        } else if (data.message.includes("Wrong password")) {
          setErrorMessage("Incorrect password. Please try again.");
        } else {
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzard</Text>
      <Text style={styles.infoText}>
        Login to your account to access Quizzard.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={handleLogin}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerText}>
        <Text style={styles.normalText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerButton}>Register here</Text>
        </TouchableOpacity>
      </View>

      <CustomModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6d28d9",
    textAlign: "center",
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    color: "#22005d", // dark purple color
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6d28d9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#6d28d9",
  },
  loginButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerText: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  normalText: {
    fontSize: 16,
    color: "#22005d",
  },
  registerButton: {
    fontSize: 16,
    color: "#22005d",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
