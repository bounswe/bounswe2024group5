// ForumScreen.tsx
import React, { useState, useEffect, useContext } from "react";
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

const ForumScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");

  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null; // Get the token if authContext is not null

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${hostUrl}/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched:", data);

          // Check if data is an array
          if (Array.isArray(data)) {
            // Map the API data to match the structure expected by QuestionItem
            const formattedData = data.map((item) => ({
              id: item.id,
              title: item.title,
              description: item.content,
              createdAt: item.createdAt,
              commentCount: item.commentCount || 0, // Adjust based on your API response
            }));
            setQuestions(formattedData);
          } else {
            console.error("Data is not an array:", data);
            Alert.alert(
              "Error",
              "Unexpected data format received from server."
            );
          }
        } else {
          const errorData = await response.json();
          console.error("Error response data:", errorData);
          Alert.alert("Error", errorData.message || "Failed to fetch posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        Alert.alert("Error", "Failed to fetch posts. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [hostUrl, token]);

  const navigateToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const navigateToSearchWords = () => {
    navigation.navigate("SearchWords");
  };

  const navigateToQuestionDetail = (questionId, title, description) => {
    navigation.navigate("QuestionDetail", { questionId, title, description });
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
                navigateToQuestionDetail(item.id, item.title, item.description)
              }
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
