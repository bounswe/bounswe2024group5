import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForumScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forum</Text>
      <Text style={styles.subtitle}>Welcome to the forum!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
});

export default ForumScreen;
