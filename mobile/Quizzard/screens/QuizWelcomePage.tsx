import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";
import BaseLayout from "./BaseLayout";

const QuizWelcomePage = ({ route, navigation }) => {
  const { quiz } = route.params; // Get the quiz data passed from navigation
    const questions = quiz.questions;
  console.log(questions);

  // Handle button actions
  const handleGoBack = () => {
    navigation.goBack(); // Goes back to the previous screen
  };

  const handleStartQuiz = () => {
    // Navigate to the QuizSolving screen or whichever screen you want to start the quiz on
    navigation.navigate('QuizSolving', { quiz, questions });
  };

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Quiz Image */}
        <Image
          source={{ uri: quiz.image }}
          style={styles.quizImage}
        />

        {/* Quiz Title */}
        <Text style={styles.title}>{quiz.title}</Text>

        {/* Quiz Description */}
        <Text style={styles.description}>{quiz.description}</Text>

        {/* Quiz Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Difficulty: {quiz.difficulty}</Text>
          <Text style={styles.detailsText}>Elo: {quiz.elo}</Text>
          <Text style={styles.detailsText}>Created by: {quiz.username}</Text>
          <Text style={styles.detailsText}>Created at: {quiz.createdAt}</Text>
          <Text style={styles.detailsText}>Updated at: {quiz.updatedAt}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <Button title="Go Back" onPress={handleGoBack} />
          <Button title="Start Quiz" onPress={handleStartQuiz} />
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  quizImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  detailsText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  buttonsContainer: {
    marginTop: 30,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default QuizWelcomePage;
