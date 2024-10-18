// ForumScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BaseLayout from "./BaseLayout";
import QuestionItem from "../components/QuestionItem";

const ForumScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Question 1",
      description: "This is the description for question 1...",
      createdAt: "2h ago",
      commentCount: 5,
    },
    {
      id: 2,
      title: "Question 2",
      description: "This is the description for question 2...",
      createdAt: "4h ago",
      commentCount: 3,
    },
    // Add more dummy questions...
  ]);

  const navigateToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const navigateToSearchWords = () => {
    navigation.navigate("SearchWords");
  };

  const navigateToQuestionDetail = (questionId: number) => {
    navigation.navigate("QuestionDetail", { questionId });
  };

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToCreateQuestion}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchBar}
          onPress={navigateToSearchWords}
        >
          <Ionicons name="search" size={20} color="#888" />
          <Text style={styles.searchText}>Search For Words...</Text>
        </TouchableOpacity>

        <FlatList
          data={questions}
          renderItem={({ item }) => (
            <QuestionItem
              question={item}
              onPress={() => navigateToQuestionDetail(item.id)}
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
    backgroundColor: "#F5F5F5",
  },
  addButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#6a0dad",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginTop: 80,
    marginBottom: 16,
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
