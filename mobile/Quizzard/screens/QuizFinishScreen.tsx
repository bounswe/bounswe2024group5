import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import QuizViewComponent from "../components/QuizViewComponent";
import { Quiz } from "../database/types";
import Ionicons from "react-native-vector-icons/Ionicons";
import { calculateQuizDifficultyFromElo } from "../components/EloCefrInfoTable";

const QuizFinishScreen = ({ route, navigation }) => {
  const { quiz, questions, selectedAnswers, alreadyFinished } = route.params;
  const [recommendedQuizzes, setRecommendedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const hostUrl = useContext(HostUrlContext);
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;
  const [showRecommended, setShowRecommended] = useState(false);

  // Calculate the results
  const results = questions.reduce(
    (acc, question, index) => {
      const selected = selectedAnswers[index];
      if (selected === undefined || selected === null) {
        acc.empty += 1;
      } else if (selected === question.correctAnswer) {
        acc.correct += 1;
      } else {
        acc.wrong += 1;
      }
      return acc;
    },
    { correct: 0, wrong: 0, empty: 0 }
  );

  useEffect(() => {
    const fetchRecommendedQuizzes = async () => {
      try {
        const response = await fetch(
          `${hostUrl}/api/quizzes/${quiz.id}/recommended`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const processedQuizzes = data.map((quiz) => ({
            ...quiz,
            elo: quiz.difficulty,
            difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
          }));
          setRecommendedQuizzes(processedQuizzes);
        }
      } catch (error) {
        console.error("Error fetching recommended quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedQuizzes();
  }, [quiz.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz Finished!</Text>
      <Text style={styles.quizTitle}>{quiz.title}</Text>

      {/* Results Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Correct:</Text>
          <Text style={[styles.detailsValue, styles.correctText]}>
            {results.correct}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Wrong:</Text>
          <Text style={[styles.detailsValue, styles.wrongText]}>
            {results.wrong}
          </Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.detailRow}>
          <Text style={styles.detailsLabel}>Empty:</Text>
          <Text style={[styles.detailsValue, styles.emptyText]}>
            {results.empty}
          </Text>
        </View>
      </View>

      {/* Recommended Quizzes Section */}
      {loading ? (
        <ActivityIndicator size="large" color="#6a0dad" style={styles.loader} />
      ) : recommendedQuizzes.length > 0 ? (
        <View style={styles.recommendedSection}>
          <TouchableOpacity
            style={styles.recommendedHeader}
            onPress={() => setShowRecommended(!showRecommended)}
          >
            <Text style={styles.recommendedTitle}>Recommended Quizzes</Text>
            <Ionicons
              name={showRecommended ? "chevron-up" : "chevron-down"}
              size={24}
              color="#4C1D95"
            />
          </TouchableOpacity>
          {showRecommended && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.recommendedScroll}
            >
              {recommendedQuizzes.map((recommendedQuiz) => (
                <View
                  key={recommendedQuiz.id}
                  style={styles.recommendedQuizWrapper}
                >
                  <QuizViewComponent
                    quiz={recommendedQuiz}
                    onPress={() =>
                      navigation.navigate("QuizWelcome", {
                        quiz: recommendedQuiz,
                      })
                    }
                    onDelete={() => {}}
                    showActions={false}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      ) : null}

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.quizDescriptionButton}
          onPress={() => navigation.pop(2)}
        >
          <Text style={styles.buttonText}>Quiz Description</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reviseQuizButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Revise Answers</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.pop(3)}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 20,
    textAlign: "center",
  },
  quizTitle: {
    fontSize: 24,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  correctText: {
    color: "green",
  },
  wrongText: {
    color: "red",
  },
  emptyText: {
    color: "gray",
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  quizDescriptionButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "#6B21A8",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  reviseQuizButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#6B21A8",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  homeButton: {
    width: "100%",
    backgroundColor: "#4C1D95",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recommendedSection: {
    marginTop: 30,
    width: "100%",
    marginBottom: 30,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  recommendedScroll: {
    paddingLeft: 15,
    paddingBottom: 20,
  },
  recommendedQuizWrapper: {
    marginRight: 15,
  },
  loader: {
    marginTop: 20,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
});

export default QuizFinishScreen;
