import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import DropdownComponent from "../components/QuestionTypeDropdown"; 
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";  // Import FileSystem for base64 conversion
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthProvider";

// Define question type for better typing
type Question = {
  title: string;
  choices: { A: string; B: string; C: string; D: string };
  type: string;
};

const QuizCreationPage = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [image, setImage] = useState(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store word suggestions
  const [selectedWord, setSelectedWord] = useState(""); // To store input word
  const [selectedType, setSelectedType] = useState(null); // Default type
  const [checkInputTimeoutId, setCheckInputTimeoutId] = useState(-1);

  const authContext = useAuth(); 
  const token = authContext ? authContext.token : null; 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions, 
      { title: "", choices: { A: "", B: "", C: "", D: "" }, type: selectedType }
    ]);
  };

  const convertImageToBase64 = async (uri: string) => {
    const base64Image = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Image;
  };

  const submitQuiz = async () => {
    if (!quizTitle || !questions.length) {
      alert("Quiz must have a title and at least one question.");
      return;
    }

    let base64Image = null;
    if (image) {
      base64Image = await convertImageToBase64(image);
    }

    const formattedQuestions = questions.map((question) => ({
      question_type: question.type,
      word: question.title,
      correct_answer: question.choices.A,
      wrong_answers: [question.choices.B, question.choices.C, question.choices.D],
    }));

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      image: base64Image,
      questions: formattedQuestions,
    };

    if (!token) {
      alert("You must be logged in to create a quiz.");
      return;
    }

    try {
      const response = await fetch("http://your-api-url.com/quizzes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Quiz created successfully!");
        navigation.goBack();
      } else {
        const errorMessage = await response.text();
        alert(`Failed to create quiz: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
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

  const checkInputWord = async (word: string) => {
    Alert.alert("Invalid Word", "A message is sent to the backend");
    return;
    try {
      const response = await fetch(
        `http://34.55.188.177/api/is_valid_word?word=${word}&type=${selectedType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      const data = await response.json();
  
      if (!data.isValid) {
        Alert.alert("Invalid Word", "Please enter a valid word!");
      } else {
        setSelectedWord(word);
        fetchQuestionWord(word, selectedType);
        fetchQuestionAnswers(word, selectedType, token);
      }
    } catch (error) {
      console.error("Error validating word:", error);
      Alert.alert("Error", "Failed to validate the word. Please try again.");
    }
  }

  const handleInputChange = async (word: string) => {
    if (!selectedType) {
      Alert.alert("Select Type", "Please select a type first.");
      return;
    }
    if (checkInputTimeoutId != -1) {
      clearTimeout(checkInputTimeoutId);
    }
    Console.console.log('====================================');
    console.log();
    console.log('====================================');
    let timeOutId = setTimeout(checkInputWord, 2000)
    setCheckInputTimeoutId(timeOutId);
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
        onPress={submitQuiz}>
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
