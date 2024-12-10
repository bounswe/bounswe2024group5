import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const MyQuizAttemptsView = ({ quizHistory, navigation }) => {
  return (
    <View style={styles.section}>
      {quizHistory && quizHistory.length > 0 ? (
        quizHistory.map((quiz) => (
          <TouchableOpacity
            key={quiz.attemptId}
            style={styles.card}
            onPress={() => navigation.navigate("QuizWelcome", { quiz })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.itemTitle}>{quiz.title}</Text>
              <Text style={styles.scoreText}>
                {quiz.score !== null ? `+${quiz.score} pts` : ""}
              </Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.itemDetail}>
                Last activity: {quiz.completedAt}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  quiz.status === "Completed"
                    ? styles.completedStatus
                    : styles.inProgressStatus,
                ]}
              >
                {quiz.status}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noDataText}>No quiz history available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#2e1065",
    marginBottom: 15,
    textAlign: "left",
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontSize: 14,
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  card: {
    backgroundColor: "#ede9fe",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderColor: "#4c1d95",
    borderWidth: 0.5,
    marginHorizontal: 4,
  },
  itemTitle: {
    fontSize: 16,
    color: "#4c1d95",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  itemDetail: {
    fontSize: 12,
    color: "#666",
    textAlign: "left",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6a0dad",
    marginLeft: 10,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  completedStatus: {
    color: "#059669", // green
  },
  inProgressStatus: {
    color: "#d97706", // amber
  },
});

export default MyQuizAttemptsView;
