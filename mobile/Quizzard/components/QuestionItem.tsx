// QuestionItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the upvote icon
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../app/index";

type QuestionItemProps = {
  question: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    noReplies: number;
    tags: string[];
    username: string;
    noUpvote: number;
    hasUpvoted: boolean; // Add hasUpvoted field
  };
  onPress: () => void;
  onUpvote: () => void; // Add onUpvote prop
};

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  onPress,
  onUpvote,
}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.content}>
        {question.content.slice(0, 100)}...
      </Text>

      <View style={styles.metadata}>
        <TouchableOpacity onPress={() => navigation.navigate('OtherUserProfileScreen', { username: question.username })}>
          <Text style={styles.username}>@{question.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upvoteContainer}
          onPress={onUpvote}
          activeOpacity={0.7}
        >
          <Ionicons
            name={question.hasUpvoted ? "heart" : "heart-outline"}
            size={20}
            color={question.hasUpvoted ? "#e0245e" : "#4c1d95"}
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
        <Text style={styles.metadataText}>
          {question.noReplies} comments
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3e8ff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    borderColor: "#e0e0e0",
    borderWidth: 1,
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
  username: {
    fontSize: 12,
    color: "#888",
  },
  upvoteContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  upvoteText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#4c1d95",
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
    color: "#4c1d95",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metadataText: {
    fontSize: 12,
    color: "#888",
  },
});

export default QuestionItem;
