// HomeScreen.tsx
import React, { useState, useEffect } from "react";
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

const HomePage = ({ navigation }) => {
  const [quizzesForYou, setQuizzesForYou] = useState<Quiz[]>([]);
  const [otherQuizzes, setOtherQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("a1"); // Default difficulty
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

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
        `http://34.55.188.177/api/quizzes?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
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
      const response = await fetch(
        `http://34.55.188.177/api/quizzes?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
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
  // do noth
  const renderOtherQuizzes = ({ item }: { item: Quiz }) => (
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
      {/* Quizzes For You Section */}
      <View style={styles.quizzesForYouHeader}>
        <Text style={styles.sectionTitle}>Quizzes For You</Text>
        <TouchableOpacity
          style={styles.addQuizButton}
          onPress={navigateToQuizCreation}
        >
          <Text style={styles.addQuizButtonText}>+ Add Quiz</Text>
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
      <View style={styles.otherQuizzesContainer}>
        <View style={styles.sectionDivider} />
        {otherQuizzes.length > 0 ? (
          <FlatList
            data={otherQuizzes}
            renderItem={renderOtherQuizzes}
            keyExtractor={(item) => item.id.toString()} // Assuming each quiz has a unique 'id'
            numColumns={2} // To show two items per row
            contentContainerStyle={styles.quizGrid}
            columnWrapperStyle={styles.columnWrapper}
          />
        ) : (
          <Text style={styles.noQuizzesText}>No other quizzes available.</Text>
        )}
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  quizzesForYouHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 280,
    marginTop: 40, // Adjusted from 320 for better layout
    marginBottom: 10,
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
  },
  quizSection: {
    height: 240, // Adjusted for better visibility
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
    // Adjusted styles for better appearance
    // Removed border styles as they are handled in DifficultyLevelDropdown
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginLeft: 15,
    paddingTop: 5,
    marginRight: 15,
  },
  otherQuizzesContainer: {
    flexGrow: 1,
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
  list: {
    paddingBottom: 20,
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
