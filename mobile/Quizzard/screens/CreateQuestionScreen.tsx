// CreateQuestionScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/index";
import { Ionicons } from "@expo/vector-icons";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider"; // Import useAuth

type CreateQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateQuestion"
>;

type Props = {
  navigation: CreateQuestionScreenNavigationProp;
};

const CreateQuestionScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");

  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

  const handleSubmit = async () => {
    if (!title || !content || !tagsInput) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Split the tagsInput by commas and trim whitespace
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      const response = await fetch(`${hostUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token from useAuth
        },
        body: JSON.stringify({
          title: title,
          content: content,
          tags: tagsArray,
        }),
      });

      console.log("Request Body:", {
        title: title,
        content: content,
        tags: tagsArray,
      });

      if (response.status === 201) {
        const data = await response.json();
        // Navigate back to the ForumScreen or show a success message
        navigation.goBack();
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Please log in to submit a question.");
      } else if (response.status === 400) {
        Alert.alert("Error", "Title, content, and tags are required.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      Alert.alert("Error", "Failed to submit the question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Question Title"
      />
      <TextInput
        style={styles.input}
        value={tagsInput}
        onChangeText={setTagsInput}
        placeholder="Tags (comma-separated)"
      />
      <TextInput
        style={styles.descriptionInput}
        value={content}
        onChangeText={setContent}
        placeholder="Question Content"
        multiline
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Question</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateQuestionScreen;
