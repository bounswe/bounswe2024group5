import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { RegisteredUser } from "../database/types";

const ProfilePage = ({ route, navigation }) => {
  const { registeredUser } = route.params;
  const { token, logout } = useAuth(); // Assume useAuth provides user details and logout function
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(
        `http://34.118.44.165:80/api/posts?author=${registeredUser.username}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        console.error("Failed to fetch user posts", response);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  const handleLogout = () => {
    logout(); // Clear user data and token
    navigation.replace("Login"); // Navigate to login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.platformName}>Melodify</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.topSection}>
        <View style={styles.leftSection}>
          <Image
            source={require("../assets/profile_pic.png")}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {registeredUser.profile.name} {registeredUser.profile.surname}
          </Text>
          <Text style={styles.username}>@{registeredUser.username}</Text>
          <Text style={styles.online}>online</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.followContainer}>
            <Text style={styles.followerNumber}>
              {registeredUser.profile.followers}
            </Text>
            <Text style={styles.followerText}>followers</Text>
            <Text style={styles.followingNumber}>
              {registeredUser.profile.following}
            </Text>
            <Text style={styles.followingText}>following</Text>
          </View>
          <View style={styles.bioContainer}>
            <Text style={styles.biotitle}>Bio</Text>
            <Text style={styles.bio}> {registeredUser.profile.bio} </Text>
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
      {/* <ScrollView>
        <View style={styles.bottomSection}>
          <Text style={styles.activityTitle}>Your Posts</Text>
          <View style={styles.postsSection}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postItem}>
            <Text style={styles.author}>@{post.author}</Text>
            <Text style={styles.createdAt}>{post.created_at}</Text>
            <Text style={styles.text}>{post.text}</Text>
            {post.media_url && <Image source={{ uri: post.media_url }} style={styles.image} />}
            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
            </View>
            </View>
          ))}
        </View>
        </View>
      </ScrollView> */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate("CreatePostScreen", {
            registeredUser: registeredUser,
          })
        }
      >
        <Ionicons name="add" size={24} color="#111927" />
      </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  platformName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#192f6a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#888888",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
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
  bioContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  biotitle: {
    color: "#C1C1C2",
  },
  bio: {
    color: "#ffffff",
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
  bottomSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  postsSection: {
    marginTop: 50,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  postsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  postItem: {
    backgroundColor: "#192f6a",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { height: 2, width: 2 },
  },
  author: {
    fontSize: 20,
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
});

export default ProfilePage;
