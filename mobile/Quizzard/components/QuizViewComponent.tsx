// QuizViewComponent.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const QuizViewComponent = ({ quiz, onPress }) => {
  return (
    <View style={styles.quizContainer}>
      <TouchableOpacity
        onPress={onPress ? onPress : undefined}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {/* Quiz Image */}
        <Image source={{ uri: quiz.image }} style={styles.quizImage} />

        {/* Quiz Details */}
        <View style={styles.quizDetails}>
          <View style={styles.quizInfoHeader}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <Text style={styles.quizQuestions}>
              {quiz.questions.length} Questions
            </Text>
          </View>
          <View style={styles.quizInfo}>
            <Text style={styles.difficultyLevel}>{quiz.difficulty}</Text>
            <Text style={styles.difficultyLevel}> | </Text>
            <Text style={styles.difficultyLevel}>ELO: {quiz.elo}</Text>
            <View style={styles.likesContainer}>
              <Ionicons name="heart-outline" size={16} color="#6a0dad" />
              <Text style={styles.likeCount}>{quiz.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    width: 140,
    height: 220,
    marginRight: 16,
    backgroundColor: "#f3e8ff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  quizImage: {
    width: "100%",
    height: 110,
  },
  quizDetails: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 110,
  },
  quizInfoHeader: {
    flexDirection: "column",
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6b21a8",
    marginBottom: 5,
  },
  quizQuestions: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  quizInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  difficultyLevel: {
    fontSize: 14,
    color: "#6a0dad",
    fontWeight: "bold",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 3,
    fontSize: 14,
    color: "#888",
  },
});

export default QuizViewComponent;
