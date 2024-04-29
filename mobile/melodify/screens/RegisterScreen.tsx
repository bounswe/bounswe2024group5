import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import CustomButton from "../components/CustomButton";
import GradientBackground from "../components/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";

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

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (message) => {
    setErrorMessage(message);
    setModalVisible(true);
  };

  const validateInputs = () => {
    if (!name) {
      showError("Name cannot be empty");
      return false;
    }
    if (!surname) {
      showError("Surname cannot be empty");
      return false;
    }
    if (!username) {
      showError("Username cannot be empty");
      return false;
    }
    if (!email) {
      showError("Email cannot be empty");
      return false;
    }
    if (!password) {
      showError("Password cannot be empty");
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      showError(
        "Password must be 8 chars, include an uppercase letter, a lowecase letter, and a number."
      );
      return false;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;
    try {
      const response = await fetch("https://api.yourdomain.com/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          // "Content-Length": "0",
          "Host": "localhost:8080",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        // Handle success, possibly logging in the user directly or redirecting to login screen
        console.log(data.message); // Or handle token as needed
        navigation.navigate("Login");
      } else if (response.status === 400) {
        showError("Bad request. Please check the information provided.");
      } else if (response.status === 409) {
        showError("User already exists. Please try a different username or email.");
      } else {
        showError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      showError("Failed to connect. Please check your network and try again.");
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <CustomModal
          visible={modalVisible}
          message={errorMessage}
          onClose={() => setModalVisible(false)}
        />
        <Text style={styles.title}>Melodify</Text>
        <Text style={styles.subtitle}>Set up your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Surname"
          placeholderTextColor="#ccc"
          value={surname}
          onChangeText={setSurname}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#ccc"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />

        <CustomButton title="Continue" onPress={handleRegister} />

        <View style={styles.signInText}>
          <Text style={styles.normalText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signInButton}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "white",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 50,
  },
  input: {
    width: "90%",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
    textAlign: "left",
    fontSize: 16,
  },
  signInText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  normalText: {
    color: "white",
    fontSize: 16,
  },
  signInButton: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalView: {
    margin: 20,
    width: "80%", // Manage the width of the modal
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
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default RegisterScreen;
