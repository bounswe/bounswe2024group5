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
import { calculateQuizDifficultyFromElo } from "../components/EloCefrInfoTable";

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
  const {token, username} = authContext; // Destructure token and username
  const usernameToDisplay = route.params?.username;
  const [userProfile, setUserProfile] = useState(null);
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

  // Function to fetch user profile
  const fetchUserProfile = async () => {
    setLoading(true); // Ensure loading indicator shows during fetch
    try {
      console.log(`Fetching profile from: ${hostUrl}/api/profile/${usernameToDisplay}`);

      const response = await fetch(`${hostUrl}/api/profile/${usernameToDisplay}`, {
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
          // setUsername(data.username);
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
    if (!usernameToDisplay) {
      return;
    }
    try {
      const response = await fetch(
        `${hostUrl}/api/quizzes?username=${usernameToDisplay}`,
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
              createdAt: quizDetails.quiz.createdAt,
              noFavorites: quizDetails.quiz.noFavorites,
              questions: quizDetails.quiz.questions,
              completedAt: attempt.completed
                ? attempt.completedAt
                : attempt.updatedAt,
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
    if (!usernameToDisplay) {
      return;
    }
    try {
      const response = await fetch(
        `${hostUrl}/api/posts?username=${usernameToDisplay}`,
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
                if (!usernameToDisplay) {
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
          if (usernameToDisplay) {
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
    }, [usernameToDisplay]) // Only depend on username
  );

  // Update useEffect to check if it's own profile and fetch follow data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Check if viewing own profile or another user's
        const isOwn = !usernameToDisplay || usernameToDisplay === username;
        setIsOwnProfile(isOwn);
        // Fetch followers and following
        const followersResponse = await fetch(
          `${hostUrl}/api/profile/${usernameToDisplay}/followers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const followingResponse = await fetch(
          `${hostUrl}/api/profile/${usernameToDisplay}/following`,
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

          if (!isOwn) {
            // Check if current user is in the followers list
            setIsFollowing(followersData.some(f => f.username === username));
          }
        }
      } catch (error) {
        console.error("Error fetching follow data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usernameToDisplay, username]);

  // Add follow/unfollow handler
  const handleFollowToggle = async () => {
    // Optimistically update UI
    setIsFollowing(prevState => !prevState);
    setFollowers(prev => 
      isFollowing 
        ? prev.filter(f => f.username !== username)
        : [...prev, { username, name: userProfile.name }]
    );
  
    try {
      const response = await fetch(
        `${hostUrl}/api/profile/follow/${usernameToDisplay}`,
        {
          method: isFollowing ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        // Revert changes if request failed
        setIsFollowing(prevState => !prevState);
        setFollowers(prev => 
          !isFollowing 
            ? prev.filter(f => f.username !== username)
            : [...prev, { username, name: userProfile.name }]
        );
        Alert.alert("Error", "Failed to update follow status");
      }
    } catch (error) {
      // Revert changes if request failed
      setIsFollowing(prevState => !prevState);
      setFollowers(prev => 
        !isFollowing 
          ? prev.filter(f => f.username !== username)
          : [...prev, { username, name: userProfile.name }]
      );
      console.error("Error toggling follow:", error);
      Alert.alert("Error", "Failed to update follow status");
    }
  };

  // Render loading indicator
  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6d28d9" />
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
              <AntDesignIcon name="user" size={16} color="gray" /> @{usernameToDisplay}
            </Text>

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
              <TouchableOpacity 
                onPress={() => navigation.navigate('FollowList', { 
                  username: usernameToDisplay, 
                  type: 'followers' 
                })}
              >
                <Text style={styles.followText}>
                  {followers.length} followers
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('FollowList', { 
                  username: usernameToDisplay, 
                  type: 'following' 
                })}
              >
                <Text style={styles.followText}>
                  {following.length} following
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* Show Edit or Follow button based on profile type */}
          {isOwnProfile ? (
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() =>
                navigation.navigate("ProfileSettings", { username: usernameToDisplay })
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
              activeOpacity={0.7}
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
        <View style={styles.sectionHeader}>
            <Ionicons
              name={showMyQuizzes ? "chevron-up" : "chevron-down"}
              size={24}
              color="#4C1D95"
            />
            <Text style={styles.sectionTitle}>
              {isOwnProfile ? " My Quizzes" : ` ${usernameToDisplay}'s Quizzes`}
            </Text>
        </View>
            {showMyQuizzes ? (
              <MyQuizzesView
                createdQuizzes={createdQuizzes}
                onDelete={isOwnProfile ? handleDeleteQuiz : undefined}
                navigation={navigation}
                deleteFunctionality={isOwnProfile ? true : false}
              />
            ) : null}
          </Pressable>

        {/* My Posts Section */}
        <View>
          <Pressable
            style={styles.sectionButton}
            onPress={() => handleMyPosts()}
          >
          <View style={styles.sectionHeader}>
            <Ionicons
              name={showMyPosts ? "chevron-up" : "chevron-down"}
              size={24}
              color="#4C1D95"
            />
             <Text style={styles.sectionTitle}>
              {isOwnProfile ? " My Posts" : ` ${usernameToDisplay}'s Posts`}
            </Text>
          </View>
            {showMyPosts ? (
              <MyPostsView myPosts={posts} navigation={navigation} />
            ) : null}
          </Pressable>
          </View>

        {/* Quiz Attempts Section */}
        {isOwnProfile ? ( 
        <View>
        <Pressable
          style={styles.sectionButton}
          onPress={() => handleMyQuizAttempts()}
        >
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name={showMyQuizAttempts ? "chevron-up" : "chevron-down"}
                size={24}
                color="#4C1D95"
              />
              <Text style={styles.sectionTitle}>
                {isOwnProfile ? " My Quiz Attempts" : ` ${usernameToDisplay}'s Quiz Attempts`}
              </Text>
            </View>
            {showMyQuizAttempts && (
              <TouchableOpacity
                style={styles.hideCompletedButton}
                onPress={() => setHideCompleted(!hideCompleted)}
              >
                <Ionicons
                  name={hideCompleted ? "eye-off" : "eye"}
                  size={16}
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
        )
      : null}

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
    fontWeight: "bold",
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
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: "row",
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
    backgroundColor: "#6d28d9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
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
    backgroundColor: "#8b5cf6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 40,
    padding: 10,
  },
  followingButton: {
    backgroundColor: "#4c1d95",
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
    marginBottom: 5,
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
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
