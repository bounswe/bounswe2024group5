import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../app/index";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ForumQuestion, ForumReply } from "../database/types";


type QuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "QuestionDetail"
>;

type Props = {
  route: QuestionDetailScreenRouteProp;
  navigation: any;
};

const QuestionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { questionId } = route.params;
  const [question, setQuestion] = useState<ForumQuestion | null>(null);
  const [repliesData, setRepliesData] = useState<ForumReply[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newReply, setNewReply] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  // Fetch question details and replies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch question details
        const questionResponse = await fetch(
          `${hostUrl}/api/posts/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (questionResponse.ok) {
          const questionData: ForumQuestion = await questionResponse.json();
          questionData.createdAt = new Date(questionData.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          setQuestion(questionData);
        } else {
          throw new Error("Failed to fetch question");
        }

        // Fetch replies
        const repliesResponse = await fetch(
          `${hostUrl}/api/posts/${questionId}/replies`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (repliesResponse.ok) {
          const repliesData: ForumReply[] = await repliesResponse.json();
          repliesData.forEach((reply) => {
            reply.createdAt = new Date(reply.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          });
          setRepliesData(repliesData);
        } else {
          throw new Error("Failed to fetch replies");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hostUrl, token, questionId]);

  const handleUpvote = async () => {

    if(!question) {
      console.log(`Question not set..`);
      return;
    }
    return;

    // TODO: Implement next!!
    if (question.hasUpvoted) {
      // If already upvoted, remove upvote
      try {
        const response = await fetch(`${hostUrl}/api/posts/${questionId}/upvote`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        if (response.status === 204) {
          // Successfully removed upvote
        } else if (response.status === 401) {
          Alert.alert("Unauthorized", "Please log in to remove upvote.");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message || "Failed to remove upvote.");
        }
      } catch (error) {
        console.error("Error removing upvote:", error);
        Alert.alert("Error", "Failed to remove upvote.");
      }
    } else {
      // If not upvoted, add upvote
      try {
        const response = await fetch(`${hostUrl}/api/posts/${questionId}/upvote`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log("Upvote response data:", data);
          // Assuming the response contains the updated upvote count
          const updatedUpvotes = data.noUpvote || question.noUpvote + 1;

          //TODO: Add to upvotedPostIds
          // setUpvotedPostIds((prev) => new Set(prev).add(postId));
        } else if (response.status === 401) {
          Alert.alert("Unauthorized", "Please log in to upvote.");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message || "Failed to upvote.");
        }
      } catch (error) {
        console.error("Error upvoting post:", error);
        Alert.alert("Error", "Failed to upvote the post.");
      }
    }
  };

  // Handle adding a new reply
  const handleAddReply = async () => {
    if (!newReply.trim()) {
      Alert.alert("Error", "Reply cannot be empty");
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
          body: JSON.stringify({ content: newReply }),
        }
      );

      if (response.ok) {
        const newReplyData: ForumReply = await response.json();
        newReplyData.createdAt = new Date(newReplyData.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        setRepliesData((prev) => [...prev, newReplyData]);
        setNewReply("");
      } else {
        throw new Error("Failed to add reply");
      }
    } catch (error) {
      console.error("Add reply error:", error);
      Alert.alert("Error", "Failed to add reply. Please try again.");
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Question not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Question Container (Similar to QuestionItem) */}
      <View style={styles.questionContainer}>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.content}>
          {question.content}
        </Text>

        <View style={styles.metadata}>
          <Text style={styles.username}>@{question.username}</Text>
          <TouchableOpacity
            style={styles.upvoteContainer}
            onPress={handleUpvote}
            activeOpacity={0.7}
          >
            <Ionicons
              name={question.hasUpvoted ? "heart" : "heart-outline"}
              size={20}
              color={question.hasUpvoted ? "#e0245e" : "#6a0dad"}
            />
            <Text style={styles.upvoteText}>{question.noUpvote}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tagsContainer}>
          {question.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.metadataText}>{question.createdAt}</Text>
          <Text style={styles.metadataText}>
            {question.noReplies} comments
          </Text>
        </View>
      </View>

      {/* Replies Section */}
      <Text style={styles.repliesHeader}>Replies</Text>
      {repliesData.map((reply) => (
        <View key={reply.id} style={styles.replyContainer}>
          <Text style={styles.replyUsername}>@{reply.username}:</Text>
          <Text style={styles.replyText}>{reply.content}</Text>
          <Text style={styles.replyDate}>{reply.createdAt}</Text>
        </View>
      ))}

      {/* Reply Input */}
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
            isSubmitting && styles.submitButtonDisabled,
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
  },
  backButton: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: "#f3e8ff",
    borderRadius: 8,
    padding: 16,
    margin: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  username: {
    fontSize: 12,
    color: "#6a0dad",
    fontWeight: "bold",
  },
  upvoteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  upvoteText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6a0dad",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#e0d4f7",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: "#6a0dad",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metadataText: {
    fontSize: 12,
    color: "#888",
  },
  repliesHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  replyContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  replyUsername: {
    fontWeight: "bold",
    color: "#6a0dad",
    marginBottom: 4,
  },
  replyText: {
    color: "#333",
    marginBottom: 4,
  },
  replyDate: {
    fontSize: 12,
    color: "#888",
    // alignSelf: "flex-left",
  },
  replyInputContainer: {
    margin: 16,
  },
  replyInput: {
    backgroundColor: "#f3e8ff",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#6a0dad",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#a569bd",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default QuestionDetailScreen;