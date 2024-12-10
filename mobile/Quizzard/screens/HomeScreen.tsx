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
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import DifficultyLevelDropdown from "../components/DifficultyLevelDropdown";
import { useAuth } from "./AuthProvider";
import { Quiz, Question } from "../database/types";
import HostUrlContext from "../app/HostContext";

const calculateQuizDifficultyFromElo = (elo: number) => {
  if (elo < 400) return "A1";
  else if (elo < 1000) return "A2";
  else if (elo < 1800) return "B1";
  else if (elo < 2600) return "B2";
  else if (elo < 3300) return "C1";
  else return "C2";
};

const HomePage = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [quizzesForYou, setQuizzesForYou] = useState<Quiz[]>([]);
  const [otherQuizzes, setOtherQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [otherQuizzesFilterDifficulty, setOtherQuizzesFilterDifficulty] =
    useState("a1"); // Default difficulty
  const authContext = useAuth(); // Get the authentication context
  const [userProfile, setUserProfile] = useState(null);
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null
  const [userElo, setUserElo] = useState(200);
  const [quizAttempts, setQuizAttempts] = useState<Map<number, string>>(
    new Map()
  );
  const [hideCompleted, setHideCompleted] = useState(false);

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

  const fetchQuizAttempts = async () => {
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

      // Create a map of quizId to attempt status
      const attemptsMap = new Map();
      attempts.forEach((attempt) => {
        const existing = attemptsMap.get(attempt.quizId);
        if (attempt.completed) {
          attemptsMap.set(attempt.quizId, "Completed");
        } else if (!existing) {
          attemptsMap.set(attempt.quizId, "In Progress");
        }
      });

      setQuizAttempts(attemptsMap);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // First fetch attempts
        await fetchQuizAttempts();
        // Then fetch quizzes after we have the attempts
        await Promise.all([
          fetchQuizzesForYou(),
          fetchOtherQuizzes(),
          fetchUserProfile(),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [otherQuizzesFilterDifficulty]);

  const fetchQuizzesForYou = useCallback(async () => {
    try {
      const response = await fetch(`${hostUrl}/api/quizzes?page=1&limit=10`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      console.log(data);

      data.quizzes = data.quizzes.map((quiz) => ({
        ...quiz,
        elo: quiz.difficulty,
        difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
        status: quizAttempts.get(quiz.id) || null,
      }));

      // sort the quizzes for being closest to the userElo
      data.quizzes.sort(
        (a, b) => Math.abs(a.elo - userElo) - Math.abs(b.elo - userElo)
      );

      if (response.ok) {
        setQuizzesForYou(data.quizzes);
        console.log("Quizzes for you:", data.quizzes); // TODO: Remove or comment out after debugging
      } else {
        console.error("Failed to fetch quizzes for you", data);
      }
    } catch (error) {
      console.error("Error fetching quizzes for you:", error);
    }
  }, [hostUrl, token, userElo, quizAttempts]);

  const fetchOtherQuizzes = useCallback(async () => {
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
        status: quizAttempts.get(quiz.id) || null,
      }));
      data.quizzes = data.quizzes.filter(
        (quiz) => quiz.difficulty == otherQuizzesFilterDifficulty.toUpperCase()
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
  }, [hostUrl, token, userElo, quizAttempts, otherQuizzesFilterDifficulty]);

  const navigateToQuizCreation = () => {
    navigation.navigate("QuizCreation");
  };

  const navigateToQuiz = (quiz, questions) => {
    navigation.navigate("QuizWelcome", { quiz });
  };

  const renderOtherQuizzes = ({ item }: { item: Quiz }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent
        quiz={item}
        onPress={() => navigateToQuiz(item, item.questions)}
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
          <ActivityIndicator size="large" color="#6a0dad" />
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
          <Text style={styles.sectionTitle}>Quizzes For You</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.hideCompletedButton}
              onPress={() => setHideCompleted(!hideCompleted)}
            >
              <Text style={styles.hideCompletedText}>
                {hideCompleted ? "Show Completed" : "Hide Completed"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addQuizButton}
              onPress={navigateToQuizCreation}
            >
              <Text style={styles.addQuizButtonText}>Create a quiz</Text>
            </TouchableOpacity>
          </View>
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
                onPress={() => navigateToQuiz(quiz, quiz.questions)}
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
    backgroundColor: "#6a0dad",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
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
    color: "#6a0dad",
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
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6a0dad",
  },
  hideCompletedText: {
    color: "#6a0dad",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomePage;
