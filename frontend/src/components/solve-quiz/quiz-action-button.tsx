import { motion } from "framer-motion";
import { Question } from "../../types/question";

export const QuizActionButton = ({
  showResult,
  questions,
  currentQuestion,
  selectedAnswer,
  nextQuestion,
  submitAnswer,
  answers,
}: {
  showResult: boolean;
  questions: Question[];
  currentQuestion: number;
  selectedAnswer: string | undefined;
  nextQuestion: () => void;
  submitAnswer: () => void;
  answers: (string | undefined)[];
}) => {
  const isThisQuestionAnswered = answers[currentQuestion] !== undefined;

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (showResult) {
          nextQuestion();
        } else {
          submitAnswer();
        }
      }}
      disabled={!selectedAnswer}
      className={`mt-6 w-full py-3 rounded-lg transition-colors ${
        selectedAnswer || isThisQuestionAnswered
          ? "bg-violet-500 text-white hover:bg-violet-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {isThisQuestionAnswered && currentQuestion === questions.length - 1
        ? "Finish Quiz"
        : showResult
        ? "Next Question"
        : "Submit Answer"}
    </motion.button>
  );
};
