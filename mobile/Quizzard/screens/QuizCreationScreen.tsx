// QuizCreationPage.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const QuizCreationPage = ({ navigation }) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');

  const handleCreateQuiz = () => {
    // Logic to create the quiz
    console.log('Quiz Created:', quizTitle, quizDescription);
    navigation.goBack(); // Navigate back to the home page after quiz creation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Quiz</Text>

      <TextInput
        style={styles.input}
        placeholder="Quiz Title"
        value={quizTitle}
        onChangeText={setQuizTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Quiz Description"
        value={quizDescription}
        onChangeText={setQuizDescription}
      />

      <Button title="Create Quiz" onPress={handleCreateQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6a0dad',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

export default QuizCreationPage;
