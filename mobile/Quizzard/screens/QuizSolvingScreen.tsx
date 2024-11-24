// QuizSolvingScreen.tsx
import React, { useState, useContext, useEffect} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon
import QuizHeader from "../components/QuizSolveQuizHeader";
import { useAuth } from "./AuthProvider";
import HostUrlContext from '../app/HostContext';
// import { Quiz, Question, QuestionType } from "../database/types";

// types from the database/types.ts file:
// type Question = {
//   id: number;
//   quizId: number;
//   word: string;
//   questionType: QuestionType;
//   options: string[];
//   correctAnswer: string;      // 'A', 'B', 'C' or 'D'
//   wrongAnswers: string[];
//   difficulty: number;         // elo
// }

// type QuestionType =
//   | "english_to_turkish"
//   | "turkish_to_english"
//   | "english_to_sense";

const QuizSolvingScreen = ({ route, navigation }) => {
  const hostUrl = useContext(HostUrlContext);
  // const { quiz } = route.params; // Access the passed data
  const { quiz, questions } = route.params; // Access the passed data
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizQuestions, setQuestions] = useState<Question[]>([]);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(questions.map(() => false));
  const question = questions[questionIndex];
  // const [question, setQuestion] = useState<Question | null>(null);
  const [quizAttemptId, setQuizAttemptId] = useState(null);
  const [previousAnswers, setPreviousAnswers] = useState({});
  const authContext = useAuth(); // Get the authentication context
  const token = authContext ? authContext.token : null;

  const initializeQuiz = async () => {
    console.log("### Initializing quiz:", quiz.id);
    try {
      // Get or create quiz attempt
      const attemptResponse = await fetch(
        `${hostUrl}/api/quiz-attempts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quizId: quiz.id }),
        }
      );
      
      if (!attemptResponse.ok) {
        throw new Error('Failed to create/get quiz attempt');
      }
      const attemptData = await attemptResponse.json();

      console.log(`Quiz attempt ID: ${attemptData.id} and quiz ID: ${quiz.id}`);
      
      setQuizAttemptId(attemptData.id);

      // Step 2: Get quiz details with questions
      const quizResponse = await fetch(
        `${hostUrl}/api/quizzes/${quiz.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!quizResponse.ok) {
        throw new Error('Failed to fetch quiz details');
      }
      
      const quizData = await quizResponse.json();
      setQuestions(quizData.quiz.questions);
      setIsQuestionAnswered(new Array(quizData.quiz.questions.length).fill(false));

      // Step 3: Get previous answers if they exist
      const answersResponse = await fetch(
        `${hostUrl}/api/question-answers?quizAttemptId=${quizAttemptId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (answersResponse.ok) {
        // TODO: complete this part later.
        // const answersData = await answersResponse.json();
        // const answersMap = {};
        // answersData.forEach(answer => {
        //   answersMap[answer.questionId] = answer.answer;
        // });
        // setPreviousAnswers(answersMap);
        
        // // Mark questions as answered if they have previous answers
        // const newIsQuestionAnswered = new Array(quizData.questions.length).fill(false);
        // quizData.questions.forEach((_, index) => {
        //   if (answersMap[index] !== undefined) {
        //     newIsQuestionAnswered[index] = true;
        //   }
        // });
        // setIsQuestionAnswered(newIsQuestionAnswered);
      }
      console.log(`Questions: ${quizData.quiz.questions[0].correctAnswer}`);
      // setQuestion(quizData.quiz.questions[questionIndex]);
      // console.log(`${questions[0]} question is ${question} and ${question.correctAnswer}`);
    } catch (error) {
      console.error("Error initializing quiz:", error);
      Alert.alert(
        "Error",
        "Failed to load quiz. Please try again later.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  };

  useEffect(() => {
    console.log(`### QuizSolvingScreen: quiz ID: ${quiz.id}` );
    initializeQuiz();
  },[quiz.id, hostUrl, token]);

  const handleAnswer = async (answer) => {
    if (isQuestionAnswered[questionIndex]) return;

    try {
      const response = await fetch(
        `${hostUrl}/api/question-answers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quizAttemptId: quizAttemptId,
            questionId: questions[questionIndex].id,
            answer: answer
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const updatedIsQuestionAnswered = [...isQuestionAnswered];
      updatedIsQuestionAnswered[questionIndex] = true;
      setIsQuestionAnswered(updatedIsQuestionAnswered);
      
      const updatedSelectedAnswers = [...selectedAnswers];
      updatedSelectedAnswers[questionIndex] = answer;
      setSelectedAnswers(updatedSelectedAnswers);
    } catch (error) {
      console.error("Error submitting answer:", error);
      Alert.alert("Error", "Failed to submit answer. Please try again.");
    }
  };

  const handlePrevious = () => {
    console.log('handling previous');
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      console.log(`Is answered? ${isQuestionAnswered}`);
    } else {
      Alert.alert("Start of the Quiz:", "This is the first question of the quiz.");
    }
  };

  const handleNext = () => {
    console.log('handling next');
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      console.log(`Is answered? ${isQuestionAnswered}`);
    } else {
      Alert.alert("End of the Quiz:", "This is the last question of the quiz.");
    }
  };

  const handleFinish = async () => {
    try {
      const response = await fetch(
        `${hostUrl}/api/quiz-attempts/${quizAttemptId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete quiz');
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error completing quiz:", error);
      Alert.alert("Error", "Failed to complete quiz. Please try again.");
    }
  };

  const handleCancel = async () => {
    // TODO: Add putting the question-answers for this quiz attempt to the backend.
  };

  const generateQuestionSentence = (question): string => {
    // const generateQuestionSentence = (question_type: 'english_to_turkish' | 'turkish_to_english' | 'english_to_sense', word: string): string => {
    console.log("Question: ", question.questionType, question.word);
    if (question.questionType === "english_to_turkish") {
      return `How do you say '${question.word}' in Turkish?`;
    } else if (question.questionType === "turkish_to_english") {
      return `How do you say '${question.word}' in English?`;
    } else {
      return "Invalid question type";
    }
  };

  // // question = questions[questionIndex];
  // console.log(`224 224`);
  // console.log(`## Questions: ${questions[questionIndex].correctAnswer}`);
  // setQuestion(questions[questionIndex]);
  let answers = [question.correctAnswer];
  question.wrongAnswers.forEach((answer) => answers.push(answer));
  console.log("Answers:", answers);

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
          let backgroundColor;
          if (!isQuestionAnswered[questionIndex]) {
            backgroundColor = "#ddd6fe"; // Match the background color
          } else {
            if (answer === question.correctAnswer) {
              backgroundColor = "green"; // Correct answer
            } else if (answer === selectedAnswers[selectedAnswers.length - 1]) {
              backgroundColor = "red"; // Selected answer
            } else {
              backgroundColor = "#ddd6fe"; // Match the background color
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handlePrevious}
        >
          {/* Replace text with right-pointing arrow icon */}
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          {/* Replace text with right-pointing arrow icon */}
          <Icon name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Cancel and Submit Buttons */}
            <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleFinish}
        >
          {/*Upon submission of the quiz, navigate back to the home screen for now*/}
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
    backgroundColor: "#FFFFFF", // Set the background color
  },
  roundQuestionContainer: {
    backgroundColor: "#f5f3ff", // Light grey background color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10, // Rounded corners
    opacity: 0.9, // Slight opacity
    marginTop: 40,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    borderColor: "#8b5c56", // Dark outline
    borderWidth: 1,
    borderRadius: 20, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000", // Text color
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
    paddingHorizontal: 60, // Adjust for smaller button size
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