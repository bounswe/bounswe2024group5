import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For the back button icon
import { RootStackParamList } from "../app/index";

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

  // Fetch question details based on questionId
  // This is a placeholder, replace with actual data fetching logic
  const question = {
    id: questionId,
    title: "Question Title",
    description: "Full description of the question...",
    createdAt: "2h ago",
    commentCount: 5,
    user: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
    },
    comments: [
      {
        id: 1,
        user: { name: "User 1", avatar: "https://example.com/avatar1.jpg" },
        text: "Comment 1",
      },
      {
        id: 2,
        user: { name: "User 2", avatar: "https://example.com/avatar2.jpg" },
        text: "Comment 2",
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.description}>{question.description}</Text>
      <Text style={styles.metadata}>
        {question.createdAt} • {question.commentCount} comments
      </Text>

      <Text style={styles.commentsHeader}>Comments</Text>
      {question.comments.map((comment) => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
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
  },
  commentText: {
    fontSize: 14,
  },
  metadata: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
});

export default QuestionDetailScreen;
