import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type QuestionItemProps = {
  question: {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    commentCount: number;
  };
  onPress: () => void;
};

const QuestionItem: React.FC<QuestionItemProps> = ({ question, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.description}>
        {question.description.slice(0, 50)}...
      </Text>
      <View style={styles.metadata}>
        <Text style={styles.metadataText}>{question.createdAt}</Text>
        <Text style={styles.metadataText}>
          {question.commentCount} comments
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  metadata: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metadataText: {
    fontSize: 12,
    color: "#888",
  },
});

export default QuestionItem;
