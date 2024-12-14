// BaseLayout.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native"; // Import useRoute hook to get the current route

const BaseLayout = ({ children, navigation }) => {
  const route = useRoute(); // Get the current route

  // Add state for modal visibility
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  // Determine which icon should be filled based on the current route
  const isHome = route.name === "Home";
  const isForum = route.name === "Forum";
  const isLeaderboard = route.name === "Leaderboard";

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.appName}>Quizzard</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={navigateToProfile}
          >
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dynamic Content Section - Modified styles */}
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Leaderboard")}
        >
          <Ionicons
            name={isLeaderboard ? "trophy" : "trophy-outline"}
            size={24}
            color="#6a0dad"
          />
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning" size={50} color="#d97706" />
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>Are you sure you want to quit?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.quitButton]}
                onPress={() => {
                  setShowLogoutModal(false);
                  navigation.navigate("Login");
                }}
              >
                <Text style={[styles.modalButtonText, styles.quitButtonText]}>
                  Quit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 0,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  quitButton: {
    backgroundColor: "#dc2626",
  },
  quitButtonText: {
    color: "white",
  },
});

export default BaseLayout;
