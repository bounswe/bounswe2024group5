// HomeScreen.tsx
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import mockQuizData from "../mockdata/mockQuizData"; // Adjust the path if necessary
import DropdownComponent from "../components/DifficultyLevelDropdown";
import { useAuth } from "./AuthProvider";

const HomePage = ({ navigation }) => {
  const [quizzesForYou, setQuizzesForYou] = useState([]);
  const [otherQuizzes, setOtherQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const authContext = useAuth();  // Get the authentication context
  const token = authContext ? authContext.token : null;  // Get the token if authContext is not null

  useEffect(() => {
    fetchQuizzesForYou();
    fetchOtherQuizzes();
  }, []);

  const fetchQuizzesForYou = async () => {
    try {
      const response = await fetch(
        "http://34.118.44.165:80/api/quizzes",    // Change to the correct host
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      const data = await response.json();
      if (response.ok) {
        setQuizzesForYou(data.quizzes);
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
        "http://34.118.44.165:80/api/quizzes",    // Change to the correct host
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      const data = await response.json();
      if (response.ok) {
        setOtherQuizzes(data.quizzes);
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

  const navigateToMockQuiz = () => {
    navigation.navigate("QuizSolving");
  };

  const renderOtherQuizzes = ({ item }) => (
    <View style={styles.quizWrapper}>
      <QuizViewComponent quiz={item} onPress={navigateToMockQuiz} />
    </View>
  );

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
          {/* {quizzesForYou.map((quiz, index) => ( */}
          {mockQuizData.map((quiz, index) => (
            <QuizViewComponent
              key={index}
              quiz={quiz}
              onPress={navigateToMockQuiz}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.otherQuizzesHeader}>
        <Text style={styles.sectionTitle}>Other Quizzes</Text>
        <View style={styles.dropdownContainer}>
          <DropdownComponent />
        </View>
      </View>

      {/* Other Quizzes Section */}
      <View style={styles.otherQuizzesContainer}>
        <View style={styles.sectionDivider} />
        <FlatList
          // data={otherQuizzes}
          data={mockQuizData}
          renderItem={renderOtherQuizzes}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // To show two items per row
          contentContainerStyle={styles.quizGrid}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  quizzesForYouHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 320,
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
  },
  quizSection: {
    height: "45%",
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 14,
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
});

export default HomePage;
