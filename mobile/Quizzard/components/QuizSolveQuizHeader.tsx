// QuizSolvingScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuizHeaderProps {
  quizName: string;
  questionIndex: number;
  totalQuestions: number;
  onFavorite?: () => void;
  isFavorited?: boolean;
}

const QuizHeader = ({
  quizName,
  questionIndex,
  totalQuestions,
  onFavorite,
  isFavorited,
}: QuizHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerBox}>
          <Text style={styles.quizName}>{quizName}</Text>
        </View>
        <View style={styles.headerBox}>
          <Text style={styles.questionCountText}>
            Question {questionIndex + 1} / {totalQuestions}
          </Text>
        </View>
      </View>

      {onFavorite && (
        <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
          <View style={styles.favoriteContent}>
            <Text style={styles.favoriteText}>Add To Favorite Questions</Text>
            <Ionicons
              name={isFavorited ? "heart" : "heart-outline"}
              size={24}
              color="#6a0dad"
              style={styles.heartIcon}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerBox: {
    backgroundColor: "#ede9fe",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    opacity: 0.9,
  },
  quizName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4c1d95",
  },
  questionCountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  favoriteButton: {
    backgroundColor: "#f5f3ff",
    padding: 10,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  favoriteContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteText: {
    color: "#6a0dad",
    fontSize: 16,
    marginRight: 8,
  },
  heartIcon: {
    marginLeft: 4,
  },
});

export default QuizHeader;
