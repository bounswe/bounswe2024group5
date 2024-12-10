import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]); // Store word suggestions
  const [selectedType, setSelectedType] = useState(""); // Default type
  const [checkInputTimeoutId, setCheckInputTimeoutId] = useState(-1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [image, setMedia] = useState<string | null>(null);
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

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

  // Fetch question word suggestions
  const fetchQuestionWord = async (word, type) => {
    const apiUrl = `${hostUrl}/api/question_word?word=${word}&type=${type}`;
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
    type: "english_to_turkish" | "turkish_to_english" | "english_to_sense",
    token: string
  ): Promise<void> => {
    try {
      const apiUrl = `${hostUrl}/api/question_answers?word=${encodeURIComponent(
        word
      )}&type=${type}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
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
          updatedQuestions[questions.length - 1].options = newChoices; // Update options for the latest question
          setQuestions(updatedQuestions);
        }
      } else {
        console.error("Failed to fetch question answers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching question answers:", error);
    }
  };

  const checkInputWord = async () => {
    let word = typedQuestionWord;
    try {
      const response = await fetch(
        `${hostUrl}/api/word-checker?word=${word}&type=${selectedType}`,
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
        // setSelectedWord(word);
        fetchQuestionWord(word, selectedType);
        fetchQuestionAnswers(word, selectedType, token);
      }
    } catch (error) {
      console.error("Error validating word:", error);
      Alert.alert("Error", "Failed to validate the word. Please try again.");
    }
  };

  const handleInputChange = (index: number, word: string) => {
    if (!selectedType) {
      Alert.alert("Select Type", "Please select a type first.");
      return;
    }

    // if (checkInputTimeoutId != -1) {
    //   clearTimeout(checkInputTimeoutId);
    // }
    // console.log('====================================');
    // console.log();
    // console.log('====================================');
    // let timeOutId = setTimeout(checkInputWord, 2000)
    // setCheckInputTimeoutId(timeOutId);

    const updatedQuestions = [...questions];
    const updatedQuestion = { ...updatedQuestions[index] };
    updatedQuestion.word = word;
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    console.log(`1- Question ${index + 1} word:`, updatedQuestions[index].word);
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
              onChangeText={(word) => handleInputChange(index, word)}
            />
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                testID="question-type-dropdown"
                selectedValue={questions[index].questionType}
                onValueChange={(type) => updateQuestionType(index, type)}
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
              value={question.options[option]} // Now options will be populated from the API response
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
