import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";

const MyQuizAttemptsView = ({ quizHistory, navigation, hideCompleted }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizPress = (quiz) => {
    if (quiz.rawCompleted) {
      setSelectedQuiz(quiz);
      setShowModal(true);
    } else {
      navigation.navigate("QuizWelcome", { quiz });
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    if (selectedQuiz) {
      navigation.navigate("QuizWelcome", { quiz: selectedQuiz });
    }
  };

  const filterQuizzes = (quizzes) => {
    if (hideCompleted) {
      return quizzes.filter((quiz) => quiz.status !== "Completed");
    }
    return quizzes;
  };

  return (
    <View style={styles.section}>
      {/* Info Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={50} color="#059669" />
            <Text style={styles.modalTitle}>Already Completed</Text>
            <Text style={styles.modalText}>
              You've already completed this quiz. You won't receive additional
              points, but you can practice again!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={handleContinue}
              >
                <Text
                  style={[styles.modalButtonText, styles.continueButtonText]}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Quiz List */}
      {quizHistory && quizHistory.length > 0 ? (
        filterQuizzes(quizHistory).map((quiz) => (
          <TouchableOpacity
            key={quiz.attemptId}
            style={styles.card}
            onPress={() => handleQuizPress(quiz)}
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
    color: "#4c1d95",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  continueButton: {
    backgroundColor: "#059669",
  },
  continueButtonText: {
    color: "white",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  hideCompletedButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#059669",
  },
  hideCompletedText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MyQuizAttemptsView;
