import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../database/NavigationTypes";

const Post = ({ username, postData, onPress }) => {
  const { author, created_at, text, media_url, tags, likes } = postData;
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [likeCount, setLikeCount] = useState(postData.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) =>
      liked ? Math.max(0, prevCount - 1) : prevCount + 1
    );
  };
  const handleCommentPress = () => {
    navigation.navigate("CommentScreen", { postId: postData.id, username: username});
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postContainer}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.createdAt}>{created_at}</Text>
        <Text style={styles.text}>{text}</Text>
        {media_url && <Image source={{ uri: media_url }} style={styles.image} />}
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
                    <FontAwesome name="heart" size={18} color="#ff0000" style={styles.like}/>
                ) : (
                    <FontAwesome name="heart-o" size={18} color="#777" style={styles.like}/>
                )}
            </TouchableOpacity>
            <Text style={styles.likeCount}>{likeCount}</Text>
            <TouchableOpacity onPress={handleCommentPress}>
                <FontAwesome name="comment-o" size={18} color="#777" style={styles.comment} />
            </TouchableOpacity>
        </View>
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
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center', // Align items vertically
    justifyContent: 'flex-start', // Align items from the start
    width: '100%',
  },
  like: {
      marginLeft: 70,
  },
  likeCount: {
      color: 'white',
      marginLeft: 10,
  },
  comment: {
      marginLeft: 80,
  },
});

export default Post;
