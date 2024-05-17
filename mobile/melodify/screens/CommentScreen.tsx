import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import CustomModal from "../components/CustomModal";
import { useAuth } from "./AuthProvider";

type CommentScreenRouteProp = RouteProp<
  { CommentScreen: { postId: string } },
  "CommentScreen"
>;

interface CommentScreenProps {
  route: CommentScreenRouteProp;
}

interface Comment {
  comment: string;
  commentId?: string;
  username?: string;
}

const CommentScreen: React.FC<CommentScreenProps> = ({ route }) => {
  const { postId, username } = route.params;
  // Use the postId value in your component
  console.log("postId:", postId);
  const { login, token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message

  const handleAddComment = async () => {
    if (newComment.trim() == "") {
      setErrorMessage("Comment cannot be empty");
      setModalVisible(true);
      return;
    }
    const requestBody = {
      comment: newComment.trim(),
      username: username,
    };
    console.log('requestBody:', requestBody)
    try {
      const response = await fetch(`http://34.118.44.165:80/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestBody }),
      });
      console.log('token:', token)
      console.log('response:', response)
      if (response.ok) {
        setComments([...comments, requestBody]);
        setNewComment("");
      } else {
        setErrorMessage("Failed to add comment");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setErrorMessage("Failed to add comment");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
        <FlatList
    data={comments}
    keyExtractor={(item) => item.commentId.toString()}
    renderItem={({ item }) => (
      <View style={styles.commentContainer}>
        <Text style={styles.usernameText}>User</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    )}
    ListHeaderComponent={
      <Text style={styles.title}>Comments</Text>
    }
    ListFooterComponent={(
      <>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment"
            value={newComment}
            onChangeText={(text) => setNewComment(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddComment}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <CustomModal
          visible={modalVisible}
          message={errorMessage}
          onClose={() => setModalVisible(false)}
        />
      </>
    )}
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111927",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  commentContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111927",
  },
  commentText: {
    fontSize: 16,
    color: "#111927",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: "white",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CommentScreen;
