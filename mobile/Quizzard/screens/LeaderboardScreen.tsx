import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BaseLayout from "./BaseLayout";
import HostUrlContext from "../app/HostContext";
import { useAuth } from "./AuthProvider";

type LeaderboardData = {
  username: string;
  solved?: number;
  created?: number;
  points?: number;
};

type LeaderboardResponse = {
  weekly: {
    quizSolved: LeaderboardData[];
    quizCreated: LeaderboardData[];
    pointsEarned: LeaderboardData[];
  };
  monthly: {
    quizSolved: LeaderboardData[];
    quizCreated: LeaderboardData[];
    pointsEarned: LeaderboardData[];
  };
};

const LeaderboardScreen = ({ navigation }) => {
  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly">("weekly");
  const [category, setCategory] = useState<
    "pointsEarned" | "quizSolved" | "quizCreated"
  >("pointsEarned");
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${hostUrl}/api/leaderboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data);
        } else {
          console.error("Failed to fetch leaderboard data");
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [hostUrl, token]);

  const getCategoryData = () => {
    if (!leaderboardData) return [];
    switch (category) {
      case "pointsEarned":
        return leaderboardData[timeFrame].pointsEarned;
      case "quizSolved":
        return leaderboardData[timeFrame].quizSolved;
      case "quizCreated":
        return leaderboardData[timeFrame].quizCreated;
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.score}>
        {category === "pointsEarned"
          ? item.points
          : category === "quizSolved"
          ? item.solved
          : item.created || 0}
      </Text>
    </View>
  );

  const renderToggleButtons = () => (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          timeFrame === "weekly" && styles.toggleButtonActive,
        ]}
        onPress={() => setTimeFrame("weekly")}
      >
        <Text
          style={[
            styles.toggleButtonText,
            timeFrame === "weekly" && styles.toggleButtonTextActive,
          ]}
        >
          Weekly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          timeFrame === "monthly" && styles.toggleButtonActive,
        ]}
        onPress={() => setTimeFrame("monthly")}
      >
        <Text
          style={[
            styles.toggleButtonText,
            timeFrame === "monthly" && styles.toggleButtonTextActive,
          ]}
        >
          Monthly
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryTabs = () => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={[
          styles.categoryTab,
          category === "pointsEarned" && styles.categoryTabActive,
        ]}
        onPress={() => setCategory("pointsEarned")}
      >
        <Text
          style={[
            styles.categoryText,
            category === "pointsEarned" && styles.categoryTextActive,
          ]}
        >
          Points Earned
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryTab,
          category === "quizSolved" && styles.categoryTabActive,
        ]}
        onPress={() => setCategory("quizSolved")}
      >
        <Text
          style={[
            styles.categoryText,
            category === "quizSolved" && styles.categoryTextActive,
          ]}
        >
          Quizzes Solved
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryTab,
          category === "quizCreated" && styles.categoryTabActive,
        ]}
        onPress={() => setCategory("quizCreated")}
      >
        <Text
          style={[
            styles.categoryText,
            category === "quizCreated" && styles.categoryTextActive,
          ]}
        >
          Quizzes Created
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#6a0dad" />
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        {renderToggleButtons()}
        {renderCategoryTabs()}
        {leaderboardData && (
          <FlatList
            data={getCategoryData()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    fontSize: 28,
    fontWeight: "900",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f5f3ff",
  },
  toggleButtonActive: {
    backgroundColor: "#6a0dad",
  },
  toggleButtonText: {
    color: "#6a0dad",
    fontWeight: "bold",
  },
  toggleButtonTextActive: {
    color: "#fff",
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
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 4,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  categoryTabActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },
  categoryTextActive: {
    color: "#6a0dad",
    fontWeight: "700",
  },
});

export default LeaderboardScreen;
