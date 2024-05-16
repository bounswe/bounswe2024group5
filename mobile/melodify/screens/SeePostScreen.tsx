import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SeePostScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const { author, created_at, text, imageUrl, tags, likes } = post;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.author}>{author}</Text>
      <Text style={styles.createdAt}>{created_at}</Text>
      <Text style={styles.text}>{text}</Text>
      {imageUrl && <Image source={imageUrl} style={styles.image} />}
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
      <Text style={styles.likes}>{likes} likes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111927",
  },
  goBack: {
    marginBottom: 20,
    padding: 10, // Adjust padding as needed
  },
  author: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  createdAt: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#3b5998",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  likes: {
    fontSize: 16,
    color: "white",
  },
});

export default SeePostScreen;
