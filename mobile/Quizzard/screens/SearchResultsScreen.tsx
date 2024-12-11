// SearchResultsScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";
import QuestionItem from "../components/QuestionItem";
import { RootStackParamList } from "../app/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the SearchResultsScreen route prop
type SearchResultsScreenRouteProp = RouteProp<
  RootStackParamList,
  "SearchResults"
>;

type Props = {
  route: SearchResultsScreenRouteProp;
  navigation: any;
};

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

const SearchResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { keyword } = route.params;
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const size = 20; // Number of items per page
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [upvotedPostIds, setUpvotedPostIds] = useState(new Set<number>());

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

  // Function to map API data to Question interface
  const mapDataToQuestions = (data: any[]): Question[] => {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.content, // Map 'content' to 'description'
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
      hasUpvoted: upvotedPostIds.has(item.id),
    }));
  };

  // Fetch search results
  const fetchSearchResults = async (currentPage: number) => {
    try {
      const response = await fetch(
        `${hostUrl}/api/posts/search?keyword=${encodeURIComponent(
          keyword
        )}&page=${currentPage}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const formattedData = mapDataToQuestions(data);

        if (currentPage === 0) {
          setQuestions(formattedData);
        } else {
          setQuestions((prev) => [...prev, ...formattedData]);
        }

        // If fewer items are returned than the page size, no more data
        if (data.length < size) {
          setHasMore(false);
        }
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Error",
          errorData.message || "Failed to fetch search results."
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      Alert.alert("Error", "Failed to fetch search results. Please try again.");
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: `Search: "${keyword}"` });
    fetchSearchResults(0);
  }, [keyword]);

  const loadMore = () => {
    if (isFetchingMore || !hasMore) return;
    setIsFetchingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSearchResults(nextPage);
  };

  // Function to handle upvoting a question
  const handleUpvote = async (postId: number) => {
    // Find the question in the state
    const questionIndex = questions.findIndex((q) => q.id === postId);
    if (questionIndex === -1) return;

    const question = questions[questionIndex];

    if (question.hasUpvoted) {
      // If already upvoted, remove upvote
      try {
        const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          // Successfully removed upvote
          // Update the state
          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex].upvotes -= 1;
          updatedQuestions[questionIndex].hasUpvoted = false;
          setQuestions(updatedQuestions);

          // Remove from upvotedPostIds
          setUpvotedPostIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(postId);
            return newSet;
          });
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
        const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          console.log("Upvote response data:", data);
          // Assuming the response contains the updated upvote count
          const updatedUpvotes = data.upvotes || question.upvotes + 1;

          // Update the state
          const updatedQuestions = [...questions];
          updatedQuestions[questionIndex].upvotes = updatedUpvotes;
          updatedQuestions[questionIndex].hasUpvoted = true;
          setQuestions(updatedQuestions);

          // Add to upvotedPostIds
          setUpvotedPostIds((prev) => new Set(prev).add(postId));
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6d28d9" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found for "{keyword}".</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
            onUpvote={() => handleUpvote(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color="#6d28d9" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});

export default SearchResultsScreen;
