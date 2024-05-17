import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../components/CustomModal";

const CreatePostScreen = ({ route, navigation }) => {
  const { registeredUser } = route.params;
  const { user, token } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Camera roll permission is needed.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedMedia = result.assets[0].uri;
      setMedia(selectedMedia);

      const formData = new FormData();
      formData.append("file", {
        uri: selectedMedia,
        name: "upload.jpg",
        type: "image/jpeg",
      });

      setUploading(true); // Start uploading
      try {
        const uploadResponse = await fetch(
          "http://34.118.44.165/api/file/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(`HTTP error! Status: ${uploadResponse.status}`);
        }
        console.log("Media file uploaded successfully");
        const uploadData = await uploadResponse.text();
        setMediaUrl(uploadData);
      } catch (error) {
        console.error("Error uploading media file:", error);
        Alert.alert("Error", "Failed to upload media file. Please try again.");
      } finally {
        setUploading(false); // End uploading
      }
    }
  };

  const handlePostCreation = async () => {
    if (!postContent.trim()) {
      Alert.alert("Post content is required");
      return;
    }

    setLoading(true);

    const requestBody = {
      text: postContent.trim(),
      media_url: mediaUrl,
      tags: customTags,
    };
    console.log("Creating post with data:", requestBody);
    try {
      const response = await fetch("http://34.118.44.165/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(
          "Post created successfully. Post ID:",
          responseData.post_id
        );
        setModalVisible(true);
      } else {
        console.error("Failed to create post:", response.status);
        if (response.status === 401) {
          setErrorMessage("Unauthorized. Please check your token.");
        } else {
          setErrorMessage(
            `Failed to create post. Status code: ${response.status}`
          );
        }
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("Failed to create post. Please try again.");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const addCustomTag = () => {
    console.log("Adding custom tag:", tagInput);
    if (tagInput.trim()) {
      setCustomTags([...customTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeCustomTag = (index: number) => {
    const newTags = [...customTags];
    newTags.splice(index, 1);
    setCustomTags(newTags);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          placeholderTextColor="#ccc"
          multiline
          value={postContent}
          onChangeText={setPostContent}
        />
      </View>
      <TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
        <Ionicons name="attach" size={24} color="white" />
        <Text style={styles.mediaButtonText}>Attach Image</Text>
      </TouchableOpacity>
      {uploading && <ActivityIndicator size="large" color="#00ff00" />}
      {media && (
        <View style={styles.mediaPreviewContainer}>
          <Text style={styles.mediaPreviewText}>Image Preview:</Text>
          <Image source={{ uri: media }} style={styles.imagePreview} />
        </View>
      )}
      <View style={styles.tagContainer}>
        {customTags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity
              onPress={() => removeCustomTag(index)}
              style={styles.removeTagButton}
            >
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.tagInputContainer}>
        <TextInput
          style={styles.tagInput}
          placeholder="Add custom tag"
          placeholderTextColor="#ccc"
          value={tagInput}
          onChangeText={setTagInput}
        />
        <TouchableOpacity onPress={addCustomTag} style={styles.addTagButton}>
          <Text style={styles.addTagButtonText}>Add Tag</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePostCreation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      <CustomModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => {
          setModalVisible(false);
          if (!errorMessage) {
            navigation.goBack();
          }
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#111927",
  },
  inputContainer: {
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 200,
    textAlignVertical: "top",
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
  },
  mediaButton: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    flexDirection: "row",
  },
  mediaButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  mediaPreviewContainer: {
    marginBottom: 20,
  },
  mediaPreviewText: {
    color: "white",
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192f6a",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: "white",
    marginRight: 5,
  },
  removeTagButton: {
    padding: 5,
  },
  tagInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tagInput: {
    flex: 1,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  addTagButton: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
  },
  addTagButtonText: {
    color: "white",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  returnButton: {
    marginTop: 20,
    top: 10,
    left: 10,
  },
});

export default CreatePostScreen;
