import { motion } from "framer-motion";
import { Question } from "../../types/question";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export const QuizActionButtons = ({
  questions,
  currentQuestion,
  selectedAnswer,
  nextQuestion,
  previousQuestion,
  submitAnswer,
  answers,
}: {
  questions: Question[];
  currentQuestion: number;
  selectedAnswer: string | undefined;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitAnswer: () => void;
  answers: (string | undefined)[];
}) => {
  const isThisQuestionAnswered = answers[currentQuestion] !== undefined;
  console.log(
    selectedAnswer,
    selectedAnswer !== undefined || isThisQuestionAnswered
  );
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const isSubmitButtonEnabled =
    (selectedAnswer !== undefined && !isThisQuestionAnswered) ||
    (isThisQuestionAnswered && isLastQuestion);

  const buttonStyle = (enabled: boolean) =>
    `w-full py-3 rounded-lg transition-colors ${
      enabled
        ? "bg-violet-500 text-white hover:bg-violet-600"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`;
  return (
    <div className="mt-6 space-y-4">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (isThisQuestionAnswered && isLastQuestion) {
            nextQuestion();
            return;
          }
          submitAnswer();
        }}
        disabled={!isSubmitButtonEnabled}
        className={buttonStyle(isSubmitButtonEnabled)}
      >
        {isThisQuestionAnswered && isLastQuestion
          ? "Finish Quiz"
          : "Submit Answer"}
      </motion.button>

      <div className="flex justify-between gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={previousQuestion}
          disabled={isFirstQuestion}
          className={`${buttonStyle(
            !isFirstQuestion
          )} w-52 flex items-center gap-2 justify-center`}
        >
          <IconArrowLeft className="mr-2" />
          Previous Question
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextQuestion}
          disabled={isLastQuestion}
          className={`${buttonStyle(
            !isLastQuestion
          )} w-52 flex items-center gap-2 justify-center`}
        >
          Next Question
          <IconArrowRight className="mr-2" />
        </motion.button>
      </div>
    </div>
  );
};
