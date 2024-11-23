import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";

const ProfileSettingsScreen = ({ navigation }) => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isPublicProfile, setIsPublicProfile] = useState(true);

  const handleSave = () => {
    // API call to save settings
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Profile Settings</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Profile Visibility</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isPublicProfile ? "Public" : "Private"}
            </Text>
            <Switch
              value={isPublicProfile}
              onValueChange={setIsPublicProfile}
              trackColor={{ false: "#767577", true: "#6a0dad" }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills the entire screen
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 0, // Adjust padding to avoid extra space
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333",
    marginBottom: 30,
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
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 16,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    margin: 20, // Spacing around the button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default ProfileSettingsScreen;
