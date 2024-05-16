import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./AuthProvider";
import CustomButton from "../components/CustomButton";
import GradientBackground from "../components/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";
import { RegisteredUser } from '../database/types';
import { Profile } from '../database/types';

const CustomModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <LinearGradient
          colors={["#111927", "#192f6a", "#111927"]}
          style={styles.modalView}
        >
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message
  const { login, token } = useAuth();
  const [registeredUser, setUserData] = useState(null);

  const fetchUserProfile = async () => {
    try {
      console.log('token is:', token)
      const response = await fetch(`http://34.118.44.165:80/api/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // console.log("User profile data:", user);
      if (response.ok) {
        setUserData(user);
      } else {
        // It currently enters here...
        console.error("Failed to fetch user profile data", response);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSignIn = async () => {
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
      const response = await fetch("http://34.118.44.165:80/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(requestBody).length.toString(),
          Host: "34.118.44.165:80",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token);
        // navigation.navigate("Home");
        console.log("Logged in successfully");
        // fetchUserProfile();
        const userProfile: Profile = {
          name: 'John',
          surname: 'Doe',
          bio: 'I am a music lover',
          private: false,
          followers: 50,
          following: 100,
        };
        const user: RegisteredUser = {
          username: 'JohnDoe',
          password: 'password',
          email: 'john@gmail.com',
          profile: userProfile,
        };
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
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Melodify</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
          <CustomButton title="Sign In" onPress={handleSignIn} />
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 0,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 0,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  buttonClose: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "#111927",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
