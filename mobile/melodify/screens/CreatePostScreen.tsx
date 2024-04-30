import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "./AuthProvider"; // Adjust path as needed
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons


const CreatePostScreen = ({ navigation }) => {
  const { user } = useAuth(); // Destructure to get user from context
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostCreation = async () => {
    if (!postContent.trim()) {
      Alert.alert("Post content is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://api.yourdomain.com/v1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Use token from context
        },
        body: JSON.stringify({
          username: user.username, // Use username from context
          content: postContent,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Your post has been created!");
        navigation.goBack();
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to create post");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
  }
});

export default CreatePostScreen;
