import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "./AuthProvider";
import HostUrlContext from "../app/HostContext";
import BaseLayout from "./BaseLayout";

const ProfileSettingsScreen = ({ navigation }) => {
  const hostUrl = useContext(HostUrlContext).replace(/\/+$/, "");
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${hostUrl}/api/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name || "");
          setEmail(data.email || "");
        } else {
          const errorData = await response.json();
          Alert.alert(
            "Error",
            errorData.message || "Failed to fetch profile data."
          );
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`${hostUrl}/api/profile/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "Profile updated successfully.", [
          {
            text: "OK",
            onPress: () => {
              // Navigate back and trigger profile refresh
              navigation.goBack();
            },
          },
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "An error occurred while updating profile.");
    }
  };

  const handleCancel = () => {
    // Navigate back without saving changes
    navigation.goBack();
  };

  if (loading) {
    return (
      <BaseLayout navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6a0dad" />
          <Text>Loading...</Text>
        </View>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout navigation={navigation}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Profile Settings</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
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
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 0,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileSettingsScreen;
