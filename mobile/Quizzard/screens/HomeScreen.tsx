import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing icons from Expo

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Simulate logout and navigate back to the login screen
    navigation.navigate('Login');
  };

  const navigateToForum = () => {
    // Navigate to the forum page
    navigation.navigate('Forum');
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appName}>Quizzard</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleLogout}>
            <Ionicons name="power-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <Text style={styles.title}>Welcome Home</Text>
        <Text style={styles.subtitle}>You are logged in!</Text>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={navigateToForum}>
          <Ionicons name="chatbox-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a0dad', // Dark purple color for the app name
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#6a0dad',
    marginBottom: 40,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#f2f2f2', // Light background for the navbar
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navButton: {
    padding: 10,
  },
});

export default HomeScreen;
