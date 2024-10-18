// BaseLayout.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook to get the current route

const BaseLayout = ({ children, navigation }) => {
  const route = useRoute(); // Get the current route

  const handleLogout = () => {
    // Simulate logout and navigate back to the login screen
    navigation.navigate("Login");
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  // Determine which icon should be filled based on the current route
  const isHome = route.name === "Home";
  const isForum = route.name === "Forum";

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.appName}>Quizzard</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dynamic Content Section */}
      <View style={styles.body}>{children}</View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons
            name={isHome ? "home" : "home-outline"} // Fill the icon if on Home page
            size={24}
            color="#6a0dad"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Forum")}
        >
          <Ionicons
            name={isForum ? "chatbox" : "chatbox-outline"} // Fill the icon if on Forum page
            size={24}
            color="#6a0dad"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6a0dad", // Dark purple color for the app name
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 45,
    paddingHorizontal: 40,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  navButton: {
    padding: 10,
  },
});

export default BaseLayout;
