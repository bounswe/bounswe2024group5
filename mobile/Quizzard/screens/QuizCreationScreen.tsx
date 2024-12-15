import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import DropdownComponent from "../components/QuestionTypeDropdown";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem for base64 conversion
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";

const QuizCreationPage = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      word: "",
      options: { A: "", B: "", C: "", D: "" },
      questionType: "",
      wordSuggestions: [], // Add per-question suggestions
      showWordSuggestions: false,
      isLoadingWordSuggestions: false,
      answerSuggestions: [],
      showAnswerSuggestions: false,
      isLoadingAnswerSuggestions: false
    }
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store word suggestions
  const [selectedType, setSelectedType] = useState(""); // Default type
  const [typedQuestionWord, setTypedQuestionWord] = useState("");
  const [checkInputTimeoutId, setCheckInputTimeoutId] = useState(-1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setMedia] = useState<string | null>(null);
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;
  const [wordSuggestions, setWordSuggestions] = useState<string[]>([]);
  const [showWordSuggestions, setShowWordSuggestions] = useState(false);
  const [isLoadingWordSuggestions, setIsLoadingWordSuggestions] = useState(false);
  const [answerSuggestions, setAnswerSuggestions] = useState<string[]>([]);
  const [showAnswerSuggestions, setShowAnswerSuggestions] = useState(false);
  const [isLoadingAnswerSuggestions, setIsLoadingAnswerSuggestions] = useState(false);
  const [activeWordSuggestionIndex, setActiveWordSuggestionIndex] = useState<number | null>(null);

  // TODO: Complete the implemenation of the following function once the `file/upload` endpoint is ready

  const uploadFile = async (fileUri: string) => {
    try {
      // Prepare the form data
      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg", // Adjust this based on your file type
        name: "upload.jpg", // You can customize the file name
      });

      // Make the POST request to upload the file
      const response = await fetch(`${hostUrl}/api/file/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        const result = await response.text();
        console.log("File uploaded successfully:", result);
        return result;
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      throw error;
    }
  };

  const pickImageAndUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access media library is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setUploading(true);
      try {
        const fileUrl = await uploadFile(result.assets[0].uri);
        console.log("Uploaded file URL:", fileUrl);
        setImageUrl(fileUrl);
        Alert.alert("Success", "File uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload file:", error);
        Alert.alert("Error", "File upload failed. Try a smaller image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { word: "", options: { A: "", B: "", C: "", D: "" }, questionType: "" },
    ]);
    setSelectedType("");
  };

  const submitQuiz = async () => {
    if (!quizTitle) {
      Alert.alert("Quiz must have a title.");
      return;
    } else if (!questions.length) {
      Alert.alert("Quiz must have at least one question.");
      return;
    }

    const formattedQuestions = questions.map((question) => ({
      questionType: question.questionType,
      word: question.word,
      correctAnswer: question.options.A,
      wrongAnswers: [
        question.options.B,
        question.options.C,
        question.options.D,
      ],
    }));

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      // difficulty: 1,
      image: imageUrl || "/api/placeholder/250/250",
      questions: formattedQuestions,
    };

    if (!token) {
      Alert.alert("Error", "You must be logged in to create a quiz.");
      return;
    }

    console.log(`quiz title is: ${quizData.title} `);
    console.log(`quiz image is: ${quizData.image} `);
    quizData.questions.forEach((question, index) => {
      console.log(`Question ${index + 1}:`);
      console.log(`  Type: ${question.questionType}`);
      console.log(`  Word: ${question.word}`);
      console.log(`  Correct Answer: ${question.correctAnswer}`);
      console.log(`  Wrong Answers: ${question.wrongAnswers.join(", ")}`);
    });

    console.log("Request Body:", JSON.stringify(quizData)); // Log the payload
    const response = await fetch(`${hostUrl}/api/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(quizData).length.toString(),
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quizData),
    });

    if (response.ok) {
      Alert.alert("Success", "Quiz created successfully!");
      navigation.navigate("Home");
    } else {
      const errorMessage = await response.text();
      Alert.alert("Error", `Failed to create quiz: ${errorMessage}`);
    }
  };


  const fetchAnswerSuggestions = async (index, question) => {
    const updatedQuestions = [...questions];

    try {
      // Set loading state for the specific question
      updatedQuestions[index].isLoadingAnswerSuggestions = true;
      setQuestions(updatedQuestions);

      const apiUrl = `${hostUrl}/api/answer-suggestion?word=${encodeURIComponent(question.word)}&questionType=${question.questionType}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        // Ensure we're updating the specific question's state
        const newQuestions = [...questions];
        question.answerSuggestions = data.correctAnswerSuggestions;
        question.showAnswerSuggestions = data.correctAnswerSuggestions.length > 0;
        if (data.wrongAnswerSuggestions.length >= 3) {
          question.options["B"] = data.wrongAnswerSuggestions[0]
          question.options["C"] = data.wrongAnswerSuggestions[1]
          question.options["D"] = data.wrongAnswerSuggestions[2]
        }
        question.isLoadingAnswerSuggestions = false;
        newQuestions[index] = question

        setQuestions(newQuestions);
      } else {
        console.error("Failed to fetch answer suggestions");
      }
    } catch (error) {
      console.error("Error fetching answer suggestions:", error);
    }
  };


  const handleAnswerSuggestionSelect = (index: number, suggestion: string) => {
    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };

    // Set the first option (A) with the selected suggestion
    updatedQuestion.options = {
      ...updatedQuestion.options,
      A: suggestion
    };

    // Reset suggestion-related states for this specific question
    updatedQuestion.answerSuggestions = [];
    updatedQuestion.showAnswerSuggestions = false;

    // Update the questions state
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const handleInputChange = (index: number, word: string) => {
    if (!questions[index].questionType) {
      Alert.alert("Select Type", "Please select a type first.");
      return;
    }
    console.log(word)

    // Update the word in state
    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };
    updatedQuestion.word = word;
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);

    // Only fetch suggestions if word is longer than 1 character
    if (word.length > 1) {
      fetchWordSuggestions(index, updatedQuestion);
    } else {
      // Reset suggestions for short inputs
      updatedQuestion.wordSuggestions = [];
      updatedQuestion.showWordSuggestions = false;
      updatedQuestions[index] = updatedQuestion;
      setQuestions(updatedQuestions);
    }
  };


  // New method to fetch word suggestions
  const fetchWordSuggestions = async (index, question) => {
    const updatedQuestions = [...questions];
    const language = question.questionType.includes('english') ? 'english' : 'turkish';

    try {
      question.isLoadingWordSuggestions = true;
      updatedQuestions[index] = question;
      setQuestions(updatedQuestions);

      const response = await fetch(
        `${hostUrl}/api/autocomplete?prefix=${encodeURIComponent(question.word)}&language=${language}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Ensure we're updating the specific question's state
        const newQuestions = [...questions];
        question.wordSuggestions = data;
        question.showWordSuggestions = data.length > 0;
        question.isLoadingWordSuggestions = false;
        newQuestions[index] = question

        setQuestions(newQuestions);
      } else {
        console.error("Failed to fetch word suggestions");

        const newQuestions = [...questions];
        newQuestions[index].wordSuggestions = [];
        newQuestions[index].showWordSuggestions = false;
        newQuestions[index].isLoadingWordSuggestions = false;

        setQuestions(newQuestions);
      }
    } catch (error) {
      console.error("Error fetching word suggestions:", error);

      const newQuestions = [...questions];
      newQuestions[index].wordSuggestions = [];
      newQuestions[index].showWordSuggestions = false;
      newQuestions[index].isLoadingWordSuggestions = false;

      setQuestions(newQuestions);
    }
  };

  const handleWordSuggestionSelect = (index: number, suggestion: string) => {
    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };

    console.log(index)
    console.log(suggestion)
    // Set the word
    updatedQuestion.word = suggestion;
    updatedQuestion.wordSuggestions = [];
    updatedQuestion.showWordSuggestions = false;

    // Update the question in the state
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    fetchAnswerSuggestions(index, updatedQuestion);
  };


  const updateQuestionType = (index: number, type: string) => {
    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };
    updatedQuestion.questionType = type;
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    setSelectedType(type);
    console.log(
      `2- Question ${index + 1} questionType:`,
      updatedQuestions[index].questionType
    );
  };

  const updateQuestion = (index: number, option: string, text: string) => {
    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };
    updatedQuestion.options = { ...updatedQuestion.options, [option]: text };
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    // console.log(`Question is: ${questions[index].options}`);
    console.log(
      `3- Question ${index + 1} options:`,
      updatedQuestions[index].options
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.appName}>Quizzard</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Login")}
          >
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
      <TouchableOpacity
        style={styles.imageUploadBox}
        onPress={pickImageAndUpload}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10
            }}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.imageUploadText}>
            + Upload Image
          </Text>
        )}
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
          {/* Existing header container */}
          <View style={styles.headerContainer}>
            <TextInput
              style={styles.questionTitle}
              placeholder="Enter a word"
              value={question.word}
              onChangeText={(word) => handleInputChange(index, word)}
            />
            {/* Loading indicator for suggestions */}
            {isLoadingWordSuggestions && (
              <ActivityIndicator
                size="small"
                color="#6a0dad"
                style={styles.suggestionLoadingIndicator}
              />
            )}
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                testID="question-type-dropdown"
                selectedValue={questions[index].questionType}
                onValueChange={(type) => updateQuestionType(index, type)}
              />
            </View>
          </View>

          {/* Word Suggestions Dropdown */}
          {question.showWordSuggestions && question.wordSuggestions.length > 0 && (
            <View style={styles.wordSuggestionsContainer}>
              <FlatList
                data={question.wordSuggestions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.wordSuggestionItem}
                    onPress={() => handleWordSuggestionSelect(index, item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Answer Choices */}
          {["A", "B", "C", "D"].map((option) => (
            <View key={option}>
              <TextInput
                style={styles.choiceInput}
                placeholder={`Choice ${option}`}
                value={question.options[option]}
                editable={option === 'A'}
                onChangeText={(text) => {
                  if (option === 'A') {
                    updateQuestion(index, option, text);
                    // Trigger answer suggestions only for option A
                    fetchAnswerSuggestions(index, questions[index])
                  }
                }}
              />

              {/* Answer Suggestions Dropdown - Only for Option A */}
              {option === 'A' &&
                question.showAnswerSuggestions &&
                question.answerSuggestions.length > 0 && (
                  <View style={styles.answerSuggestionsContainer}>
                    <FlatList
                      data={question.answerSuggestions}
                      keyExtractor={(item) => item}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.answerSuggestionItem}
                          onPress={() => handleAnswerSuggestionSelect(index, item)}
                        >
                          <Text>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                )}
            </View>
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
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={submitQuiz}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wordSuggestionsContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  wordSuggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionLoadingIndicator: {
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100, // Keep extra padding at the bottom
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
    color: "#6d28d9", // Dark purple color for the app name
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
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  dropdownContainer: {
    flex: 1,
  },
  choiceInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  addQuestionButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  addQuestionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  contentContainer: {
    paddingBottom: 100, // Add extra padding to the bottom of the scrollable content
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    zIndex: 10, // Ensure buttons are above other content
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  answerSuggestionsContainer: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    zIndex: 10, // Ensure it appears above other elements
  },
  answerSuggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default QuizCreationPage;
