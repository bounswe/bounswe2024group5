// QuizSolvingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

let questions = [
  {
    body: "How do you say 'Fast' in Turkish?",
    answers: ['Hızlı', 'Normal', 'Tatlı', 'Yoğun'],
    correctAnswer: 'Hızlı',
    answered: null,
  },
  {
    body: "What does the word 'Happy' mean?",
    answers: ['Feeling sad', 'Feeling joyful', 'Feeling tired', 'Feeling angry'],
    correctAnswer: 'Feeling joyful',
    answered: null,
  },
  {
    body: "What is the meaning of the Turkish word 'Kitap'?",
    answers: ['Table', 'Pen', 'Book', 'Chair'],
    correctAnswer: 'Book',
    answered: null,
  },
];

const QuizSolvingScreen = ({ navigation }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const question = questions[questionIndex];

  const handleAnswer = (answer) => {
    if (question.answered) return;
    question.answered = answer; // Mark the question as answered
    setSelectedAnswer(answer); // just to reload the page, it is not used otherwise
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      Alert.alert('Quiz Completed!', 'You have finished the quiz!');
      navigation.goBack(); // Navigate back when quiz is completed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.body}</Text>
      {question.answers.map((answer, index) => {
        let backgroundColor;
        if (question.answered == null) {
          backgroundColor = '#FFFFFF'; // Match the background color
        } else {
          if (answer === question.correctAnswer) {
            backgroundColor = 'green'; // Correct answer
          } else if (answer === question.answered) {
            backgroundColor = 'red'; // Selected answer
          } else {
            backgroundColor = '#FFFFFF'; // Match the background color
          }
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor }]}
            onPress={() => handleAnswer(answer)}
          >
            <Text style={styles.buttonText}>{answer}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNext}
        disabled={question.answered == null}
      >
        <Text style={styles.buttonText}>Next Question</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Set the background color
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderColor: '#000000', // Dark outline
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000', // Text color
    fontSize: 16,
  },
  nextButton: {
    marginTop: 20,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});

export default QuizSolvingScreen;
