// HomeScreen.tsx
import React from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import BaseLayout from './BaseLayout';
import QuizViewComponent from '../components/QuizViewComponent';  // Adjust the path if necessary
import mockQuizData from '../mockdata/mockQuizData';  // Adjust the path if necessary
// delete the following mock data later:


const HomePage = ({ navigation }) => {
  const navigateToQuizCreation = () => {
    // Navigate to Quiz Creation page
    navigation.navigate('QuizCreation');
  };

  return (
    <BaseLayout navigation={navigation}>
      {/* Quizzes For You Section */}
      <View style={styles.quizzesForYouHeader}>
        <Text style={styles.sectionTitle}>Quizzes For You</Text>
        <TouchableOpacity style={styles.addQuizButton} onPress={navigateToQuizCreation}>
          <Text style={styles.addQuizButtonText}>+ Add Quiz</Text>
        </TouchableOpacity>
      </View>

      {/* Placeholder for Quizzes For You content */}
      <View style={styles.quizSection}>
        <View style={styles.sectionDivider} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quizScroll}>
        {mockQuizData.map((quiz, index) => (
          <QuizViewComponent key={index} quiz={quiz} />
        ))}
      </ScrollView>
      </View>

      {/* Other Quizzes Section */}
      <View style={styles.otherQuizzesContainer}>
        <Text style={styles.sectionTitle}>Other Quizzes</Text>
        <View style={styles.sectionDivider} />
        <View style={styles.quizSection}>
          <Text style={styles.quizPlaceholderText}>No other quizzes available yet.</Text>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  quizzesForYouHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
  },
  addQuizButton: {
    backgroundColor: '#6a0dad',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexShrink: 0,  // Prevents the button from shrinking
    marginRight: 20, // Adds space to the right of the button
  },
  addQuizButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    marginRight: 25,
    marginLeft: 25,
  },
  quizScroll: {
    marginBottom: 20,
    marginLeft: 20,
  },
  quizSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  quizPlaceholderText: {
    fontSize: 16,
    color: '#888',
  },
  otherQuizzesContainer: {
    flex: 1,  // Take up remaining space in the container
    alignSelf: 'stretch',
    justifyContent: 'center',  // Align vertically in the middle
  },
});

export default HomePage;
