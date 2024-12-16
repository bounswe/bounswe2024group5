import React, { useState, useEffect, useContext } from "react";
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
import HostUrlContext from "../app/HostContext";
import { useAuth } from "../screens/AuthProvider";


const MyQuizzesView = ({ createdQuizzes, onDelete, navigation, deleteFunctionality = true }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [favoritedQuizzes, setFavoritedQuizzes] = useState({});
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const { token } = useAuth();

  // Check favorite status for all quizzes on component mount
  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  // Fetch all favorite quizzes at once
  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`${hostUrl}/api/favorite-quiz`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const favoriteData = await response.json();
        // Create an object with quizId as key and favorite status as value
        const favoriteStatus = favoriteData.reduce((acc, favorite) => ({
          ...acc,
          [favorite.quizId]: true
        }), {});
        setFavoritedQuizzes(favoriteStatus);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavorite = async (quiz) => {
    try {
      if (favoritedQuizzes[quiz.id]) {
        // Remove from favorites
        const response = await fetch(`${hostUrl}/api/favorite-quiz/${quiz.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          setFavoritedQuizzes(prev => ({
            ...prev,
            [quiz.id]: false
          }));
          quiz.noFavorites = Math.max(0, quiz.noFavorites - 1);
        }
      } else {
        // Add to favorites
        const response = await fetch(`${hostUrl}/api/favorite-quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quizId: quiz.id }),
        });

        if (response.status === 201) {
          setFavoritedQuizzes(prev => ({
            ...prev,
            [quiz.id]: true
          }));
          quiz.noFavorites += 1;
        }
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };


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
                <TouchableOpacity
                  onPress={() => handleFavorite(quiz)}
                  style={styles.favoriteButton}
                >
                  <Ionicons
                    name={favoritedQuizzes[quiz.id] ? "heart" : "heart-outline"}
                    size={14}
                    color={favoritedQuizzes[quiz.id] ? "#e0245e" : "#6a0dad"}
                  />
                  <Text style={styles.favoriteCount}>{quiz.noFavorites}</Text>
                </TouchableOpacity>


                {deleteFunctionality && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(quiz.id)}
                  >
                    <Text style={styles.deletebuttonText}>
                      <AntDesignIcon name="delete" size={12} />
                    </Text>
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

      {/* Alert Modal */}
      <Modal
        visible={showAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowAlert(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="information-circle" size={50} color="#e13528" />
            <Text style={styles.modalTitle}>Delete Quiz</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this quiz? This action cannot be
              undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowAlert(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={confirmDelete}
              >
                <Text
                  style={[styles.modalButtonText, styles.continueButtonText]}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteCount: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
  },
});

export default MyQuizzesView;