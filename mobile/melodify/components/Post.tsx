import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Post = ({ postData, onPress }) => {
  const { author, created_at, text, imageUrl, tags, likes } = postData;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postContainer}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  author: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  createdAt: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
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

export default Post;
