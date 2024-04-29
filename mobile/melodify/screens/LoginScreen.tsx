import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "./AuthProvider"; // Ensure correct path
import CustomButton from "../components/CustomButton";
import GradientBackground from "../components/GradientBackground";
import { LinearGradient } from "expo-linear-gradient";

const CustomModal = ({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message: string;
  onClose: () => void;
}) => {
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

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async () => {
    try {
      const response = await fetch("https://api.yourdomain.com/v1/auth/login", {
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
      if (response.status === 200) {
        login(data.token); // Save token using AuthProvider
        navigation.navigate("Home");
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Network or other error:", error);
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
        message="Invalid username/password"
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
