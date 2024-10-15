// QuizSolvingScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon
import QuizHeader from "../components/QuizSolveQuizHeader";

const QuizSolvingScreen = ({ route, navigation }) => {
    const { questions } = route.params; // Access the passed data
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [curentQuestionIsAnswered, setCurentQuestionIsAnswered] = useState(false);
    const question = questions[questionIndex];

    const handleAnswer = (answer) => {
        if (curentQuestionIsAnswered) return;
        selectedAnswers.push(answer);
        setSelectedAnswers(selectedAnswers);
        setCurentQuestionIsAnswered(true);
    };

    const handleNext = () => {
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
            setCurentQuestionIsAnswered(false);
        } else {
            Alert.alert('Quiz Completed!', 'You have finished the quiz!');
            navigation.goBack(); // Navigate back when quiz is completed
        }
    };

    return (
        <View style={styles.container}>

            <QuizHeader
                quizName="Demo Quiz"
                questionIndex={questionIndex}
                totalQuestions={questions.length}
            />
            <View style={styles.roundQuestionContainer}>
                <Text style={styles.questionText}>{question.body}</Text>
                {question.answers.map((answer, index) => {
                    let backgroundColor;
                    if (!curentQuestionIsAnswered) {
                        backgroundColor = '#FFFFFF'; // Match the background color
                    } else {
                        if (answer === question.correctAnswer) {
                            backgroundColor = 'green'; // Correct answer
                        } else if (answer === selectedAnswers[selectedAnswers.length - 1]) {
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
            </View>
            {/* Container for Next Button */}
            <View style={styles.nextButtonContainer}>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    disabled={!curentQuestionIsAnswered}
                >
                    {/* Replace text with right-pointing arrow icon */}
                    <Icon name="arrow-forward" size={24} color="#000" />
                </TouchableOpacity>
            </View>
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
    roundQuestionContainer: {
        backgroundColor: '#d3d3d3', // Light grey background color
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10, // Rounded corners
        opacity: 0.9, // Slight opacity
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
    nextButtonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end', // Aligns the button to the right
    },
    nextButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 60, // Adjust for smaller button size
    },
});

export default QuizSolvingScreen;
