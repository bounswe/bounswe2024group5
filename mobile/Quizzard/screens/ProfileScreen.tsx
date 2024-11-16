import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import BaseLayout from "./BaseLayout";

const ProfileScreen = ({ navigation }) => {
  // Example data - in a real application, this would come from an API
  const userStats = {
    totalPoints: 1250,
    quizHistory: [
      { id: 1, title: "JavaScript Basics", score: 85, date: "2024-03-15" },
      { id: 2, title: "React Native", score: 92, date: "2024-03-14" },
    ],
    createdQuizzes: [
      { id: 1, title: "TypeScript Quiz", isPublic: true },
      { id: 2, title: "Mobile Dev Quiz", isPublic: false },
    ],
    posts: [
      { id: 1, title: "React Native Tips", likes: 24 },
      { id: 2, title: "JavaScript Best Practices", likes: 15 },
    ],
  };

  return (
    <BaseLayout navigation={navigation}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={styles.profileImage}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
            <Text style={styles.points}>
              Total Points: {userStats.totalPoints}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          <Text style={styles.buttonText}>Profile Settings</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz History</Text>
          {userStats.quizHistory.map((quiz) => (
            <View key={quiz.id} style={styles.card}>
              <Text style={styles.itemTitle}>{quiz.title}</Text>
              <Text style={styles.itemDetail}>
                Score: {quiz.score} - {quiz.date}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Created Quizzes</Text>
          {userStats.createdQuizzes.map((quiz) => (
            <View key={quiz.id} style={styles.card}>
              <Text style={styles.itemTitle}>{quiz.title}</Text>
              <Text style={styles.itemDetail}>
                {quiz.isPublic ? "Public" : "Private"}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {userStats.posts.map((post) => (
            <View key={post.id} style={styles.card}>
              <Text style={styles.itemTitle}>{post.title}</Text>
              <Text style={styles.itemDetail}>{post.likes} likes</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  headerInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
    textAlign: "left",
  },
  points: {
    fontSize: 16,
    color: "#6a0dad",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "left",
  },
  settingsButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "left",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
    textAlign: "left",
  },
  itemDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
  },
});

export default ProfileScreen;
