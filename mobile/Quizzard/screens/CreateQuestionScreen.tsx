// CreateQuestionScreen.tsx
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../app/index";
import { Ionicons } from "@expo/vector-icons";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import BaseLayout from "./BaseLayout";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");

  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  /**
   * Handles the submission of the question.
   */
  const handleSubmit = async () => {
    if (!title || !content || !tagsInput) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const tagsArray = tagsInput.split(",").map((tag) => tag.trim());

      const response = await fetch(`${hostUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Include the token
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

      const contentType = response.headers.get("content-type");

      if (response.status === 201) {
        const data =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : null;
        Alert.alert("Success", "Your Post has been submitted.");
        navigation.goBack();
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Please log in to submit a question.");
        // Optionally, navigate to the login screen
        // navigation.navigate("Login");
      } else if (response.status === 400) {
        const errorData =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : null;
        const errorMessage =
          errorData && errorData.error
            ? errorData.error
            : "Title, content, and tags are required.";
        Alert.alert("Error", errorMessage);
      } else {
        const errorText =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        Alert.alert(
          "Error",
          `An unexpected error occurred: ${
            typeof errorText === "string"
              ? errorText
              : JSON.stringify(errorText)
          }`
        );
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      Alert.alert("Error", "Failed to submit the question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Fetches autocomplete suggestions based on the current tag being typed.
   */
  useEffect(() => {
    if (!showSuggestions) return;

    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    const currentTag = tagsArray[tagsArray.length - 1];

    if (currentTag === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsFetchingSuggestions(true);
      try {
        const response = await fetch(
          `${hostUrl}/api/autocomplete?prefix=${encodeURIComponent(
            currentTag
          )}&language=english`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        const contentType = response.headers.get("content-type");

        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const data = await response.json();
          setSuggestions(data);
        } else if (response.status === 401) {
          // Handle unauthorized access
          Alert.alert(
            "Unauthorized",
            "Your session has expired. Please log in again."
          );
          // Optionally, navigate to the login screen
          // navigation.navigate("Login");
          setSuggestions([]);
          setShowSuggestions(false);
        } else {
          // Attempt to parse as text for better error handling
          const text = await response.text();
          console.warn(`Unexpected response format: ${text}`);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsFetchingSuggestions(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300); // Debounce API calls by 300ms

    return () => clearTimeout(timeoutId);
  }, [tagsInput, showSuggestions, hostUrl, token]);

  /**
   * Handles the selection of a suggestion from the dropdown.
   * @param suggestion The selected suggestion.
   */
  const handleSuggestionSelect = (suggestion: string) => {
    const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
    tagsArray[tagsArray.length - 1] = suggestion;
    const newTagsInput = tagsArray.join(", ");
    setTagsInput(newTagsInput);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  /**
   * Handles changes in the tags input field.
   * @param text The new text input.
   */
  const handleTagsInputChange = (text: string) => {
    setTagsInput(text);
    const tagsArray = text.split(",").map((tag) => tag.trim());
    const currentTag = tagsArray[tagsArray.length - 1];
    if (currentTag === "") {
      setShowSuggestions(false);
      setSuggestions([]);
    } else {
      setShowSuggestions(true);
    }
  };

  return (
    <BaseLayout navigation={navigation}>
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Question Title Input */}
        <Text style={styles.title}>Tell us what your post is about.{"\n"}Do not forget to add some tags!</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Question Title*"
        />

        {/* Question Content Input */}
        <TextInput
          style={styles.descriptionInput}
          value={content}
          onChangeText={setContent}
          placeholder="Question Content*"
          multiline
        />

        {/* Tags Input with Autocomplete */}
        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            value={tagsInput}
            onChangeText={handleTagsInputChange}
            placeholder="Tags (comma-separated)*"
          />
          {isFetchingSuggestions && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              <ScrollView keyboardShouldPersistTaps="handled">
                {suggestions.map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    onPress={() => handleSuggestionSelect(suggestion)}
                    style={styles.suggestionItem}
                  >
                    <Text>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Post</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  submitButtonContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 40 : 20, // Extra padding for iOS devices
    backgroundColor: "#fff",
    // Optional: Add shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: "#2e1065",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#2e1065",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#faf5ff',
  },
  descriptionInput: {
    height: 100,
    borderColor: "#2e1065",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    borderRadius: 5,
    backgroundColor: '#faf5ff',
  },
  submitButton: {
    backgroundColor: "#6d28d9",
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
  suggestionsContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 45, // Adjust based on platform
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderColor: "#2e1065",
    borderWidth: 1,
    maxHeight: 150,
    zIndex: 999,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  loadingIndicator: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 12 : 10,
  },
});

export default CreateQuestionScreen;
