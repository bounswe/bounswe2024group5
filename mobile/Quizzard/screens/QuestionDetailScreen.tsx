import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../app/index"; // Importing types for navigation params

type QuestionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "QuestionDetail"
>;

type Props = {
  route: QuestionDetailScreenRouteProp;
  navigation: any;
};

const QuestionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  // Destructure the questionId, title, and description from the route parameters
  const { questionId, title, description } = route.params;

  // You can still fetch the question details based on the questionId if necessary
  const question = {
    id: questionId,
    title: title, // Use the passed title
    description: description, // Use the passed description
    createdAt: "2h ago",
    commentCount: 5,
    user: {
      name: "John Doe",
      avatar: "https://example.com/avatar.jpg",
    },
    comments: [
      {
        id: 1,
        user: {
          name: "Tsukasa Itsuki",
          avatar: "https://avatars.githubusercontent.com/u/18108223?v=4",
        },
        text: "Comment 1",
      },
      {
        id: 2,
        user: {
          name: "Yazhu Katsuhito",
          avatar:
            "https://camo.githubusercontent.com/31e59a6f219a99c429691cec62f185414a440f2807623b928c387eff9e4b7937/68747470733a2f2f692e70696e696d672e636f6d2f373336782f31362f37662f32642f31363766326462373263333331633636336161383035613939653266346466302e6a7067",
        },
        text: "Comment 2",
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back button to return to the previous screen */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Display the passed title */}
      <Text style={styles.title}>{question.title}</Text>

      {/* Display the passed description */}
      <Text style={styles.description}>{question.description}</Text>

      {/* Display metadata like creation time and number of comments */}
      <Text style={styles.metadata}>
        {question.createdAt} • {question.commentCount} comments
      </Text>

      {/* Header for the comments section */}
      <Text style={styles.commentsHeader}>Comments</Text>

      {/* Loop through the comments and display each */}
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
