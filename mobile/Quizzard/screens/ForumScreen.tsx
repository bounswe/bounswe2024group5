// ForumScreen.tsx
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BaseLayout from './BaseLayout';

const ForumScreen = ({ navigation }) => {
  return (
    <BaseLayout navigation={navigation}>
      <Text style={styles.title}>Welcome to the forum!</Text>
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
});

export default ForumScreen;
