import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import QuizHeader from "../components/QuizSolveQuizHeader";
import { useAuth } from "./AuthProvider";

const QuizSolvingScreen = ({ route, navigation }) => {
  const { quiz, questions } = route.params;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(
    questions.map(() => false)
  );
  const [alreadyFinished, setAlreadyFinished] = useState(false);
  const question = questions[questionIndex];
  const authContext = useAuth();
  const token = authContext ? authContext.token : null;

  const handleAnswer = async (answer) => {
    if (alreadyFinished) return;
    if (isQuestionAnswered[questionIndex]) return;

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answer;
    setSelectedAnswers(updatedSelectedAnswers);

    const updatedIsQuestionAnswered = [...isQuestionAnswered];
    updatedIsQuestionAnswered[questionIndex] = true;
    setIsQuestionAnswered(updatedIsQuestionAnswered);

    console.log(`Question ${questionIndex} answered with: ${answer}`);

    const answerData = {
      questionID: questionIndex,
      selectedChoice: answer,
    };

    try {
      const uploadResponse = await fetch("http://34.55.188.177/quiz-solve", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
      });
    } catch (err) {
      console.error("Error sending answer to backend:", err);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      Alert.alert(
        "Start of the Quiz:",
        "This is the first question of the quiz."
      );
    }
  };

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      Alert.alert("End of the Quiz:", "This is the last question of the quiz.");
    }
  };

  const generateQuestionSentence = (question) => {
    if (question.questionType === "english_to_turkish") {
      return `How do you say '${question.word}' in Turkish?`;
    } else if (question.questionType === "turkish_to_english") {
      return `How do you say '${question.word}' in English?`;
    } else {
      return "Invalid question type";
    }
  };

  let answers = [question.correctAnswer];
  question.wrongAnswers.forEach((answer) => answers.push(answer));

  return (
    <View style={styles.container}>
      <QuizHeader
        quizName={quiz.title}
        questionIndex={questionIndex}
        totalQuestions={questions.length}
      />
      <View style={styles.roundQuestionContainer}>
        <Text style={styles.questionText}>
          {generateQuestionSentence(question)}
        </Text>
        <Text style={styles.questionText}>{question.body}</Text>
        {answers.map((answer, index) => {
          let backgroundColor = "#ddd6fe";

          if (isQuestionAnswered[questionIndex]) {
            if (answer === question.correctAnswer) {
              backgroundColor = "green";
            } else if (answer === selectedAnswers[questionIndex]) {
              backgroundColor = "red";
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={[styles.button, { backgroundColor }]}
              onPress={() => handleAnswer(answer)}
              disabled={isQuestionAnswered[questionIndex]}
            >
              <Text style={styles.buttonText}>{answer}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handlePrevious}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Icon name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            setAlreadyFinished(true);
            navigation.navigate("QuizFinish", {
              quiz, 
              questions, 
              selectedAnswers,})
            }
          }
        >
          <Text style={styles.submitButtonText}>Finish</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  roundQuestionContainer: {
    backgroundColor: "#f5f3ff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    opacity: 0.9,
    marginTop: 40,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderColor: "#8b5c56",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QuizSolvingScreen;
