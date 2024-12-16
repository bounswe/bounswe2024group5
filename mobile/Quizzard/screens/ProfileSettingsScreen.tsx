import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import BaseLayout from "./BaseLayout";
import * as ImagePicker from "expo-image-picker";

const ProfileSettingsScreen = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Local image
  const [profilePictureUrl, setProfilePictureUrl] = useState(null); // URL from server
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // To indicate upload in progress

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${hostUrl}/api/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name || "");
          setEmail(data.email || "");
          setProfilePictureUrl(data.profilePicture || null);
        } else {
          let errorMessage = "Failed to fetch profile data.";
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (err) {
            const errorText = await response.text();
            console.error("Server Response:", errorText);
            errorMessage = `Failed to fetch profile data. Server responded with status ${response.status}.`;
          }
          Alert.alert("Error", errorMessage);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [hostUrl, token]);

  // Request permissions on component mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const handleChoosePhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // For square image
        quality: 0.7, // Adjust quality as needed
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setProfilePicture({
          uri: asset.uri,
          name: asset.fileName || "profile.jpg",
          type: asset.type || "image/jpeg",
        });
      }
    } catch (error) {
      console.error("Error opening image library:", error);
      Alert.alert("Error", "An error occurred while selecting the image.");
    }
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) return null;

    const formData = new FormData();
    formData.append("file", {
      uri: profilePicture.uri,
      name: profilePicture.name,
      type: profilePicture.type,
    });

    try {
      setUploading(true);
      const response = await fetch(`${hostUrl}/api/file/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do not set 'Content-Type' manually when using FormData
        },
        body: formData,
      });

      if (response.ok) {
        // Read the response as text since the server returns a plain URL
        const url = await response.text();
        // Validate the URL format (optional)
        if (url.startsWith("http")) {
          return url.trim(); // Remove any potential whitespace
        } else {
          console.error("Unexpected response format:", url);
          Alert.alert(
            "Error",
            "Unexpected server response. Please try again later."
          );
          return null;
        }
      } else {
        // Handle non-200 responses
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        Alert.alert(
          "Error",
          `Failed to upload profile picture. Server responded with status ${response.status}.`
        );
        return null;
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      Alert.alert(
        "Error",
        "An error occurred while uploading the profile picture."
      );
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      let uploadedProfilePictureUrl = profilePictureUrl;

      if (profilePicture) {
        const uploadedUrl = await uploadProfilePicture();
        if (uploadedUrl) {
          uploadedProfilePictureUrl = uploadedUrl;
        } else {
          // If upload failed, exit the function
          return;
        }
      }

      const response = await fetch(`${hostUrl}/api/profile/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          profilePicture: uploadedProfilePictureUrl,
        }),
      });

      if (response.ok) {
        // Assuming the server returns JSON on successful update
        const data = await response.json();
        Alert.alert("Success", "Profile updated successfully.", [
          {
            text: "OK",
            onPress: () => {
              // Navigate back and trigger profile refresh
              navigation.goBack();
            },
          },
        ]);
      } else {
        // Handle non-200 responses
        let errorMessage = "Failed to update profile.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (err) {
          const errorText = await response.text();
          console.error("Server Response:", errorText);
          errorMessage = `Failed to update profile. Server responded with status ${response.status}.`;
        }
        Alert.alert("Error", errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating the profile.");
    }
  };

  const handleCancel = () => {
    // Navigate back without saving changes
    navigation.goBack();
  };

  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6d28d9" />
          <Text>Loading...</Text>
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>

          <View style={styles.profilePictureContainer}>
            {profilePicture ? (
              <Image
                source={{ uri: profilePicture.uri }}
                style={styles.profilePicture}
              />
            ) : profilePictureUrl ? (
              <Image
                source={{ uri: profilePictureUrl }}
                style={styles.profilePicture}
              />
            ) : (
              <View
                style={[
                  styles.profilePicture,
                  styles.profilePicturePlaceholder,
                ]}
              >
                <Text style={styles.profilePicturePlaceholderText}>
                  No Photo
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChoosePhoto}
              disabled={uploading} // Disable button while uploading
            >
              <Text style={styles.changePhotoButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              editable={!uploading} // Disable input while uploading
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your email"
              editable={!uploading} // Disable input while uploading
            />
          </View>
        </ScrollView>

        {uploading && (
          <View style={styles.uploadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={uploading} // Disable button while uploading
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.saveButton,
              uploading && styles.disabledButton, // Apply disabled style
            ]}
            onPress={handleSave}
            disabled={uploading} // Disable button while uploading
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // To avoid overlap with buttons
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e1e4e8",
  },
  profilePicturePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicturePlaceholderText: {
    color: "#fff",
    fontSize: 16,
  },
  changePhotoButton: {
    marginTop: 10,
    backgroundColor: "#6d28d9",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  changePhotoButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#a9a9a9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  uploadingText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
});

export default ProfileSettingsScreen;
