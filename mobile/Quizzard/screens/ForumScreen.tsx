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
      title: "What’s the difference between 'affect' and 'effect'?",
      description:
        "I often confuse 'affect' and 'effect'. Can someone explain the difference with examples?",
      createdAt: "1h ago",
      commentCount: 8,
    },
    {
      id: 2,
      title: "How do I use 'since' and 'for' correctly in sentences?",
      description:
        "I'm having trouble using 'since' and 'for' when talking about time. Can anyone give clear examples of when to use each?",
      createdAt: "2h ago",
      commentCount: 5,
    },
    {
      id: 3,
      title: "What’s the meaning of the word 'ubiquitous'?",
      description:
        "I came across the word 'ubiquitous' in an article. Can someone explain what it means and how to use it in a sentence?",
      createdAt: "3h ago",
      commentCount: 3,
    },
    {
      id: 4,
      title:
        "How can I remember the difference between 'their', 'there', and 'they’re'?",
      description:
        "I often get confused with 'their', 'there', and 'they’re'. What are some tips or tricks to remember the differences?",
      createdAt: "5h ago",
      commentCount: 10,
    },
    {
      id: 5,
      title: "What is the past tense of 'buy'?",
      description:
        "I'm trying to understand irregular verbs. Is 'buyed' the correct past tense of 'buy'?",
      createdAt: "6h ago",
      commentCount: 2,
    },
    {
      id: 6,
      title: "What’s the difference between 'lend' and 'borrow'?",
      description:
        "I'm confused about when to use 'lend' vs. 'borrow'. Can someone clarify with examples?",
      createdAt: "7h ago",
      commentCount: 6,
    },
    {
      id: 7,
      title: "How do I use 'could', 'would', and 'should' in polite requests?",
      description:
        "I'm learning modal verbs but struggle with using 'could', 'would', and 'should' correctly in polite requests. Any advice?",
      createdAt: "8h ago",
      commentCount: 7,
    },
    {
      id: 8,
      title: "Can someone explain the phrase 'kick the bucket'?",
      description:
        "I heard someone say 'kick the bucket' in a movie. What does this phrase mean?",
      createdAt: "9h ago",
      commentCount: 4,
    },
    {
      id: 9,
      title: "How do I form a question in the present perfect tense?",
      description:
        "I’m having difficulty forming questions in the present perfect tense. Can someone give examples?",
      createdAt: "10h ago",
      commentCount: 5,
    },
    {
      id: 10,
      title: "What’s the difference between 'few' and 'a few'?",
      description:
        "I’ve seen both 'few' and 'a few' used in sentences, but I’m not sure when to use each. Can anyone explain?",
      createdAt: "12h ago",
      commentCount: 6,
    },
  ]);

  const navigateToCreateQuestion = () => {
    navigation.navigate("CreateQuestion");
  };

  const navigateToSearchWords = () => {
    navigation.navigate("SearchWords");
  };

  const navigateToQuestionDetail = (
    questionId: number,
    title: string,
    description: string
  ) => {
    navigation.navigate("QuestionDetail", { questionId, title, description });
  };

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
