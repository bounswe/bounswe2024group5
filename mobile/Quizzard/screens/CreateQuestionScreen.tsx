import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/index";
import { Ionicons } from "@expo/vector-icons"; // Ensure you have expo/vector-icons installed
import { useAuth } from "./AuthProvider";

type CreateQuestionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateQuestion"
>;

type Props = {
  navigation: CreateQuestionScreenNavigationProp;
};

const CreateQuestionScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const authContext = useAuth();  // Get the authentication context
  const token = authContext ? authContext.token : null;  // Get the token if authContext is not null

  const fetchQuestionWord = async (word, type) => {
  
    const requestBody = {
      word: word,
      type: type,
    };

    // Change to the correct host:
    const apiUrl = 'http://your-api-url.com/question_word?word=' + word + '&type=' + type;

    try {
      const response = await fetch(
        apiUrl,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Suggestions:", data);
        } else {
          console.error("Failed to fetch suggestions", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
  }
  };

  const handleSubmit = () => {
    // Submit the question to your backend
    // Then navigate back to the previous screen (likely ForumScreen)
    navigation.goBack();
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
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
        placeholder="Question Title"
      />
      <TextInput
        style={styles.descriptionInput}
        value={description}
        onChangeText={setDescription}
        placeholder="Question Description"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Question</Text>
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
  titleInput: {
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
