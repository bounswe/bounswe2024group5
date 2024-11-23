import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import questions from "@/mockdata/mockQuizQuestionData";
import { useAuth } from "./AuthProvider";


const ProfileScreen = ({ navigation }) => {
  // Example data - in a real application, this would come from an API
  const userStats = {
    totalPoints: 1250,
    quizHistory: [
      { id: 1, title: "JavaScript Basics", score: 85, date: "2024-03-15" },
      { id: 2, title: "React Native", score: 92, date: "2024-03-14" },
    ],
    createdQuizzes: [
      { id: 1, title: "TypeScript Quiz", difficulty: 1, image: null , description: "string", elo: 7, likes: 3 , questions: [questions[0], questions[1], questions[2]]},
      { id: 2, title: "Mobile Dev Quiz", difficulty: 2, image: null , description: "string", elo: 7, likes: 3 , questions: [questions[0], questions[1], questions[2]]},
      { id: 3, title: "Fruits", difficulty: 3, image: null , description: "string", elo: 7, likes: 3 , questions: [questions[0], questions[1], questions[2]]},
    ],
    posts: [
      { id: 1, title: "React Native Tips", likes: 24 },
      { id: 2, title: "JavaScript Best Practices", likes: 15 },
    ],
  };

  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null;

  const handleEditQuiz = (quizId) => {
    // Navigate to the edit screen or open an edit modal
    navigation.navigate("EditQuizScreen", { quizId: quizId });
  };
  
  const handleDeleteQuiz = async (quizId) => {
    // Add your delete logic here
    Alert.alert(
      "Delete Quiz",
      "Are you sure you want to delete this quiz?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`http://34.55.188.177/api/quizzes/${quizId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.status === 204) {
                Alert.alert("Success", "Quiz deleted successfully!");
                navigation.goBack();
              } else {
                const error = await response.json();
                Alert.alert("Error", error.message || "Failed to delete quiz.");
              }
            } catch (error) {
              Alert.alert("Error", "Could not delete quiz.");
            }
            console.log(`Quiz with ID ${quizId} deleted.`);
          },
        },
      ]
    );
  };

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
            <Text style={styles.points}>
              Total Points: {userStats.totalPoints}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Text style={styles.buttonText}>Profile Settings</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz History</Text>
          {userStats.quizHistory.map((quiz) => (
            <View key={quiz.id} style={styles.card}>
              <Text style={styles.itemTitle}>{quiz.title}</Text>
              <Text style={styles.itemDetail}>
                Score: {quiz.score} - {quiz.date}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>Created Quizzes</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quizScroll}
            contentContainerStyle={styles.quizScrollContent}
          >
            {userStats.createdQuizzes.length > 0 ? (
              userStats.createdQuizzes.map((quiz) => (
                <QuizViewComponent
                  key={quiz.id}
                  quiz={{
                    id: quiz.id,
                    image: quiz.image || "https://via.placeholder.com/150", // Fallback image URL
                    title: quiz.title,
                    questions: quiz.questions || [],
                    difficulty: quiz.difficulty || "Unknown",
                    elo: quiz.elo || 0,
                    likes: quiz.likes || 0,
                  }}
                  onPress={() =>
                    navigation.navigate("MyQuizPreviewScreen", { quizId: quiz.id })
                  }
                  onEdit={() => handleEditQuiz(quiz.id)}
                  onDelete={() => handleDeleteQuiz(quiz.id)}
                  showActions={true} // Show buttons on the profile page
                />
              ))
            ) : (
              <Text style={styles.noQuizzesText}>
                You haven't created any quizzes yet.
              </Text>
            )}
          </ScrollView>
        </View> 

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {userStats.posts.map((post) => (
            <View key={post.id} style={styles.card}>
              <Text style={styles.itemTitle}>{post.title}</Text>
              <Text style={styles.itemDetail}>{post.likes} likes</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    textAlign: "left",
  },
  points: {
    fontSize: 16,
    color: "#6a0dad",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "left",
  },
  settingsButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  quizSection: {
    height: 400,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "left",
  },
  quizScroll: {
    paddingVertical: 8,
  },
  quizScrollContent: {
    paddingHorizontal: 16,
  },
  noQuizzesText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    textAlign: "left",
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
});

export default ProfileScreen;
