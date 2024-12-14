import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import BaseLayout from "./BaseLayout";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import MyQuizzesView from "../components/MyQuizzesView";
import MyPostsView from "../components/MyPostsView";
import MyQuizAttemptsView from "../components/MyQuizAttemptsView";
import { useFocusEffect } from "@react-navigation/native";

interface QuizAttempt {
  id: number;
  title: string;
  // ... other properties
}

interface Post {
  id: number;
  title: string;
  // ... other properties
}

const ProfileScreen = ({ route, navigation }) => {
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, ""); // Remove trailing slash
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null;

  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createdQuizzes, setCreatedQuizzes] = useState<any[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const [showMyQuizzes, setShowMyQuizzes] = useState(true);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyQuizAttempts, setShowMyQuizAttempts] = useState(true);

  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [hideCompleted, setHideCompleted] = useState(false);

  const calculateQuizDifficultyFromElo = (elo: number) => {
    if (elo < 400) return "A1";
    else if (elo < 1000) return "A2";
    else if (elo < 1800) return "B1";
    else if (elo < 2600) return "B2";
    else if (elo < 3300) return "C1";
    else return "C2";
  };

  // Function to fetch user profile
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
          // handleMyQuizzes();
          // handleMyPosts();
          // handleMyQuizAttempts();
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

  // Function to fetch created quizzes
  const fetchMyQuizzes = async () => {
    if (!userProfile) {
      await fetchUserProfile();
    }
    if (!username) {
      return;
    }
    try {
      const response = await fetch(
        `${hostUrl}/api/quizzes?username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();

      data.quizzes = data.quizzes.map((quiz) => ({
        ...quiz,
        elo: quiz.difficulty,
        difficulty: calculateQuizDifficultyFromElo(quiz.difficulty),
      }));
      console.log("My Quizzes:", data.quizzes);

      setCreatedQuizzes(data.quizzes);
      console.log(" 'createdQuizzes' IS JUST SET.");
    } catch (error) {
      console.error("Error fetching my quizzes:", error);
    }
  };

  // Function to fetch and process quiz attempts
  const fetchMyQuizAttempts = async () => {
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
      const quizAttemptsRaw = await response.json();
      console.log("Quiz Attempts (Raw):", quizAttemptsRaw);

      // Fetch quiz details in parallel
      const quizAttemptsDetailed = await Promise.all(
        quizAttemptsRaw.map(async (attempt) => {
          try {
            const response = await fetch(
              `${hostUrl}/api/quizzes/${attempt.quizId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch quiz with ID ${attempt.quizId}`);
            }
            const quizDetails = await response.json();

            return {
              attemptId: attempt.id,
              id: quizDetails.quiz.id,
              title: quizDetails.quiz.title,
              description: quizDetails.quiz.description,
              image: quizDetails.quiz.image,
              elo: quizDetails.quiz.difficulty,
              difficulty: calculateQuizDifficultyFromElo(
                quizDetails.quiz.difficulty
              ),
              username: quizDetails.quiz.username,
              createdAt: new Date(quizDetails.quiz.createdAt).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                }
              ),
              noFavorites: quizDetails.quiz.noFavorites,
              questions: quizDetails.quiz.questions,
              completedAt: attempt.completed
                ? new Date(attempt.completedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(attempt.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
              score: attempt.completed ? attempt.score : null,
              status: attempt.completed ? "Completed" : "In Progress",
              rawCompleted: attempt.completed,
              rawUpdatedAt: new Date(attempt.updatedAt),
            };
          } catch (error) {
            console.error(
              `Error fetching quiz with ID ${attempt.quizId}:`,
              error
            );
            return null; // Return null or skip this quiz
          }
        })
      );

      // Filter out any null attempts due to fetch errors
      const validAttempts = quizAttemptsDetailed.filter((attempt) => attempt);

      // Process attempts to meet the criteria
      const processedAttemptsMap = new Map();

      // First sort attempts by completedAt date for each quiz
      const attemptsByQuiz = new Map();
      validAttempts.forEach((attempt) => {
        if (!attemptsByQuiz.has(attempt.id)) {
          attemptsByQuiz.set(attempt.id, []);
        }
        attemptsByQuiz.get(attempt.id).push(attempt);
      });

      // For each quiz, find the first completion or latest in-progress
      attemptsByQuiz.forEach((attempts, quizId) => {
        // Sort attempts by date
        attempts.sort(
          (a, b) => a.rawUpdatedAt.getTime() - b.rawUpdatedAt.getTime()
        );

        // Find first completed attempt
        const firstCompleted = attempts.find((a) => a.rawCompleted);

        if (firstCompleted) {
          // Use the first completed attempt
          processedAttemptsMap.set(quizId, firstCompleted);
        } else {
          // If no completed attempts, use the latest in-progress attempt
          const latestInProgress = attempts[attempts.length - 1];
          processedAttemptsMap.set(quizId, latestInProgress);
        }
      });

      const processedAttempts = Array.from(processedAttemptsMap.values());
      console.log("Processed Quiz Attempts:", processedAttempts);

      setQuizAttempts(processedAttempts);
    } catch (error) {
      console.error("Error fetching quiz attempts:", error);
    }
  };

  // Function to fetch user's posts
  const fetchMyPosts = async () => {
    if (!userProfile) {
      await fetchUserProfile();
    }
    if (!username) {
      return;
    }
    try {
      const response = await fetch(
        `${hostUrl}/api/posts?username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts: ${response.status} and ${response.statusText}`
        );
      }
      const myPosts = await response.json();
      console.log("My Posts:", myPosts);

      // Process posts
      const processedPosts = myPosts.map((post) => ({
        id: post.id,
        title: post.title,
        createdAt: new Date(post.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
        noReplies: post.noReplies,
        noUpvote: post.noUpvote,
      }));

      setPosts(processedPosts);
      console.log(" 'posts' IS JUST SET.");
    } catch (error) {
      console.error("Error fetching my posts:", error);
    }
  };

  // Handler to delete a quiz
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
              if (showMyQuizzes) {
                if (!username) {
                  await fetchUserProfile();
                }
                fetchMyQuizzes();
              }
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

  // Handlers to toggle visibility of sections
  const handleMyQuizzes = () => {
    setShowMyQuizzes(!showMyQuizzes);
  };

  const handleMyPosts = () => {
    setShowMyPosts(!showMyPosts);
  };

  const handleMyQuizAttempts = () => {
    setShowMyQuizAttempts(!showMyQuizAttempts);
  };

  // Keep only useFocusEffect for data fetching
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          await fetchUserProfile();
          if (username) {
            await Promise.all([
              fetchMyQuizAttempts(),
              fetchMyQuizzes(),
              fetchMyPosts(),
            ]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [username]) // Only depend on username
  );

  // Update useEffect to check if it's own profile and fetch follow data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Check if viewing own profile or another user's
        const viewingUsername = route.params?.username;
        const isOwn = !viewingUsername || viewingUsername === username;
        setIsOwnProfile(isOwn);

        // Fetch followers and following
        const followersResponse = await fetch(
          `${hostUrl}/api/profile/${viewingUsername || username}/followers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const followingResponse = await fetch(
          `${hostUrl}/api/profile/${viewingUsername || username}/following`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (followersResponse.ok && followingResponse.ok) {
          const followersData = await followersResponse.json();
          const followingData = await followingResponse.json();
          setFollowers(followersData);
          setFollowing(followingData);

          // Check if current user is following this profile
          if (!isOwn) {
            setIsFollowing(followersData.some((f) => f.username === username));
          }
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username, route.params?.username]);

  // Add follow/unfollow handler
  const handleFollowToggle = async () => {
    const targetUsername = route.params?.username;
    try {
      const response = await fetch(
        `${hostUrl}/api/profile/follow/${targetUsername}`,
        {
          method: isFollowing ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsFollowing(!isFollowing);
        // Update followers count
        const newFollowers = await fetch(
          `${hostUrl}/api/profile/${targetUsername}/followers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
        setFollowers(newFollowers);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  // Render loading indicator
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

  // Render error if userProfile is not available
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

  // Destructure userProfile data
  const {
    name,
    email,
    score,
    noCreatedQuizzes,
    profilePicture,
    englishProficiency,
    noFollowers,
    noFollowing,
  } = userProfile;

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
              <AntDesignIcon name="user" size={16} color="gray" /> @{username}
            </Text>

            {/* Disable emails in the profile page as it is too long */}
            {/* <Text style={styles.subheading}>
              <Icon name="envelope" size={16} color="gray" /> {email}
            </Text> */}
            {/* <Text style={styles.subheading}>{noFollowers} followers</Text> */}
            {/* <Text style={styles.subheading}>{noFollowing} followings</Text> */}

            <View style={styles.statistics}>
              <Text style={styles.score}>
                <Ionicons name="trophy-outline" size={16} color="#fbbf24" />{" "}
                {score} Points
              </Text>
              <View style={styles.englishProficiency}>
                <Text style={styles.proficiencyText}>
                  Level: {englishProficiency}
                </Text>
              </View>
            </View>

            <View style={styles.followStats}>
              <Text style={styles.followText}>
                {followers.length} followers
              </Text>
              <Text style={styles.followText}>
                {following.length} following
              </Text>
            </View>
          </View>

          {/* Show Edit or Follow button based on profile type */}
          {isOwnProfile ? (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() =>
                navigation.navigate("ProfileSettings", { username })
              }
            >
              <FontAwesomeIcon
                name="pencil-square-o"
                size={16}
                style={styles.editIcon}
              />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollowToggle}
            >
              <Text style={styles.followButtonText}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* My Quizzes Section */}
        <Pressable
          style={styles.sectionButton}
          onPress={() => handleMyQuizzes()}
        >
          <Text style={styles.sectionTitle}>
            {isOwnProfile ? "My Quizzes" : `${username}'s Quizzes`}
          </Text>
          {showMyQuizzes ? (
            <MyQuizzesView
              createdQuizzes={createdQuizzes}
              onDelete={isOwnProfile ? handleDeleteQuiz : undefined}
              navigation={navigation}
            />
          ) : null}
        </Pressable>

        {/* My Posts Section */}
        <View>
          <Pressable
            style={styles.sectionButton}
            onPress={() => handleMyPosts()}
          >
            <Text style={styles.sectionTitle}>
              {isOwnProfile ? "My Posts" : `${username}'s Posts`}
            </Text>
            {showMyPosts ? (
              <MyPostsView myPosts={posts} navigation={navigation} />
            ) : null}
          </Pressable>
        </View>

        {/* Quiz Attempts Section */}
        <View>
          <Pressable
            style={styles.sectionButton}
            onPress={() => handleMyQuizAttempts()}
          >
            <View style={styles.sectionTitleRow}>
              <Text style={styles.sectionTitle}>
                {isOwnProfile ? "Quiz Attempts" : `${username}'s Quiz Attempts`}
              </Text>
              {showMyQuizAttempts && (
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
                    {hideCompleted ? "Show Completed" : "Hide Completed"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            {showMyQuizAttempts && (
              <MyQuizAttemptsView
                quizHistory={quizAttempts}
                navigation={navigation}
                hideCompleted={hideCompleted}
              />
            )}
          </Pressable>
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
    color: "#2e1065",
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
    fontSize: 14,
    color: "#2e1065",
    fontWeight: "bold",
    textAlign: "left",
    marginRight: 20,
  },
  englishProficiency: {
    marginLeft: 30,
    paddingHorizontal: 10, // Add padding inside the box
    borderRadius: 12,
    backgroundColor: "#fef3c7",
    justifyContent: "center", // Centers text vertically
    alignItems: "center", // Centers text horizontally
  },
  proficiencyText: {
    fontSize: 14,
    color: "#2e1065",
    fontWeight: "bold",
  },
  sectionButton: {
    backgroundColor: "#f5f3ff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2e1065",
    marginBottom: 15,
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
  followStats: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    marginTop: 8,
  },
  followText: {
    fontSize: 14,
    color: "#666",
  },
  followButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 25,
  },
  followingButton: {
    backgroundColor: "#e5e7eb",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
});

export default ProfileScreen;
