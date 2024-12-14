// ForumScreen.tsx
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BaseLayout from "./BaseLayout";
import QuestionItem from "../components/QuestionItem";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider"; // Import useAuth
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

// Define the Question interface
interface Question {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  commentCount: number;
  tags: string[];
  username: string;
  upvotes: number;
  hasUpvoted: boolean;
}

const ForumScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");

  const authContext = useAuth(); // Get the authentication context
  console.log('Auth context in ForumScreen:', authContext);
  const { token, username } = authContext;  // Now you can destructure both token and username
  const [isUpvoted, setIsUpvoted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPosts = async () => {
        setIsLoading(true); // Set loading to true when fetching
        try {
          const postsResponse = await fetch(`${hostUrl}/api/posts`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });
          // console.log("Response status:", postsResponse.status);
          if (!postsResponse.ok) {
            throw new Error('Failed to fetch posts');
          }

          const postsData = await postsResponse.json();
          console.log("Data fetched:", postsData);

          // Check if data is an array
          if (Array.isArray(postsData)) {
            if(!username) {
              throw new Error('Username is not set');
            }
            console.log(`hostUrl is ${hostUrl} and username is |${username}|`);
            // Get upvote status for all posts
            const upvotesResponse = await fetch(`${hostUrl}/api/posts/upvotes?username=${username}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!upvotesResponse.ok) {
              console.error(`Failed to fetch upvotes: ${upvotesResponse.status} - ${upvotesResponse.statusText}`);
              throw new Error('Failed to fetch upvotes');
            }

            const upvotesData = await upvotesResponse.json();
            // Create a Set of upvoted post IDs for efficient lookup
            const userUpvotedPosts = new Set(upvotesData.map(upvote => upvote.postId));

            // Map the API data to match the structure expected by QuestionItem with correct upvote status
            const formattedData = postsData.map((item) => ({
              id: item.id,
              title: item.title,
              description: item.content,
              createdAt: new Date(item.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              commentCount: item.noReplies || 0,
              tags: item.tags || [],
              username: item.username || item.user?.username || "Anonymous",
              upvotes: item.noUpvote || 0,
              hasUpvoted: userUpvotedPosts.has(item.id),
            }));

            setQuestions(formattedData);
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
          Alert.alert("Error", "Failed to fetch posts. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchPosts();
    }, [hostUrl, token, isUpvoted])
  );

  // Function to handle upvoting a question
  const handleUpvote = async (postId: number) => {
    // Find the question in the state
    const questionIndex = questions.findIndex((q) => q.id === postId);
    if (questionIndex === -1) return;

    const question = questions[questionIndex];
    setIsUpvoted(!isUpvoted);
    try {
      if (question.hasUpvoted) {
        // If already upvoted, remove upvote
          const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });

          if (response.status === 204) {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex] = {
              ...question,
              upvotes: question.upvotes - 1,
              hasUpvoted: false,
            };
            setQuestions(updatedQuestions);
          } else if (response.status === 401) {
            Alert.alert("Unauthorized", "Please log in to remove upvote.");
          } else {
            throw new Error('Failed to remove upvote');
          }
      } else {
        // If not upvoted, add upvote
          const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });
          console.log(response);
          if (response.ok) {
      // if (response.status === 200) {
            const data = await response.json();
            console.log("Upvote response data:", data);
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex] = {
              ...question,
              upvotes: data.upvotes || question.upvotes + 1,
              hasUpvoted: true,
            };
            setQuestions(updatedQuestions);
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

  const navigateToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const navigateToSearchWords = () => {
    navigation.navigate("SearchWords");
  };

  const navigateToQuestionDetail = (
    questionId: number,
    title: string,
    description: string,
    username: string,
    noUpvote: number,
    createdAt: string
  ) => {
    navigation.navigate("QuestionDetail", {
      questionId,
      title,
      description,
      username,
      noUpvote,
      createdAt,
    });
  };

  if (isLoading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#6a0dad" />
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={navigateToSearchWords}
          >
            <Ionicons name="search" size={20} color="#888" />
            <Text style={styles.searchText}>Search For Words...</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={navigateToCreateQuestion}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={questions}
          renderItem={({ item }) => (
            <QuestionItem
              question={item}
              onPress={() =>
                navigateToQuestionDetail(
                  item.id,
                  item.title,
                  item.description,
                  item.username,
                  item.upvotes,
                  item.createdAt
                )
              }
              onUpvote={() => handleUpvote(item.id)} // Pass the upvote handler
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.questionList}
        />
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#6a0dad",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
    marginLeft: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    borderRadius: 8,
    padding: 12,
  },
  searchText: {
    marginLeft: 8,
    color: "#888",
    fontSize: 16,
  },
  questionList: {
    flex: 1,
  },
});

export default ForumScreen;
