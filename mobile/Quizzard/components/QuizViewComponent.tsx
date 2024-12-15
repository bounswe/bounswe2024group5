// QuizViewComponent.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuizViewComponentProps {
  quiz: any;
  onPress: any;
  onDelete: any;
  showActions?: boolean;
  status?: string | null;
}

const QuizViewComponent: React.FC<QuizViewComponentProps> = ({
  quiz,
  onPress,
  onDelete,
  showActions = false,
  status,
}) => {
  return (
    <View style={styles.quizContainer}>
      <TouchableOpacity
        onPress={onPress ? onPress : undefined}
        activeOpacity={onPress ? 0.7 : 1}
      >
        {/* Quiz Image */}
        <Image source={{ uri: quiz.image }} style={styles.quizImage} />

        {/* Status Badge */}
        {status && (
          <View
            style={[
              styles.statusContainer,
              status === "Completed"
                ? styles.completedStatus
                : styles.inProgressStatus,
            ]}
          >
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )}

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
            <Text style={styles.difficultyLevel}>
              ELO: {Math.round(quiz.elo)}
            </Text>
            <View style={styles.likesContainer}>
              <Ionicons name="heart-outline" size={16} color="#6d28d9" />
              <Text style={styles.likeCount}>{quiz.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deletebuttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    width: 140,
    height: 220,
    marginRight: 16,
    backgroundColor: "#ede9fe",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: "visible",
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
    color: "#6d28d9",
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
    color: "#6d28d9",
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
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
    paddingHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: "#ede9fe",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  deletebuttonText: {
    color: "#e13528",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  statusContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedStatus: {
    backgroundColor: "#059669", // green
  },
  inProgressStatus: {
    backgroundColor: "#d97706", // amber
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default QuizViewComponent;
