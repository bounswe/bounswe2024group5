import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
} from "react-native";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.platformName}>Melodify</Text>
      <View style={styles.separator}></View>

      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Left Section for the profile picture, name, online status, and edit profile button.*/}
        <View style={styles.leftSection}>
          <Image
            source={require("../assets/profile_pic.png")}
            style={styles.profileImage as StyleProp<ImageStyle>}
          />
          {/* Name and Username */}
          <Text style={styles.name}>Melody Max</Text>
          <Text style={styles.username}>@melodymelinda</Text>
          <Text style={styles.online}>online</Text>

          {/* Edit Profile Button */}
          <View style={styles.buttonContainer_edit}>
            <TouchableOpacity
              onPress={() => console.log("Edit profile button pressed")}
              style={styles.editprofileButton}
            >
              <Text style={styles.editprofileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Section for followers info, current song, and create post button.*/}
        <View style={styles.rightSection}>
          {/* Followers and Following */}
          <View style={styles.followContainer}>
            <Text style={styles.followerNumber}>10K</Text>
            <Text style={styles.followerText}>folowers</Text>
            <Text style={styles.followingNumber}>50</Text>
            <Text style={styles.followingText}>following</Text>
          </View>

          {/* Currently Listening */}
          <View style={styles.currentlyListeningContainer}>
            <Text style={styles.listening}>Listening now</Text>
            <Text style={styles.songname}>Song Name - Artist</Text>
          </View>

          {/* New Post Button */}
          <View style={styles.buttonContainer_share}>
            <TouchableOpacity
              onPress={() => console.log("New post button pressed")}
              style={styles.newpostButton}
            >
              <Text style={styles.newpostButtonText}>+ Share a Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator}></View>
      {/* Latest Activity */}
      <Text style={styles.activityTitle}>Last Activities</Text>
      {/* Posts */}
      {/* Render user's posts here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#111927", // Dark blue background color
  },
  platformName: {
    marginTop: 30,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff", // White text color
  },
  topSection: {
    marginBottom: 20,
    flexDirection: "row", // Arrange children horizontally
    alignItems: "flex-start", // Align children vertically
  },
  leftSection: {
    alignItems: "flex-start", // Align children vertically
    marginBottom: 10,
    flex: 1, // Take remaining space
    flexDirection: "column", // Stack children vertically
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
    alignItems: "flex-start",
    marginBottom: 5,
    color: "#ffffff", // White text color
  },
  username: {
    fontSize: 12,
    marginBottom: 5,
    color: "#C1C1C2", // light gray text color
  },
  online: {
    alignItems: "flex-start",
    color: "#02BC02", // Green text color
    marginBottom: 15,
  },
  buttonContainer_edit: {
    borderRadius: 20,
    padding: 5,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff", // Light blue background color
  },
  editprofileButton: {
    alignSelf: "flex-start",
    textAlign: "center",
    backgroundColor: "ffffff",
  },
  editprofileButtonText: {
    fontSize: 12, // Adjust font size here
    color: "#111927",
    fontWeight: "bold",
  },
  rightSection: {
    flexDirection: "column", // Stack children vertically
    marginTop: 15,
    marginBottom: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1, // Take remaining space
  },
  followContainer: {
    flexDirection: "row",
    marginBottom: 50,
    marginTop: 20,
    justifyContent: "flex-end",
    // flex: 1, // Take remaining space
  },
  followerNumber: {
    color: "#ffffff", // White text color
    fontWeight: "bold",
  },
  followerText: {
    color: "#ffffff", // White text color
    marginLeft: 5,
  },
  followingNumber: {
    color: "#ffffff", // White text color
    fontWeight: "bold",
    marginLeft: 20,
  },
  followingText: {
    color: "#ffffff", // White text color
    marginLeft: 5,
  },
  currentlyListeningContainer: {
    marginBottom: 10,
    marginRight: 20,
    alignItems: "flex-end",
  },
  listening: {
    color: "#C1C1C2", // light gray text color
  },
  songname: {
    color: "#ffffff", // White text color
  },
  buttonContainer_share: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 5,
    justifyContent: "center",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#ffffff", // Light blue background color
  },
  newpostButton: {
    alignSelf: "center",
    textAlign: "center",
  },
  newpostButtonText: {
    fontSize: 20, // Adjust font size here
    fontWeight: "bold",
    color: "#111927",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#888888", // Light gray border color
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff", // White text color
  },
});

export default ProfilePage;
