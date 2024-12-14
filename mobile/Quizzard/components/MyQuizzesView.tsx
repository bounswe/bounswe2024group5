import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyQuizzesView = ({ createdQuizzes, onDelete, navigation, deleteFunctionality = true  }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const handleDelete = (id) => {
    setQuizToDelete(id);
    setShowAlert(true);
  };

  const confirmDelete = () => {
    if (quizToDelete) {
      onDelete(quizToDelete);
    }
    setShowAlert(false);
    setQuizToDelete(null);
  };

  return (
    <View style={styles.quizSection}>
      {createdQuizzes && createdQuizzes.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quizScroll}
          contentContainerStyle={styles.quizScrollContent}
        >
          {createdQuizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.card}
              onPress={() => navigation.navigate("QuizWelcome", { quiz })}
            >
              <Text style={styles.itemTitle}>{quiz.title}</Text>
              <Text style={styles.itemDetail}>
                {quiz.questions.length} Questions
              </Text>
              {/* TODO: Convert the following ELO to CEFR */}
              <Text style={styles.itemDetail}>ELO: {quiz.difficulty}</Text>

                            {/* Favorites and Delete Container */}
                            <View style={styles.cardFooter}>
                                <Text style={styles.itemDetail}>
                                    <AntDesignIcon name="like2" size={12} color="#e13528" /> {quiz.noFavorites}
                                </Text>
                                {deleteFunctionality && (
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => onDelete && onDelete(quiz.id)}
                                    >
                                        <AntDesignIcon
                                            name="delete"
                                            size={16}
                                            color="#e13528"
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noDataText}>
                    You haven't created any quizzes yet.
                </Text>
            )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  quizSection: {
    // height: 180,
  },
  quizScroll: {
    paddingVertical: 8,
  },
  quizScrollContent: {
    marginLeft: 4,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontSize: 14,
    marginVertical: 20,
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
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#ede9fe",
    padding: 6,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#ccc",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deletebuttonText: {
    color: "#e13528",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#e13528",
    textAlign: "center",
  },
  modalText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
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
    backgroundColor: "#dc2626",
  },
  continueButtonText: {
    color: "white",
  },
});

export default MyQuizzesView;
