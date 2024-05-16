import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video, ResizeMode } from "expo-av"; // Import Video and ResizeMode from expo-av
import CustomModal from "../components/CustomModal";

const CreatePostScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState<string | null>(null);

  const pickMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setMedia(result.assets[0].uri);
    }
  };

  const handlePostCreation = async () => {
    if (!postContent.trim()) {
      Alert.alert("Post content is required");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 1500);

    const requestBody = {
      text: postContent.trim(),
      media_url: media, // Assuming you have the media URL stored in the 'media' state
      tags: customTags,
    };
  
    try {
      const response = await fetch('http://34.118.44.165:80/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Content-Length": JSON.stringify(requestBody).length.toString(),
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Post created successfully. Post ID:', responseData.postId);
        setModalVisible(true);
      } else {
        console.error('Failed to create post:', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrorMessage('Failed to create post. Please try again.');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const addCustomTag = () => {
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
    <View style={styles.container}>
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
        <Text style={styles.mediaButtonText}>Attach Media</Text>
      </TouchableOpacity>
      {media && (
        <View style={styles.mediaPreviewContainer}>
          <Text style={styles.mediaPreviewText}>Media Preview:</Text>
          {media.match(/\.(jpeg|jpg|png)$/) ? (
            <Image source={{ uri: media }} style={styles.imagePreview} />
          ) : (
            <Video
              source={{ uri: media }}
              style={styles.videoPreview}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN} // Correct usage of ResizeMode
            />
          )}
        </View>
      )}
      <View style={styles.tagContainer}>
        {customTags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => removeCustomTag(index)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
        <TextInput
          style={styles.tagInput}
          placeholder="Add custom tag"
          placeholderTextColor="#ccc"
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={addCustomTag}
        />
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
          navigation.goBack();
        }}
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
  videoPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: "white",
  },
  tagInput: {
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
