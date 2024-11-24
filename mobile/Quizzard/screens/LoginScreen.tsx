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
import HostUrlContext from '../app/HostContext';
import HostContext from '../app/HostContext';

const LoginScreen = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [user, setUser] = useState<RegisteredUser | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const { login, token } = useAuth();

  const fetchUserProfile = async (token) => {
    try {
      console.log("username is:", username);
      const response = await fetch(
        `${hostUrl}/api/profile/${username}`, // TODO: fix when endpoint added, Change to the correct host
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      if (response.ok) {
        console.log("User profile data:", user);
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
    if (password === "" || username === "") {
      setErrorMessage("Username and password cannot be empty.");
      setModalVisible(true);
      return;
    }
    const requestBody = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch(
        `${hostUrl}/api/auth/login`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": JSON.stringify(requestBody).length.toString(),
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      if (response.ok) {
        await login(data.token);
        console.log("Logged in successfully");
        fetchUserProfile(data.token);
        const registeredUser = await fetchUserProfile(data.token);
        const userProfile: Profile = {
          name: registeredUser.name,
          score: registeredUser.score,
          profilePicture: registeredUser.profilePicture,
          englishProficiency: registeredUser.englishProficiency,
          createdQuizzes: [],
          favoritedQuizzes: [],
          favoritedQuestions: [],
          posts: [],
        };
        const user: RegisteredUser = {
          username: registeredUser.username,
          password: registeredUser.password,
          email: registeredUser.email,
          profile: userProfile,
        };
        setUser(user);
        console.log("Logged in user:", user);
        navigation.navigate("Home", { registeredUser: user });
      } else {
        setErrorMessage(data.message || "Invalid username/password");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setErrorMessage("Network error. Please try again.");
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
    color: "#6a0dad",
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
    borderColor: "#6a0dad",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#6a0dad",
  },
  loginButton: {
    backgroundColor: "#6a0dad",
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
