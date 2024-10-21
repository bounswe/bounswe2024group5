// QuizSolvingScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon
import QuizHeader from "../components/QuizSolveQuizHeader";

const QuizSolvingScreen = ({ route, navigation }) => {
  const { quiz, questions } = route.params; // Access the passed data
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [curentQuestionIsAnswered, setCurentQuestionIsAnswered] =
    useState(false);
  const question = questions[questionIndex];

  const handleAnswer = (answer) => {
    if (curentQuestionIsAnswered) return;
    selectedAnswers.push(answer);
    setSelectedAnswers(selectedAnswers);
    setCurentQuestionIsAnswered(true);
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurentQuestionIsAnswered(false);
    } else {
      Alert.alert("Quiz Completed!", "You have finished the quiz!");
      navigation.goBack(); // Navigate back when quiz is completed
    }
  };

  const generateQuestionSentence = (question): string => {
    // const generateQuestionSentence = (question_type: 'english_to_turkish' | 'turkish_to_english' | 'english_to_sense', word: string): string => {
    console.log("Question: ", question.questionType, question.word);
    if (question.questionType === 'english_to_turkish') {
      return `How do you say '${question.word}' in Turkish?`;
    } else if (question.questionType === 'turkish_to_english') {
      return `How do you say '${question.word}' in English?`;
    } else {
      return "Invalid question type";
    }
  };
  
  let answers = [question.correctAnswer];
  question.wrongAnswers.forEach((answer) => answers.push(answer));
  console.log("Answers:", answers);
  return (
    <View style={styles.container}>
      <QuizHeader
        quizName={quiz.title} //TODO: add laters
        questionIndex={questionIndex}
        totalQuestions={questions.length}
      />
      <View style={styles.roundQuestionContainer}>
        <Text style={styles.questionText}>{generateQuestionSentence(question)}</Text>
        <Text style={styles.questionText}>{question.body}</Text>
        {answers.map((answer, index) => {
          let backgroundColor;
          if (!curentQuestionIsAnswered) {
            backgroundColor = "#FFFFFF"; // Match the background color
          } else {
            if (answer === question.correctAnswer) {
              backgroundColor = "#6a0dad"; // Correct answer
            } else if (answer === selectedAnswers[selectedAnswers.length - 1]) {
              backgroundColor = "red"; // Selected answer
            } else {
              backgroundColor = "#FFFFFF"; // Match the background color
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor }]}
              onPress={() => handleAnswer(answer)}
            >
              <Text style={styles.buttonText}>{answer}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Container for Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={!curentQuestionIsAnswered}
        >
          {/* Replace text with right-pointing arrow icon */}
          <Icon name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>

      </View>
        {/* Cancel and Submit Buttons */}
        <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.goBack()}>
         {/*Upon submission of the quiz, navigate back to the home screen for now*/}
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF", // Set the background color
  },
  roundQuestionContainer: {
    backgroundColor: "#d3d3d3", // Light grey background color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners
    opacity: 0.9, // Slight opacity
    marginTop: 40,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderColor: "#000000", // Dark outline
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000", // Text color
    fontSize: 16,
  },
  nextButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns the button to the right
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 60, // Adjust for smaller button size
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
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

export default QuizSolvingScreen;
