import { Question } from "../../types/question";
import { IconCheck, IconX } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { OPTION_LABELS } from "./types";

export const OptionButton = ({
  question,
  handleAnswer,
  selectedAnswer,
  option,
  index,
  answers,
  currentQuestion,
}: {
  question: Question;
  handleAnswer: (answer: string) => void;
  selectedAnswer: string | undefined;
  option: string;
  index: number;
  answers: (string | undefined)[];
  currentQuestion: number;
}) => {
  const isThisQuestionAnswered = answers[currentQuestion] !== undefined;
  const isThisOptionSubmitted = answers[currentQuestion] === option;
  const isThisOptionCorrect = option === question.correctAnswer;

  const renderCorrect = isThisQuestionAnswered && isThisOptionCorrect;
  const renderIncorrect =
    isThisQuestionAnswered && isThisOptionSubmitted && !isThisOptionCorrect;

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleAnswer(option)}
      className={cx(
        "p-4 text-left  font-semibold rounded-lg transition-colors flex items-center border-2 border-transparent text-white",
        renderCorrect
          ? "bg-emerald-200"
          : renderIncorrect
          ? "bg-red-200 "
          : "bg-violet-200 hover:bg-violet-300",

        selectedAnswer === option
          ? "border-violet-500 font-bold"
          : "hover:opacity-90"
      )}
    >
      {renderCorrect ? (
        <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-emerald-500">
          <IconCheck className="text-white" />
        </div>
      ) : renderIncorrect ? (
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-red-500 rounded-full">
          <IconX className="text-white" />
        </div>
      ) : (
        <span className="flex items-center justify-center w-8 h-8 mr-2 text-black bg-white rounded-full">
          {OPTION_LABELS[index]}
        </span>
      )}
      {option}
    </motion.button>
  );
};
