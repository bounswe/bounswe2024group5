import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import DropdownComponent from "../components/QuestionTypeDropdown"; // Adjust path if necessary
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthProvider";

const QuizCreationPage = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // Store word suggestions
  const [selectedWord, setSelectedWord] = useState(""); // To store input word
  const [selectedType, setSelectedType] = useState("Eng -> Tr"); // Default type

  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

  // Function to handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Function to handle adding a new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions, 
      { title: "", choices: { A: "", B: "", C: "", D: "" }, type: selectedType }
    ]);
  };

  // Fetch question word suggestions
  const fetchQuestionWord = async (word, type) => {
    const apiUrl = `http://your-api-url.com/question_word?word=${word}&type=${type}`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data); // Store the suggestions
        console.log("Suggestions:", data);
      } else {
        console.error("Failed to fetch suggestions", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Fetch question answers
  const fetchQuestionAnswers = async (
    word: string, 
    type: 'english_to_turkish' | 'turkish_to_english' | 'english_to_sense', 
    token: string
  ): Promise<void> => {
    try {
      const apiUrl = `http://your-api-url.com/question_answers?word=${encodeURIComponent(word)}&type=${type}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          const updatedQuestions = [...questions];
          const newChoices = {
            A: data.correct_answer,
            B: data.wrong_answer1,
            C: data.wrong_answer2,
            D: data.wrong_answer3,
          };
          updatedQuestions[questions.length - 1].choices = newChoices; // Update choices for the latest question
          setQuestions(updatedQuestions);
        }
      } else {
        console.error("Failed to fetch question answers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching question answers:", error);
    }
  };

  // Handle input change to fetch word suggestions and question answers
  const handleInputChange = (word) => {
    setSelectedWord(word);
    fetchQuestionWord(word, selectedType);
    fetchQuestionAnswers(word, selectedType, token); // Fetch answers based on word and type
  };

  // Update question data
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = () => {
    console.log("Quiz Created:", quizTitle, quizDescription, questions);
    navigation.goBack(); // Navigate back to the home page after quiz creation
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back to the home page
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.appName}>Quizzard</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Login")}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Untitled Quiz"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      {/* Image Upload Box */}
      <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
        <Text style={styles.imageUploadText}>
          {image ? "Image Uploaded" : "+ Upload Image"}
        </Text>
      </TouchableOpacity>

      {/* Description Input */}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter quiz description..."
        value={quizDescription}
        onChangeText={setQuizDescription}
        multiline
      />

      {/* Render all question boxes */}
      {questions.map((question, index) => (
        <View key={index} style={styles.questionBox}>
          {/* Header with Title and Dropdown */}
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.questionTitle}
              placeholder="Enter a word"
              value={selectedWord}
              onChangeText={handleInputChange}
            />
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                selectedValue={selectedType}
                onValueChange={(type) => setSelectedType(type)}
              />
            </View>
          </View>

          {/* Display suggestions */}
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={styles.suggestionText}>{item}</Text>
              )}
            />
          )}

          {/* Answer Choices */}
          {["A", "B", "C", "D"].map((option) => (
            <TextInput
              key={option}
              style={styles.choiceInput}
              placeholder={`Choice ${option}`}
              value={question.choices[option]} // Now choices will be populated from the API response
              onChangeText={(text) => updateQuestion(index, option, text)}
            />
          ))}
        </View>
      ))}

      {/* + Question Button */}
      <TouchableOpacity
        style={styles.addQuestionButton}
        onPress={handleAddQuestion}
      >
        <Text style={styles.addQuestionButtonText}>+ Question</Text>
      </TouchableOpacity>

      {/* Bottom Cancel and Submit Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log("Quiz Created:", quizTitle, quizDescription, questions)}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6a0dad", // Dark purple color for the app name
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageUploadBox: {
    width: "100%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10, // Rounded corners for cleaner look
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  imageUploadText: {
    fontSize: 16,
    color: "#888",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: "top",
    height: 100,
  },
  questionBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  questionTitle: {
    flex: 1,
    fontSize: 14,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
  dropdownContainer: {
    width: "42%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 14,
  },
  dropdown: {
    height: 40,
  },
  choiceInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  addQuestionButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginBottom: 40,
  },
  addQuestionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QuizCreationPage;
