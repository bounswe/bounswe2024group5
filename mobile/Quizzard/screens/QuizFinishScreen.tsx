import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const QuizFinishScreen = ({ route, navigation }) => {
  const { quiz, questions, selectedAnswers } = route.params;

  // Calculate correct, wrong, and empty answers
  const results = questions.reduce(
    (acc, question, index) => {
      const selected = selectedAnswers[index];
      if (selected === undefined || selected === null) {
        acc.empty += 1; // Answer not selected
      } else if (selected === question.correctAnswer) {
        acc.correct += 1; // Correct answer
      } else {
        acc.wrong += 1; // Wrong answer
      }
      return acc;
    },
    { correct: 0, wrong: 0, empty: 0 } // Initial counts
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Finished!</Text>
      <Text style={styles.quizTitle}>{quiz.title}</Text>

      {/* Styled container for results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultItem}>
          Correct: <Text style={styles.correctText}>{results.correct}</Text>
        </Text>
        <Text style={styles.resultItem}>
          Wrong: <Text style={styles.wrongText}>{results.wrong}</Text>
        </Text>
        <Text style={styles.resultItem}>
          Empty: <Text style={styles.emptyText}>{results.empty}</Text>
        </Text>
      </View>

      {/* Button to return to the quiz description*/}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() =>
          navigation.pop(2)
        }
      >
        <Text style={styles.homeButtonText}>Go to Quiz Description</Text>
      </TouchableOpacity>

      {/* Optional: Revise the answers */}
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.retryButtonText}>Revise Answers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  quizTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: "#555",
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },
  resultsContainer: {
    backgroundColor: "#f5f3ff", // Light blue background
    padding: 20,
    borderRadius: 15, // Rounded corners
    borderColor: "#8b5c56", // Black outline
    borderWidth: 2,
    width: "90%",
    alignItems: "center",
    marginBottom: 30,
  },
  resultItem: {
    fontSize: 18,
    marginVertical: 5,
    color: "#000",
  },
  correctText: {
    color: "green",
    fontWeight: "bold",
  },
  wrongText: {
    color: "red",
    fontWeight: "bold",
  },
  emptyText: {
    color: "gray",
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  retryButton: {
    backgroundColor: "#555",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizFinishScreen;
