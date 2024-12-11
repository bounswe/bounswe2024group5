import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import BaseLayout from "./BaseLayout";

const QuizWelcomePage = ({ route, navigation }) => {
  const { quiz } = route.params; // Get the quiz data passed from navigation
  const questions = quiz.questions;

  // Handle button actions
  const handleGoBack = () => {
    navigation.goBack(); // Goes back to the previous screen
  };

  const handleStartQuiz = () => {
    navigation.navigate("QuizSolving", { quiz, questions });
  };

  return (
    <BaseLayout navigation={navigation}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Quiz Image */}
          <Image source={{ uri: quiz.image }} style={styles.quizImage} />

          {/* Quiz Title */}
          <Text style={styles.title}>{quiz.title}</Text>

          {/* Quiz Description */}
          <Text style={styles.description}>{quiz.description}</Text>

          {/* Quiz Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailsLabel}>Difficulty:</Text>
              <Text style={styles.detailsValue}>{quiz.difficulty}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.detailsLabel}>Elo:</Text>
              <Text style={styles.detailsValue}>{quiz.elo}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.detailsLabel}>Created by:</Text>
              <Text style={styles.detailsValue}>{quiz.username}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.detailsLabel}>Created at:</Text>
              <Text style={styles.detailsValue}>{new Date(quiz.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.detailRow}>
              <Text style={styles.detailsLabel}>Updated at:</Text>
              <Text style={styles.detailsValue}>{quiz.updatedAt}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  quizImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4C1D95",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  detailsValue: {
    fontSize: 14,
    color: "#777",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  goBackButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#D1D5DB",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  startQuizButton: {
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizWelcomePage;
