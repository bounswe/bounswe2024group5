// RegisterScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
// import { CustomModal } from './LoginScreen';
import { LinearGradient } from "expo-linear-gradient";
import CustomModal from "../components/CustomModal";
import HostUrlContext from '../app/HostContext';
import { Picker } from "@react-native-picker/picker"; // Import Picker
import { useAuth } from "./AuthProvider";

const RegisterScreen = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [englishProficiency, setEnglishProficiency] = useState("a1");
  const { login, token } = useAuth();


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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
      showError(
        "Password must be 8 chars, include an uppercase letter, a lowercase letter, and a number."
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

    const requestBody = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password,
      //TODO uncomment this after endpoint is ready
      //english_proficiency: englishProficiency,
    };
    console.log(requestBody);
    try {
      const response = await fetch(
        `${hostUrl}/api/auth/register`, 
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(requestBody).length.toString(),
          // Host: "34.55.188.177",
        },
        body: JSON.stringify(requestBody),
      });

      const rawData = await response.text();
      console.log(rawData)

      if (response.ok) {
        const data = JSON.parse(rawData);
        console.log(data.message);
        await login(data.token);
        setSuccessModalVisible(true);
      } else {
        const data = rawData;
        switch (response.status) {
          case 400:
            showError(data || "Invalid request. Please check your data.");
            break;
          case 401:
            showError(data || "Unauthorized. Please check your credentials.");
            break;
          case 500:
            showError(data || "Server error. Please try again later.");
            break;
          default:
            showError(
              data || "An unexpected error occurred. Please try again."
            );
            break;
        }
      }
    } catch (error) {
      console.log("Registration failed:", error);
      showError(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <CustomModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
      <CustomModal
        visible={successModalVisible}
        message="Registration successful!"
        onClose={() => {
          setSuccessModalVisible(false);
          navigation.navigate("Home");
        }}
      />
      <Text style={styles.title}>Quizzard</Text>
      <Text style={styles.infoText}>Register to access Quizzard.</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="Surname"
        placeholderTextColor="#aaa"
        value={surname}
        onChangeText={setSurname}
        autoCapitalize="words"
      />

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
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* English Proficiency Picker */}
      <Text style={styles.pickerLabel}>English Proficiency</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={englishProficiency}
          onValueChange={(itemValue) => setEnglishProficiency(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="A1" value="a1" />
          <Picker.Item label="A2" value="a2" />
          <Picker.Item label="B1" value="b1" />
          <Picker.Item label="B2" value="b2" />
          <Picker.Item label="C1" value="c1" />
          <Picker.Item label="C2" value="c2" />

        </Picker>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.registerText}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButton}>Login here</Text>
        </TouchableOpacity>
      </View>
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
  pickerLabel: {
    fontSize: 16,
    color: "#22005d",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#6a0dad",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    color: "#6a0dad",
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
  registerButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  registerButtonText: {
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
  loginButton: {
    fontSize: 16,
    color: "#22005d",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
