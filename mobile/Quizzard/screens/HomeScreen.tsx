// HomePage.js
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import DifficultyLevelDropdown from "../components/DifficultyLevelDropdown";
import { useAuth } from "./AuthProvider";
import { Quiz, Question } from "../database/types";
import HostUrlContext from '../app/HostContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { calculateQuizDifficultyFromElo } from "../components/EloCefrInfoTable";

const HomePage = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [quizzesForYou, setQuizzesForYou] = useState<Quiz[]>([]);
  const [otherQuizzes, setOtherQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [otherQuizzesFilterDifficulty, setOtherQuizzesFilterDifficulty] = useState("a1");
  const authContext = useAuth(); // Get the authentication context
  const [userProfile, setUserProfile] = useState(null);
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null
  const [userElo, setUserElo] = useState(200);
  const [quizAttempts, setQuizAttempts] = useState<Map<number, string>>(
    new Map()
  );
  const [hideCompleted, setHideCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      console.log(`Fetching profile from: ${hostUrl}/api/profile/me`);
      console.log(`Authorization Token: Bearer ${token}`);

      const response = await fetch(`${hostUrl}/api/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("Content-Type");
      const status = response.status;

      console.log(`Response Status: ${status}`);
      console.log(`Content-Type: ${contentType}`);

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Response Data:", data);
        if (response.ok) {
          setUserProfile(data);
          setUserElo(data.score);
        } else {
          // Handle specific error messages from API
          Alert.alert("Error", data.message || "Failed to fetch profile data.");
          console.error("API Error:", data);
          if (status === 401) {
            navigation.navigate("LoginScreen");
          }
        }
      } else {
        // If response is not JSON, log it as text
        const text = await response.text();
        console.error("Non-JSON response:", text);
        Alert.alert("Error", "Unexpected response from the server.");
        if (status === 401) {
          navigation.navigate("LoginScreen");
        }
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  // Fetch quiz attempts
  const fetchQuizAttempts = useCallback(async () => {
    try {
      const response = await fetch(`${hostUrl}/api/quiz-attempts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz attempts");
      }
      const attempts = await response.json();

      const attemptsMap = new Map();
      attempts.forEach((attempt) => {
        const existingStatus = attemptsMap.get(attempt.quizId);
        if (attempt.completed) {
          attemptsMap.set(attempt.quizId, "Completed");
        } else if (!existingStatus && !attempt.completed) {
          attemptsMap.set(attempt.quizId, "In Progress");
        }
      });

      setQuizAttempts(attemptsMap);
      return attemptsMap; // Return the map for immediate use
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
      return new Map(); // Return an empty map on error
    }
  }, [hostUrl, token]);

  // Fetch quizzes for you
  const fetchQuizzesForYou = useCallback(
    async (attemptsMap: Map<number, string>) => {
      try {
        const response = await fetch(`${hostUrl}/api/quizzes?page=1&limit=10`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let data = await response.json();

        data.quizzes = data.quizzes.map((quiz) => ({
          ...quiz,
          elo: quiz.difficulty,
          difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
          status: attemptsMap.get(quiz.id) || null,
        }));

        // Sort the quizzes based on closeness to userElo
        data.quizzes.sort(
          (a, b) => Math.abs(a.elo - userElo) - Math.abs(b.elo - userElo)
        );

        if (response.ok) {
          setQuizzesForYou(data.quizzes);
          console.log("Quizzes for you:", data.quizzes);
        } else {
          console.error("Failed to fetch quizzes for you", data);
        }
      } catch (error) {
        console.error("Error fetching quizzes for you:", error);
      }
    },
    [hostUrl, token, userElo]
  );

  // Fetch other quizzes
  const fetchOtherQuizzes = useCallback(
    async (attemptsMap: Map<number, string>) => {
      try {
        console.log(`Token is ${token}`);
        const response = await fetch(`${hostUrl}/api/quizzes?page=1&limit=10`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        let data = await response.json();
        data.quizzes = data.quizzes.map((quiz) => ({
          ...quiz,
          elo: quiz.difficulty,
          difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
          status: attemptsMap.get(quiz.id) || null,
        }));
        data.quizzes = data.quizzes.filter(
          (quiz) =>
            quiz.difficulty === otherQuizzesFilterDifficulty.toUpperCase()
        );
        data.quizzes.sort(
          (a, b) => Math.abs(a.elo - userElo) - Math.abs(b.elo - userElo)
        );

        if (response.ok) {
          setOtherQuizzes(data.quizzes);
        } else {
          console.error("Failed to fetch other quizzes", data);
        }
      } catch (error) {
        console.error("Error fetching other quizzes:", error);
      }
    },
    [hostUrl, token, userElo, otherQuizzesFilterDifficulty]
  );

  // Main data fetching function
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const attemptsMap = await fetchQuizAttempts(); // Fetch quiz attempts first
        await Promise.all([
          fetchQuizzesForYou(attemptsMap),
          fetchOtherQuizzes(attemptsMap),
          fetchUserProfile(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    fetchQuizAttempts,
    fetchQuizzesForYou,
    fetchOtherQuizzes,
    otherQuizzesFilterDifficulty,
  ]);

  const navigateToQuizCreation = () => {
    navigation.navigate("QuizCreation");
  };

  const navigateToQuiz = (quiz) => {
    if (quiz.status === "Completed") {
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

  const renderOtherQuizzes = ({ item }: { item: Quiz }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent
        quiz={item}
        onPress={() => navigateToQuiz(item)}
        onDelete={() => {}}
        showActions={false}
        status={item.status}
      />
    </View>
  );

  const filterQuizzes = (quizzes) => {
    if (hideCompleted) {
      return quizzes.filter((quiz) => quiz.status !== "Completed");
    }
    return quizzes;
  };

  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6d28d9" />
          <Text style={styles.loadingText}>Loading quizzes...</Text>
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={{ flex: 1 }}>
        {/* Quizzes For You Section */}
        <View style={styles.quizzesForYouHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Quizzes For You</Text>
            <TouchableOpacity
              style={styles.hideCompletedButton}
              onPress={() => setHideCompleted(!hideCompleted)}
            >
              <Ionicons
                name={hideCompleted ? "eye-off" : "eye"}
                size={20}
                color="#fff"
              />
              <Text style={styles.hideCompletedText}>
                {hideCompleted ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addQuizButton}
            onPress={navigateToQuizCreation}
          >
            <Ionicons
              name="pencil"
              size={16}
              color="#fff"
              style={styles.addQuizIcon}
            />
            <Text style={styles.addQuizButtonText}>Create</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontally Scrollable Quizzes For You */}
        <View style={styles.quizSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quizScroll}
          >
            {filterQuizzes(quizzesForYou).map((quiz) => (
              <QuizViewComponent
                key={quiz.id}
                quiz={quiz}
                onPress={() => navigateToQuiz(quiz)}
                onDelete={() => {}}
                showActions={false}
                status={quiz.status}
              />
            ))}
          </ScrollView>
        </View>

        {/* Other Quizzes Header with Dropdown */}
        <View style={styles.otherQuizzesHeader}>
          <Text style={styles.sectionTitle}>Other Quizzes</Text>
          <View style={styles.dropdownContainer}>
            <DifficultyLevelDropdown
              selectedValue={otherQuizzesFilterDifficulty}
              onValueChange={(value) => setOtherQuizzesFilterDifficulty(value)}
            />
          </View>
        </View>

        {/* Other Quizzes Section */}
        <View style={[styles.otherQuizzesContainer, { flex: 1 }]}>
          <View style={styles.sectionDivider} />
          {otherQuizzes.length > 0 ? (
            <FlatList
              data={filterQuizzes(otherQuizzes)}
              renderItem={renderOtherQuizzes}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={[styles.quizGrid, { paddingBottom: 100 }]}
              columnWrapperStyle={styles.columnWrapper}
              style={{ flex: 1 }}
            />
          ) : (
            <Text style={styles.noQuizzesText}>
              No other quizzes available.
            </Text>
          )}
        </View>
      </View>
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
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  quizzesForYouHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "stretch",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addQuizButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8b5cf6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexShrink: 0,
    width: "30%",
  },
  addQuizButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  quizSection: {
    height: 240,
  },
  quizScroll: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  otherQuizzesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: "stretch",
  },
  dropdownContainer: {
    width: "32%",
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginLeft: 15,
    paddingTop: 5,
    marginRight: 15,
  },
  otherQuizzesContainer: {
    paddingHorizontal: 15,
    width: "100%",
  },
  quizGrid: {
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  quizWrapper: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6d28d9",
  },
  noQuizzesText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addQuizIcon: {
    marginRight: 6,
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
    borderRadius: 12,
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
});

export default HomePage;
