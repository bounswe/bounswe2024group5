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
  content: string;
  createdAt: string;
  noReplies: number;
  tags: string[];
  username: string;
  noUpvote: number;
  hasUpvoted: boolean;
}

const ForumScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");

  const authContext = useAuth(); // Get the authentication context

  const [upvotedPostIds, setUpvotedPostIds] = useState(new Set<number>());

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 5;

  // Load upvoted post IDs from AsyncStorage when the component mounts
  useEffect(() => {
    const loadUpvotedPosts = async () => {
      try {
        const storedUpvoted = await AsyncStorage.getItem("upvotedPostIds");
        if (storedUpvoted) {
          const parsedUpvoted = JSON.parse(storedUpvoted);
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
  const { token, username } = authContext;  // Now you can destructure both token and username
  const [isUpvoted, setIsUpvoted] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const checkNextPage = async (currentPageData: any[]) => {
        if (currentPageData.length === PAGE_SIZE) {
          // If current page is full, check next page
          try {
            const nextPageResponse = await fetch(
              `${hostUrl}/api/feed?page=${currentPage + 1}&size=${PAGE_SIZE}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (nextPageResponse.ok) {
              const nextPageData = await nextPageResponse.json();
              const nextPosts = Array.isArray(nextPageData)
                ? nextPageData
                : nextPageData.content;
              // If next page has content, there are more pages
              return nextPosts && nextPosts.length > 0;
            }
          } catch (error) {
            console.error("Error checking next page:", error);
          }
        }
        return false;
      };

      const fetchPosts = async () => {
        setIsLoading(true);
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
              content: item.content,
              createdAt: new Date(item.createdAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              noReplies: item.noReplies || 0,
              tags: item.tags || [],
              username: item.username || item.user?.username || "Anonymous",
              noUpvote: item.noUpvote || 0,
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
              noUpvote: question.noUpvote - 1,
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
              noUpvote: data.noUpvote || question.noUpvote + 1,
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
    content: string,
    username: string,
    noUpvote: number,
    createdAt: string
  ) => {
    navigation.navigate("QuestionDetail", {
      questionId,
      title,
      content,
      username,
      noUpvote,
      createdAt,
    });
  };

  const PaginationControls = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === 0 && styles.pageButtonDisabled,
        ]}
        onPress={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
        disabled={currentPage === 0}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={currentPage === 0 ? "#999" : "white"}
        />
        <Text
          style={[
            styles.pageButtonText,
            currentPage === 0 && styles.pageButtonTextDisabled,
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <View style={styles.pageIndicator}>
        <Text style={styles.pageText}>
          {currentPage + 1} / {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage >= totalPages - 1 && styles.pageButtonDisabled,
        ]}
        onPress={() =>
          setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
        }
        disabled={currentPage >= totalPages - 1}
      >
        <Text
          style={[
            styles.pageButtonText,
            currentPage >= totalPages - 1 && styles.pageButtonTextDisabled,
          ]}
        >
          Next
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={currentPage >= totalPages - 1 ? "#999" : "white"}
        />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#6d28d9" />
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
                  item.content,
                  item.username,
                  item.noUpvote,
                  item.createdAt
                )
              }
              onUpvote={() => handleUpvote(item.id)} // Pass the upvote handler
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.questionList}
        />

        <PaginationControls />
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
    backgroundColor: "#6d28d9",
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  pageButton: {
    backgroundColor: "#6a0dad",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 100,
    justifyContent: "center",
    elevation: 2,
  },
  pageButtonDisabled: {
    backgroundColor: "#f0f0f0",
    elevation: 0,
  },
  pageButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 4,
  },
  pageButtonTextDisabled: {
    color: "#999",
  },
  pageIndicator: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  pageText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
});

export default ForumScreen;
