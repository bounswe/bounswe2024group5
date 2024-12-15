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
  content: string;
  createdAt: string;
  noReplies: number;
  tags: string[];
  username: string;
  noUpvote: number;
  hasUpvoted: boolean;
}

const SearchResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { keyword } = route.params;
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  // const token = authContext ? authContext.token : null;
  const { token, username } = authContext;  // Now you can destructure both token and username

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const size = 20; // Number of items per page
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [upvotedPosts, setUpvotedPosts] = useState(new Set<number>());

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

        // Get upvote status for all fetched posts
        const upvotesPromises = data.map(post => 
          fetch(`${hostUrl}/api/posts/${post.id}/upvotes?username=${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(res => res.json())
        );

        const upvotesResults = await Promise.all(upvotesPromises);
        const upvotedPostIds = new Set(
          upvotesResults
            .map((result, index) => result.length > 0 ? data[index].id : null)
            .filter(id => id !== null)
        );
        setUpvotedPosts(upvotedPostIds);
        const formattedData = data.map((item) => ({
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
          hasUpvoted: upvotedPostIds.has(item.id),
        }));

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
        throw new Error('Failed to fetch search results');
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
    navigation.setOptions({ title: `Posts for "${keyword}":` });
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
    const isCurrentlyUpvoted = upvotedPosts.has(postId);

    try{ 
      if (isCurrentlyUpvoted) {
        // If already upvoted, remove upvote
          const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
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

            // Remove from upvotedPostIds
            setUpvotedPosts(prev => {
              const newSet = new Set(prev);
              newSet.delete(postId);
              return newSet;
            });
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
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex] = {
              ...question,
              noUpvote: data.noUpvote || question.noUpvote + 1,
              hasUpvoted: true,
            };
            setQuestions(updatedQuestions);

            // Add to upvotedPosts
            setUpvotedPosts(prev => new Set(prev).add(postId));
          } else if (response.status === 401) {
            Alert.alert("Unauthorized", "Please log in to upvote.");
          } else {
            throw new Error('Failed to add upvote');
          }
        }
      } catch (error) {
          console.error("Error handling upvote:", error);
          Alert.alert("Error", "Failed to upvote the post.");
      }
      
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
                item.content,
                item.username,
                item.noUpvote,
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
    backgroundColor: "#faf5ff",
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
