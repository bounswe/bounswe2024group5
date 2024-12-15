import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../app/index";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import { ForumQuestion, ForumReply } from "../database/types";
import QuestionItem from "../components/QuestionItem";

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
  const [relatedPostsData, setRelatedPostsData] = useState<ForumQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newReply, setNewReply] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const { token, username } = authContext; // Now you can destructure both token and username
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showRelatedPosts, setShowRelatedPosts] = useState(false);

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
          questionData.createdAt = new Date(
            questionData.createdAt
          ).toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          setQuestion(questionData);
        } else {
          throw new Error("Failed to fetch question");
        }

        // Fetch upvote status:
        const upvoteResponse = await fetch(
          `${hostUrl}/api/posts/${questionId}/upvotes?username=${username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!upvoteResponse.ok) {
          console.error(
            `Failed to fetch upvotes: ${upvoteResponse.status} - ${upvoteResponse.statusText}`
          );
          throw new Error("Failed to fetch upvotes");
        }

        const upvoteData = await upvoteResponse.json();
        setIsUpvoted(upvoteData.length > 0);

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
            reply.createdAt = new Date(reply.createdAt).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
          });
          setRepliesData(repliesData);
        } else {
          throw new Error("Failed to fetch replies");
        }

        // Fetch related posts
        const relatedPostsResponse = await fetch(
          `${hostUrl}/api/posts/${questionId}/related?page=1&size=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (relatedPostsResponse.ok) {
          const relatedPosts: ForumQuestion[] =
            await relatedPostsResponse.json();
          relatedPosts.forEach((reply) => {
            reply.createdAt = new Date(reply.createdAt).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            );
            reply.content = reply.content;
          });
          setRelatedPostsData(relatedPosts);
        } else {
          throw new Error("Failed to fetch related posts.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [hostUrl, token, questionId, isUpvoted]);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleToggleRelatedPosts = () => {
    setShowRelatedPosts(!showRelatedPosts);
  };

  const handleUpvote = async () => {
    if (!question) {
      console.log(`Question not set..`);
      return;
    }
    try {
      if (isUpvoted) {
        // If already upvoted, remove upvote
        const response = await fetch(
          `${hostUrl}/api/posts/${questionId}/upvote`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        if (response.status === 204) {
          // Successfully removed upvote
          // setQuestion(prev => ({
          //   ...prev!,
          //   noUpvote: prev!.noUpvote - 1,
          // }));
          setIsUpvoted(!isUpvoted);
        } else if (response.status === 401) {
          Alert.alert("Unauthorized", "Please log in to remove upvote.");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message || "Failed to remove upvote.");
        }
      } else {
        // If not upvoted, add upvote
        const response = await fetch(
          `${hostUrl}/api/posts/${questionId}/upvote`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          // setQuestion(prev => ({
          //   ...prev!,
          //   noUpvote: data.upvotes || prev!.noUpvote + 1,
          // }));
          console.log("Upvote response data:", data);
          setIsUpvoted(!isUpvoted);
        } else if (response.status === 401) {
          Alert.alert("Unauthorized", "Please log in to upvote.");
        } else {
          const errorData = await response.json();
          Alert.alert("Error", errorData.message || "Failed to upvote.");
        }
      }
    } catch (error) {
      console.error("Error handling upvote:", error);
      Alert.alert("Error", "Failed to update upvote. Please try again.");
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
        newReplyData.createdAt = new Date(
          newReplyData.createdAt
        ).toLocaleString("en-US", {
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
        <ActivityIndicator size="large" color="#2e1065" />
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
        <Text style={styles.content}>{question.content}</Text>

        <View style={styles.metadata}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", { username: question.username })
            }
          >
            <Text style={styles.replyUsername}>@{question.username}:</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upvoteContainer}
            onPress={handleUpvote}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isUpvoted ? "heart" : "heart-outline"}
              size={20}
              color={isUpvoted ? "#e0245e" : "#6a0dad"}
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
        </View>
      </View>

      {/* Collapsible Replies Section */}
      <Pressable
        style={[
          styles.repliesSectionButton,
          showReplies ? styles.repliesSectionExpanded : {},
        ]}
        onPress={handleToggleReplies}
      >
        <View style={styles.repliesSectionHeader}>
          <Ionicons
            name={showReplies ? "chevron-up" : "chevron-down"}
            size={20}
            color="#2e1065"
          />
          <Text style={styles.repliesHeader}>
            Replies ({repliesData.length})
          </Text>
        </View>
        {showReplies && (
          <View>
            {repliesData.map((reply) => (
              <View key={reply.id} style={styles.replyContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", {
                      username: reply.username,
                    })
                  }
                >
                  <Text style={styles.replyUsername}>@{reply.username}:</Text>
                </TouchableOpacity>
                <Text style={styles.replyText}>{reply.content}</Text>
                <Text style={styles.replyDate}>{reply.createdAt}</Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>

      {/* Reply Input */}
      <View style={styles.replyInputContainer}>
        <TextInput
          style={styles.replyInput}
          value={newReply}
          onChangeText={setNewReply}
          placeholder="Write a reply..."
          placeholderTextColor="#666" // Add placeholder color
          multiline={true}
          numberOfLines={4}
          autoCapitalize="sentences"
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

      {/* Collapsible Related Posts Section */}
      <Pressable
        style={[
          styles.repliesSectionButton,
          showRelatedPosts ? styles.repliesSectionExpanded : {},
        ]}
        onPress={handleToggleRelatedPosts}
      >
        <View style={styles.repliesSectionHeader}>
          <Ionicons
            name={showRelatedPosts ? "chevron-up" : "chevron-down"}
            size={20}
            color="#2e1065"
          />
          <Text style={styles.repliesHeader}>Related Posts </Text>
        </View>

        {showRelatedPosts && (
          <View>
            {relatedPostsData.map((item) => (
              <QuestionItem
                key={item.id}
                question={item}
                onPress={() =>
                  navigation.navigate("QuestionDetail", {
                    questionId: item.id,
                    title: item.title,
                    content: item.content,
                    username: item.username,
                    noUpvote: item.noUpvote,
                    createdAt: item.createdAt,
                  })
                }
              />
            ))}
          </View>
        )}
      </Pressable>
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
    borderWidth: 1,
    borderColor: "#e0e0e0",
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
  upvoteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  upvoteText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#2e1065",
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
    color: "#2e1065",
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
    marginTop: 8,
    marginBottom: 8,
    color: "#2e1065",
    textAlign: "left",
  },
  replyContainer: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  replyUsername: {
    fontWeight: "bold",
    color: "#2e1065",
    marginBottom: 4,
  },
  replyText: {
    color: "#333",
    marginBottom: 4,
  },
  replyDate: {
    fontSize: 12,
    color: "#888",
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
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#333", // Add explicit text color
    fontSize: 14,
    textAlignVertical: "top", // For Android multiline alignment
  },
  submitButton: {
    backgroundColor: "#6d28d9",
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
  repliesSectionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#faf5ff",
    marginBottom: 4,
    borderRadius: 8,
    padding: 16,
    margin: 12,
    elevation: 2,
  },
  repliesSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  repliesSectionExpanded: {
    marginBottom: 0,
  },
  questionList: {
    flex: 1,
  },
});

export default QuestionDetailScreen;
