import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const SeePostScreen = ({ route, navigation }) => {
  const { post, username } = route.params;
  const { author, created_at, text, media_url, tags, likes } = post;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const imageUrl = media_url;
  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) =>
      liked ? Math.max(0, prevCount - 1) : prevCount + 1
    );
  };

  const handleCommentPress = () => {
    navigation.navigate("CommentScreen", {
      postId: post.id,
      username: username,
    });
  };

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
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={toggleLike}>
          {liked ? (
            <FontAwesome
              name="heart"
              size={18}
              color="#ff0000"
              style={styles.like}
            />
          ) : (
            <FontAwesome
              name="heart-o"
              size={18}
              color="#777"
              style={styles.like}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likeCount}</Text>
        <TouchableOpacity onPress={handleCommentPress}>
          <FontAwesome
            name="comment-o"
            size={18}
            color="#777"
            style={styles.comment}
          />
        </TouchableOpacity>
      </View>
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
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center", // Align items vertically
    justifyContent: "flex-start", // Align items from the start
    width: "100%",
  },
  like: {
    marginLeft: 70,
  },
  likeCount: {
    color: "white",
    marginLeft: 10,
  },
  comment: {
    marginLeft: 80,
  },
});

export default SeePostScreen;
