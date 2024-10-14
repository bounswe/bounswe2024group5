// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const questions = [
  {
    body: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    body: 'What is 2 + 2?',
    answers: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  {
    body: 'Which planet is known as the Red Planet?',
    answers: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
];

const QuizSolvingScreen = ({navigation }) => {

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = questions[questionIndex];


  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      Alert.alert('Correct!', 'You selected the right answer.');
    } else {
      Alert.alert('Wrong!', 'Try again next time.');
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
    } else {
      Alert.alert('Quiz Completed!', 'You have finished the quiz!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.body}</Text>
      {question.answers.map((answer, index) => (
        <Button
          key={index}
          title={answer}
          onPress={() => handleAnswer(answer)}
          color={selectedAnswer === answer ? 'lightblue' : '#841584'}
        />
      ))}
      <Button
        title="Next Question"
        onPress={handleNext}
        disabled={!selectedAnswer}
        style={styles.nextButton}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  nextButton: {
    marginTop: 20,
  },
});

export default QuizSolvingScreen;
