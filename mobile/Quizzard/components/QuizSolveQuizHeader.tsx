// QuizSolvingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const QuizHeader = ({ quizName, questionIndex, totalQuestions }) => {
    return (
    <View style={styles.headerContainer}>
        {/* Quiz Name with rounded rectangle background */}
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>{quizName}</Text>
        </View>

        {/* Question Number with rounded rectangle background */}
        <View style={styles.headerBox}>
            <Text style={styles.headerText}>
            Question {questionIndex + 1} / {totalQuestions}
            </Text>
        </View>
    </View>
    );
};
  

const styles = StyleSheet.create({
headerContainer: {
    position: 'absolute',
    top: 50, // Adjust this to move it further from the top
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
},
headerBox: {
    backgroundColor: '#d3d3d3', // Light grey background color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners
    opacity: 0.9, // Slight opacity
},
headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000', // Black text
},
});
  

export default QuizHeader;