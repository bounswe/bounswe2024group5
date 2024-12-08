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
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import QuizViewComponent from "../components/QuizViewComponent";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import { useFocusEffect } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";


const ProfileScreen = ({ route, navigation }) => {
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, ""); // Remove trailing slash
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null;

  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: "createdQuizzes", title: "My Quizzes" },
    { key: "quizHistory", title: "Quiz History" },
    { key: "posts", title: "My Posts" },
  ]);
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createdQuizzes, setCreatedQuizzes] = useState(null);
  const [quizHistory, setQuizHistory] = useState(null);
  const [posts, setPosts] = useState(null);

  const fetchUserProfile = async () => {
    setLoading(true); // Ensure loading indicator shows during fetch
    try {
      console.log(`Fetching profile from: ${hostUrl}/api/profile/me`);

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
          console.log("User Profile:", data);
          setUsername(data.username);
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

  const fetchMyQuizzes = async () => {
    if(!userProfile) {
      fetchUserProfile();
    }
    try {
      const response = await fetch(`${hostUrl}/api/quizzes?username=${userProfile.username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const quizzes = await response.json();
      console.log("My Quizzes:", quizzes.quizzes);
      setCreatedQuizzes(quizzes.quizzes);
    } catch (error) {
      console.error("Error fetching my quizzes:", error);
    }
  };

  const fetchQuizHistory = async () => {
    try {
      const response = await fetch(`${hostUrl}/api/quiz-attempts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch quiz history");
      }
      const quizAttempts = await response.json();
      console.log("Quiz History:", quizAttempts);

      // Fetch quiz details in parallel
      const quizhistory = await Promise.all(
        quizAttempts.map(async (quiz) => {
          try {
            const response = await fetch(`${hostUrl}/api/quizzes/${quiz.quizId}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch quiz with ID ${quiz.quizId}`);
            }
            const quizDetails = await response.json();

            return {
              title: quizDetails.quiz.title,
              completedAt: new Date(quiz.completedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              score: quiz.score,
              status: quiz.completed ? "Completed" : "In Progress"
            };
          } catch (error) {
            console.error(`Error fetching quiz with ID ${quiz.quizId}:`, error);
            return null; // Return null or skip this quiz
          }
        })
      );

      setQuizHistory(quizhistory.filter((item) => item !== null));
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    }
  };

  const fetchMyPosts = async () => {
    if(!userProfile) {
      fetchUserProfile();
    }
    try {
      const response = await fetch(`${hostUrl}/api/posts?username=${userProfile.username}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status} and ${response.statusText}`);
      }
      const myPosts = await response.json();
      console.log("My Posts:", myPosts);

      // Fetch quiz details in parallel
      const posts = await Promise.all(
        myPosts.map(async (post) => {
            return {
              title: post.title,
              createdAt: new Date(post.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }),
              noReplies: post.noReplies,
              noUpvote: post.noUpvote,
            };
        })
      );

      setPosts(posts); // Assuming setPosts is a state setter
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchMyQuizzes();
    fetchQuizHistory();
    fetchMyPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
      fetchMyQuizzes();
      fetchQuizHistory();
      fetchMyPosts();
    }, [])
  );

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
    noCreatedQuizzes,
    profilePicture,
    englishProficiency,
    noFollowers,
    noFollowing
  } = userProfile;

  const handleDeleteQuiz = async (quizId) => {
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

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: profilePicture || "https://via.placeholder.com/120", // Default image
            }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subheading}>
              <AntDesignIcon name="user" size={16} color="gray" />  @{username}
            </Text>

            {/* Disable emails in the profile page as it is too long*/}
            {/* <Text style={styles.subheading}>
              <Icon name="envelope" size={16} color="gray" /> {email}
            </Text> */}
            {/* <Text style={styles.subheading}>{noFollowers} followers</Text> */}
            {/* <Text style={styles.subheading}>{noFollowing} followings</Text> */}

            <View style={styles.statistics}>
              <Text style={styles.score}>
                <FontAwesomeIcon name="trophy" size={16} color="#f1d800" /> {score} Points
              </Text>
              <View style={styles.englishProficiency}>
                <Text style={styles.proficiencyText}>Level: {englishProficiency}</Text>
              </View>
            </View>
          </View>

          {/* Profile Settings Button */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() =>
              navigation.navigate("ProfileSettings", { username: username })
            }
          >
            <FontAwesomeIcon name="pencil-square-o" size={16} style={styles.editIcon} />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subheading}>{noCreatedQuizzes} Quizzes Created </Text>

        <View style={styles.quizSection}>
          <Text style={styles.sectionTitle}>My Quizzes</Text>
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
                quiz={quiz}
                onPress={() =>
                  navigation.navigate("MyQuizPreviewScreen", {
                    username: username,
                    quizId: quiz.id,
                  })
                }
                onDelete={() => handleDeleteQuiz(quiz.id)}
                showActions={true} // Show buttons on the profile page
              />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noDataText}>
              You haven't created any quizzes yet.
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz History</Text>
          {quizHistory && quizHistory.length > 0 ? (
            quizHistory.map((quiz) => (
              <View key={quiz.id} style={styles.card}>
                <Text style={styles.quizHistoryTitle}>{quiz.title}</Text>
                <Text style={styles.quizHistoryDetail}>{quiz.completedAt}</Text>
                <Text style={styles.quizHistoryDetail}>
                <FontAwesomeIcon name="star-o" size={12} color="#4c1d95" /> {quiz.score} points gained
                </Text>
                <Text style={styles.quizHistoryDetail}>
                  {quiz.status}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No quiz history available.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Posts</Text>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <View key={post.id} style={styles.card}>
                <Text style={styles.quizHistoryTitle}>{post.title}</Text>
                <View style={styles.forumDetailLine}> 
                <Text style={styles.forumDetail}>{post.createdAt}</Text>
                <View style={styles.forumStats}> 
                  <Text style={styles.forumDetail}>
                  <AntDesignIcon name="like2" size={12} color="red" /> {post.noUpvote} | </Text>
                  <Text style={styles.forumDetail}>
                  <AntDesignIcon name="message1" size={12} color="#4c1d95" /> {post.noReplies}</Text>
                </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No posts available.</Text>
          )}
        </View>

        {/* title: post.title,
              createdAt: new Date(post.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              noReplies: post.noReplies,
              noUpvote: post.noUpvote, */}

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
    // backgroundColor:"#ede9fe",
    borderRadius: 12,
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
    marginTop: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4c1d95",
    textAlign: "left",
  },
  subheading: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    textAlign: "left",
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8b5cf6",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 25,
  },
  editIcon: {
    marginRight: 10,
    color: "#fff",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  statistics: {
    flexDirection: "row",
    justifyContent: "space-between", // Ensures left and right alignment
    alignItems: "center",
    // marginHorizontal: 20,
  },
  score: {
    fontSize: 16,
    color: "#4c1d95",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "left",
    marginRight: 55,
  },
  englishProficiency: {
    marginTop: 8,
    marginLeft: 30,
    paddingHorizontal: 10, // Add padding inside the box
    borderRadius: 12,
    backgroundColor: "#ede9fe",
    justifyContent: "center", // Centers text vertically
    alignItems: "center", // Centers text horizontally
  },
  proficiencyText: {
    fontSize: 16,
    color: "#4c1d95",
    fontWeight: "bold",
  },
  quizSection: {
    height: 340,
  },
  sectionTitle: {
    marginTop: 10,
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
    paddingHorizontal: 12,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
    fontSize: 14,
    marginVertical: 20,
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  card: {
    backgroundColor: "#ede9fe",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  quizHistoryTitle: {
    fontSize: 16,
    color: "#4c1d95",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  quizHistoryDetail: {
    fontSize: 12,
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
  forumDetailLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forumDetail: {
    fontSize: 12,
    color: "#666",
    textAlign: "left",
  },
  forumStats: {
    flexDirection: "row",
  },
});

export default ProfileScreen;
