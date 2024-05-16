import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const ProfileSettingsScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const [profileImage, setProfileImage] = useState(user.profile.profilePicture);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.profile.bio);
  const [publicName, setPublicName] = useState(user.profile.publicName);
  const [isPrivate, setIsPrivate] = useState(user.profile.private);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigation.goBack();
    }, 1500);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profilePic} />
        ) : (
          <View style={styles.placeholderProfilePic}>
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}
      </TouchableOpacity>
      <CustomButton title="Upload New Photo" onPress={pickImage} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>username:</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your new username"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>public name:</Text>
        <TextInput
          style={styles.textInput}
          value={publicName}
          onChangeText={setPublicName}
          placeholder="Enter your public name"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>bio:</Text>
        <TextInput
          style={styles.textInput}
          value={bio}
          onChangeText={setBio}
          placeholder="Enter your new bio"
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>Private Account:</Text>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setIsPrivate(!isPrivate)}
        >
          <Ionicons
            name={isPrivate ? "checkbox" : "square-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <CustomButton title="Save Changes" onPress={saveChanges} />
      {saving && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    backgroundColor: "#111927",
  },
  goBack: {
    marginBottom: 20,
    padding: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderProfilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "black",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    color: "black",
    fontSize: 16,
    paddingVertical: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  checkbox: {
    marginLeft: 10,
    backgroundColor: "#111927",
    padding: 10,
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileSettingsScreen;
