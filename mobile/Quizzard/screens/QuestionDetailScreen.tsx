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
import { useAuth } from "./AuthProvider"; // Import useAuth

type QuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "QuestionDetail"
>;

type Props = {
  route: QuestionDetailScreenRouteProp;
  navigation: any;
};

type Reply = {
  id: number;
  content: string;
  user?: {
    username: string;
  };
};

type ProfileResponse = {
  username: string;
  // Include other profile fields if necessary
};

const QuestionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Destructure the questionId, title, and description from the route parameters
  const { questionId, title, description, username } = route.params;

  const [question, setQuestion] = useState<any>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReply, setNewReply] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<ProfileResponse | null>(null);

  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the authenticated user's profile
        const profileResponse = await fetch(`${hostUrl}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.ok) {
          const profileData: ProfileResponse = await profileResponse.json();
          setCurrentUser(profileData);
        } else {
          console.error("Failed to fetch user profile.");
          Alert.alert("Error", "Failed to fetch user profile.");
        }

        // Set the question details using passed parameters
        setQuestion({
          id: questionId,
          title: title,
          description: description,
          username: username,
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
          setReplies(repliesData);
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
  }, [hostUrl, token, questionId]);

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
          user: {
            username: currentUser.username,
          },
        };

        // Update the replies list with the new reply
        setReplies((prevReplies) => [...prevReplies, enhancedReply]);
        setNewReply("");
      } else if (response.status === 401) {
        Alert.alert("Unauthorized", "Please log in to submit a reply.");
      } else if (response.status === 400) {
        Alert.alert("Error", "Reply content is required.");
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a0dad" />
      </View>
    );
  }

  if (!question) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading question details.</Text>
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

      {/* Display metadata like number of comments */}
      <View style={styles.metadataContainer}>
        <Text style={styles.metadata}>
          {replies.length || 0} comments | {question.noUpvote || 0} upvotes
        </Text>
        <Text style={styles.metadataUsername}>
          by {question.username || "Anonymous"}
        </Text>
      </View>

      {/* Header for the replies section */}
      <Text style={styles.commentsHeader}>Replies</Text>

      {/* Loop through the replies and display each */}
      {replies.map((reply: Reply) => (
        <View key={reply.id} style={styles.commentContainer}>
          <Text style={styles.commentUserName}>
            {reply.user?.username || "Anonymous"}
          </Text>
          <Text style={styles.commentText}>{reply.content}</Text>
        </View>
      ))}

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
          style={styles.submitButton}
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
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
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
    color: "black",
  },
  metadata: {
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  commentContainer: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  commentUserName: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#6a0dad",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
  },
  replyInputContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 16,
  },
  replyInput: {
    height: 80,
    borderColor: "gray",
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
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuestionDetailScreen;
