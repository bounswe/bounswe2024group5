import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const QuizFinishScreen = ({ route, navigation }) => {
  const { quiz, questions, selectedAnswers } = route.params;

  // Calculate the results
  const results = questions.reduce(
    (acc, question, index) => {
      const selected = selectedAnswers[index];
      if (selected === undefined || selected === null) {
        acc.empty += 1; // No answer
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Finished!</Text>
      <Text style={styles.quizTitle}>{quiz.title}</Text>

      {/* Results Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Correct:</Text>
          <Text style={[styles.detailsValue, styles.correctText]}>
            {results.correct}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Wrong:</Text>
          <Text style={[styles.detailsValue, styles.wrongText]}>
            {results.wrong}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Empty:</Text>
          <Text style={[styles.detailsValue, styles.emptyText]}>
            {results.empty}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.quizDescriptionButton}
          onPress={() => navigation.pop(2)}
        >
          <Text style={styles.buttonText}>Quiz Description</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reviseQuizButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Revise Answers</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.pop(3)}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 20,
    textAlign: "center",
  },
  quizTitle: {
    fontSize: 24,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  correctText: {
    color: "green",
  },
  wrongText: {
    color: "red",
  },
  emptyText: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  quizDescriptionButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#6B21A8",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  reviseQuizButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#6B21A8",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  homeButton: {
    width: "100%",
    backgroundColor: "#4C1D95",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizFinishScreen;
