// LeftPage.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BaseLayout from './BaseLayout';

const HomePage = ({ navigation }) => {
  return (
    <BaseLayout navigation={navigation}>
      <Text style={styles.title}>Welcome Home</Text>
      <Text style={styles.subtitle}>You are logged in!</Text>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
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

export default HomePage;
