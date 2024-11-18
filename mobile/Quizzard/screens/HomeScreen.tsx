import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import DifficultyLevelDropdown from "../components/DifficultyLevelDropdown";
import { useAuth } from "./AuthProvider";
import { Quiz, Question } from "../database/types";
import HostUrlContext from '../app/HostContext';

const HomePage = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  const [quizzesForYou, setQuizzesForYou] = useState<Quiz[]>([]);
  const [otherQuizzes, setOtherQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("a1"); // Default difficulty
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

  const userElo = 2000;

  useEffect(() => {
    // Fetch both quizzes whenever difficulty changes
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchQuizzesForYou(), fetchOtherQuizzes()]);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [difficulty]); // Dependency array includes 'difficulty'

  const fetchQuizzesForYou = async () => {
    try {
      const response = await fetch(
        `${hostUrl}/api/quizzes?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // create dummy image, elo and difficulty while waiting for backend
      const possibleDifficulties = ["a1", "a2", "b1", "b2", "c1", "c2"]
      data.quizzes = data.quizzes.map((quiz) => ({
        ...quiz,
        image: "https://via.placeholder.com/110x110.png?text=Quiz",
        elo: Math.floor(Math.random() * 3000 + 500),
        difficulty: possibleDifficulties[Math.floor(Math.random() * possibleDifficulties.length)],
      }));
       
      // sort the quizzes for being closest to the userElo
      data.quizzes.sort((a, b) => Math.abs(a.elo - userElo) - Math.abs(b.elo - userElo));

      if (response.ok) {
        setQuizzesForYou(data.quizzes);
        console.log("Quizzes for you:", data.quizzes); // TODO: Remove or comment out after debugging
      } else {
        console.error("Failed to fetch quizzes for you", data);
      }
    } catch (error) {
      console.error("Error fetching quizzes for you:", error);
    }
  };

  const fetchOtherQuizzes = async () => {
    try {
      console.log(`Token is ${token}`);
      const response = await fetch(
        `${hostUrl}/api/quizzes?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      // create dummy image, elo and difficulty while waiting for backend
      const possibleDifficulties = ["a1", "a2", "b1", "b2", "c1", "c2"]
      data.quizzes = data.quizzes.map((quiz) => ({
        ...quiz,
        image: "https://via.placeholder.com/110x110.png?text=Quiz",
        elo: Math.floor(Math.random() * 3000 + 500),
        difficulty: possibleDifficulties[Math.floor(Math.random() * possibleDifficulties.length)],
      }));
      // sort the quizzes for being closest to the userElo
      data.quizzes.sort((a, b) => Math.abs(a.elo - userElo) - Math.abs(b.elo - userElo));

      if (response.ok) {
        setOtherQuizzes(data.quizzes);
        console.log("Other quizzes:", data.quizzes); // TODO: Remove or comment out after debugging
      } else {
        console.error("Failed to fetch other quizzes", data);
      }
    } catch (error) {
      console.error("Error fetching other quizzes:", error);
    }
  };

  const navigateToQuizCreation = () => {
    navigation.navigate("QuizCreation");
  };

  const navigateToMockQuiz = (quiz, questions) => {
    navigation.navigate("QuizSolving", { quiz, questions });
  };

  const renderOtherQuizzes = ({ item }: { item: Quiz }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent
        quiz={item}
        onPress={() => navigateToMockQuiz(item, item.questions)}
      />
    </View>
  );

  const renderQuizzesForYou = ({ item }: { item: Quiz }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent
        quiz={item}
        onPress={() => navigateToMockQuiz(item, item.questions)}
      />
    </View>
  );

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
          <TouchableOpacity
            style={styles.addQuizButton}
            onPress={navigateToQuizCreation}
          >
            <Text style={styles.addQuizButtonText}>Create a quiz</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontally Scrollable Quizzes For You */}
        <View style={styles.quizSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quizScroll}
          >
            {quizzesForYou.length > 0 ? (
              quizzesForYou.map((quiz) => (
                <QuizViewComponent
                  key={quiz.id}
                  quiz={quiz}
                  onPress={() => navigateToMockQuiz(quiz, quiz.questions)}
                />
              ))
            ) : (
              <Text style={styles.noQuizzesText}>
                No quizzes available for you.
              </Text>
            )}
          </ScrollView>
        </View>

        {/* Other Quizzes Header with Dropdown */}
        <View style={styles.otherQuizzesHeader}>
          <Text style={styles.sectionTitle}>Other Quizzes</Text>
          <View style={styles.dropdownContainer}>
            <DifficultyLevelDropdown
              selectedValue={difficulty}
              onValueChange={(value) => setDifficulty(value)}
            />
          </View>
        </View>

        {/* Other Quizzes Section */}
        <View style={[styles.otherQuizzesContainer, { flex: 1 }]}>
          <View style={styles.sectionDivider} />
          {otherQuizzes.length > 0 ? (
            <FlatList
              data={otherQuizzes}
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
});

export default HomePage;
