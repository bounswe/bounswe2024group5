import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BaseLayout from "./BaseLayout";

// Dummy data for the leaderboard
const dummyLeaderboardData = [
  { id: "1", username: "JohnDoe", score: 1250, rank: 1 },
  { id: "2", username: "AliceSmith", score: 1100, rank: 2 },
  { id: "3", username: "BobJohnson", score: 950, rank: 3 },
  { id: "4", username: "EmmaDavis", score: 800, rank: 4 },
  { id: "5", username: "MikeWilson", score: 750, rank: 5 },
];

const LeaderboardScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <FlatList
          data={dummyLeaderboardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6d28d9",
    marginBottom: 20,
    textAlign: "center",
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f3ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    width: 50,
    color: "#6d28d9",
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6d28d9",
  },
});

export default LeaderboardScreen;
