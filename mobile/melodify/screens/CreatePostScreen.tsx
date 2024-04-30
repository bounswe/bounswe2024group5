import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";

const CreatePostScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePostCreation = async () => {
    // if (!postContent.trim()) {
    //   Alert.alert("Post content is required");
    //   return;
    // }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          placeholderTextColor="#ccc"
          multiline
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePostCreation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        message="Cannot post something now."
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111927",
  },
  inputContainer: {
    marginTop: 20,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    height: 200,
    textAlignVertical: "top",
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  returnButton: {
    marginTop: 20,
    top: 10,
    left: 10,
  },
});

export default CreatePostScreen;
