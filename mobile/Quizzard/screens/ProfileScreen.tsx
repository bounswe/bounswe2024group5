import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import BaseLayout from "./BaseLayout";
import QuizViewComponent from "../components/QuizViewComponent";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ route, navigation }) => {
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, ""); // Remove trailing slash
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null;

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    setLoading(true); // Ensure loading indicator shows during fetch
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Re-fetch profile data when the screen gains focus
      fetchUserProfile();
    }, [])
  );

  const handleEditQuiz = (quizId) => {
    // Navigate to the edit screen or open an edit modal
    navigation.navigate("EditQuizScreen", {
      username: userProfile.username,
      quizId: quizId,
    });
  };

  const handleDeleteQuiz = async (quizId) => {
    // Add your delete logic here
    Alert.alert("Delete Quiz", "Are you sure you want to delete this quiz?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `${hostUrl}/api/quizzes/${quizId}`, // Ensure correct path
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 204) {
              Alert.alert("Success", "Quiz deleted successfully!");
              // Refresh the profile to reflect the deleted quiz
              fetchUserProfile();
            } else {
              const error = await response.json();
              Alert.alert("Error", error.message || "Failed to delete quiz.");
              console.error("Delete Quiz Error:", error);
            }
          } catch (error) {
            Alert.alert("Error", "Could not delete quiz.");
            console.error(`Error deleting quiz with ID ${quizId}:`, error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a0dad" />
          <Text>Loading...</Text>
        </View>
      </BaseLayout>
    );
  }

  if (!userProfile) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile data.</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchUserProfile}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </BaseLayout>
    );
  }

  const {
    name,
    email,
    score,
    createdQuizzes,
    quizHistory,
    posts,
    profilePicture,
    username,
  } = userProfile;

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={{
              uri: profilePicture || "https://via.placeholder.com/120", // Default image
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.points}>Total Points: {score}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() =>
            navigation.navigate("ProfileSettings", { username: username })
          }
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>Created Quizzes</Text>
          {createdQuizzes && createdQuizzes.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.quizScroll}
              contentContainerStyle={styles.quizScrollContent}
            >
              {createdQuizzes.map((quiz) => (
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
                    navigation.navigate("MyQuizPreviewScreen", {
                      username: username,
                      quizId: quiz.id,
                    })
                  }
                  onEdit={() => handleEditQuiz(quiz.id)}
                  onDelete={() => handleDeleteQuiz(quiz.id)}
                  showActions={true} // Show buttons on the profile page
                />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noQuizzesText}>
              You haven't created any quizzes yet.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz History</Text>
          {quizHistory && quizHistory.length > 0 ? (
            quizHistory.map((quiz) => (
              <View key={quiz.id} style={styles.card}>
                <Text style={styles.itemTitle}>{quiz.title}</Text>
                <Text style={styles.itemDetail}>
                  Score: {quiz.score} -{" "}
                  {new Date(quiz.date).toLocaleDateString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noQuizzesText}>No quiz history available.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <View key={post.id} style={styles.card}>
                <Text style={styles.itemTitle}>{post.title}</Text>
                <Text style={styles.itemDetail}>{post.likes} likes</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noQuizzesText}>No posts available.</Text>
          )}
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
    backgroundColor: "#ddd",
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
  quizSection: {
    height: 330,
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
  section: {
    marginBottom: 30,
    width: "100%",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
