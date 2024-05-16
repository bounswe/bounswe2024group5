import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { RegisteredUser } from "../database/types";

const ProfilePage = ({ navigation }) => {
  const { user } = useAuth();
  const registeredUser: RegisteredUser = {
    username: "melodymelinda",
    password: "password",
    profile: {
      followingList: [],
      followerList: [],
      sharedPosts: [],
      bio: "I love music!",
      publicName: "Melody Melinda",
      profilePicture: "profile_pic.png",
      socialPlatforms: [],
      private: true,
    },
    blockedUsers: [],
    likedPosts: [],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.platformName}>Melodify</Text>
      <View style={styles.separator}></View>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Image
            source={require("../assets/profile_pic.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user ? user.name : "Melody Max"}</Text>
          <Text style={styles.username}>
            {user ? user.username : "@melodymelinda"}
          </Text>
          <Text style={styles.online}>online</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.followContainer}>
            <Text style={styles.followerNumber}>10K</Text>
            <Text style={styles.followerText}>followers</Text>
            <Text style={styles.followingNumber}>50</Text>
            <Text style={styles.followingText}>following</Text>
          </View>
          <View style={styles.currentlyListeningContainer}>
            <Text style={styles.listening}>Listening now</Text>
            <Text style={styles.songname}>Song Name - Artist</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer_edit}
            onPress={() =>
              navigation.navigate("ProfileSettingsScreen", {
                user: registeredUser,
              })
            }
          >
            <Text style={styles.editprofileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.bottomSection}>
        <Text style={styles.activityTitle}>Last Activities</Text>
        <TouchableOpacity
          style={styles.buttonContainer_share}
          onPress={() => navigation.navigate("CreatePostScreen")}
        >
          <Text style={styles.sharePostButtonText}>+ Share a Post</Text>
        </TouchableOpacity>
      </View>
      {/* Render user's posts here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#111927",
  },
  platformName: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#ffffff",
  },
  topSection: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#ffffff",
  },
  username: {
    fontSize: 12,
    marginBottom: 5,
    color: "#C1C1C2",
  },
  online: {
    color: "#02BC02",
    marginBottom: 15,
  },
  buttonContainer_edit: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  editprofileButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  rightSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  followContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  followerNumber: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  followerText: {
    marginLeft: 5,
    color: "#ffffff",
  },
  followingNumber: {
    marginLeft: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  followingText: {
    marginLeft: 5,
    color: "#ffffff",
  },
  currentlyListeningContainer: {
    marginBottom: 20,
  },
  listening: {
    color: "#C1C1C2",
  },
  songname: {
    color: "#ffffff",
  },
  buttonContainer_share: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  sharePostButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#888888",
    marginTop: 10,
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  bottomSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ProfilePage;
