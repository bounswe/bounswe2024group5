// QuestionDetailScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../app/index";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Ensure AsyncStorage is imported

type QuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "QuestionDetail"
>;

type Props = {
  route: QuestionDetailScreenRouteProp;
  navigation: any;
};

// Define the Reply interface based on API response
interface Reply {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  username: string;
  updatedAt: string;
  user?: {
    username: string;
  };
}

// Define the ProfileResponse interface
interface ProfileResponse {
  username: string;
  // Include other profile fields if necessary
}

// Define the Question interface
interface Question {
  id: number;
  title: string;
  description: string;
  username: string;
  noUpvote: number;
  createdAt: string;
}

// Add this helper function near the top of the file, after the interfaces
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const QuestionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { questionId, title, description, username, noUpvote, createdAt } =
    route.params;

  const [question, setQuestion] = useState<Question | null>(null);
  const [repliesData, setRepliesData] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newReply, setNewReply] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<ProfileResponse | null>(null);
  const [upvotedPostIds, setUpvotedPostIds] = useState<Set<number>>(new Set());

  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  // Load upvoted post IDs from AsyncStorage when the component mounts
  useEffect(() => {
    const loadUpvotedPosts = async () => {
      try {
        const storedUpvoted = await AsyncStorage.getItem("upvotedPostIds");
        if (storedUpvoted) {
          const parsedUpvoted: number[] = JSON.parse(storedUpvoted);
          setUpvotedPostIds(new Set(parsedUpvoted));
        }
      } catch (error) {
        console.error("Error loading upvoted posts from storage:", error);
      }
    };

    loadUpvotedPosts();
  }, []);

  // Save upvoted post IDs to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUpvotedPosts = async () => {
      try {
        const upvotedArray = Array.from(upvotedPostIds);
        await AsyncStorage.setItem(
          "upvotedPostIds",
          JSON.stringify(upvotedArray)
        );
      } catch (error) {
        console.error("Error saving upvoted posts to storage:", error);
      }
    };

    saveUpvotedPosts();
  }, [upvotedPostIds]);

  // Fetch question details and replies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the authenticated user's profile
        if (token) {
          const profileResponse = await fetch(`${hostUrl}/api/profile/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (profileResponse.ok) {
            const profileData: ProfileResponse = await profileResponse.json();
            setCurrentUser(profileData);
          } else if (profileResponse.status === 401) {
            Alert.alert("Unauthorized", "Please log in to view this page.");
            // Optionally navigate to the login screen
            navigation.goBack();
            return;
          } else {
            console.error("Failed to fetch user profile.");
            Alert.alert("Error", "Failed to fetch user profile.");
          }
        } else {
          Alert.alert("Error", "User is not authenticated.");
          navigation.goBack();
          return;
        }

        // Set the question details using passed parameters
        setQuestion({
          id: questionId,
          title: title || "",
          description: description || "",
          username: username || "Anonymous",
          noUpvote: noUpvote || 0,
          createdAt: createdAt || "",
        });

        // Fetch the replies for the question
        const repliesResponse = await fetch(
          `${hostUrl}/api/posts/${questionId}/replies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (repliesResponse.ok) {
          const repliesData: Reply[] = await repliesResponse.json();
          console.log(repliesData);
          setRepliesData(repliesData);
        } else if (repliesResponse.status === 404) {
          console.error("Post not found.");
          Alert.alert("Error", "Post not found.");
          navigation.goBack();
        } else {
          console.error("Failed to fetch replies.");
          Alert.alert("Error", "Failed to fetch replies.");
        }
      } catch (error) {
        console.error("Error fetching question or replies:", error);
        Alert.alert("Error", "Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    hostUrl,
    token,
    questionId,
    navigation,
    title,
    description,
    username,
    noUpvote,
  ]);

  // Function to handle adding a new reply
  const handleAddReply = async () => {
    if (!newReply.trim()) {
      Alert.alert("Error", "Reply content cannot be empty.");
      return;
    }

    if (!currentUser) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${hostUrl}/api/posts/${questionId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newReply,
          }),
        }
      );

      if (response.status === 201) {
        const replyData: Reply = await response.json();

        // Manually attach the current user's username to the reply
        const enhancedReply: Reply = {
          ...replyData,
          username: currentUser.username,
        };

        // Update the repliesData list with the new reply
        setRepliesData((prevReplies) => [...prevReplies, enhancedReply]);
        setNewReply("");
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Please log in to submit a reply.");
        // Optionally navigate to the login screen
        navigation.goBack();
      } else if (response.status === 400) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Reply content is required.");
      } else if (response.status === 404) {
        Alert.alert("Error", "Post not found.");
        navigation.goBack();
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      Alert.alert("Error", "Failed to submit the reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a0dad" />
      </View>
    );
  }

  // Render error state if question is not found
  if (!question) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading question details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back button to return to the previous screen */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Display the question title */}
      <Text style={styles.title}>{question.title}</Text>

      {/* Display the question description */}
      <Text style={styles.description}>{question.description}</Text>

      {/* Display metadata like number of comments and upvotes */}
      <View style={styles.metadataContainer}>
        <View>
          <Text style={styles.metadata}>
            {repliesData.length}{" "}
            {repliesData.length === 1 ? "comment" : "comments"} |{" "}
            {question.noUpvote} {question.noUpvote === 1 ? "upvote" : "upvotes"}
          </Text>
          <Text style={styles.metadata}>Created on {question.createdAt}</Text>
        </View>
        <Text style={styles.metadataUsername}>
          by {question.username || "Anonymous"}
        </Text>
      </View>

      {/* Header for the replies section */}
      <Text style={styles.commentsHeader}>Replies</Text>

      {/* Loop through the repliesData and display each */}
      {repliesData.length > 0 ? (
        repliesData.map((reply: Reply) => (
          <View key={reply.id} style={styles.commentContainer}>
            <Text style={styles.commentUserName}>
              {reply.username || "Anonymous"}
            </Text>
            <Text style={styles.commentText}>{reply.content}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noRepliesText}>No replies yet.</Text>
      )}

      {/* Add a new reply */}
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          value={newReply}
          onChangeText={setNewReply}
          placeholder="Write a reply..."
          multiline
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting ? styles.submitButtonDisabled : {},
          ]}
          onPress={handleAddReply}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Reply</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  metadataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  metadataUsername: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  metadata: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  commentContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  commentUserName: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#6a0dad",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  noRepliesText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  replyInputContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
  },
  replyInput: {
    height: 80,
    borderColor: "#6a0dad",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: "top",
    marginBottom: 12,
    backgroundColor: "#f3e8ff",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  submitButtonDisabled: {
    backgroundColor: "#a569bd",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
});

export default QuestionDetailScreen;
