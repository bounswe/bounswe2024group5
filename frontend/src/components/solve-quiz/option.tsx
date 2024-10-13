import { Question } from "../../types/question";
import { IconCheck, IconX } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";

const optionLabels = ["A", "B", "C", "D"];

export const Option = ({
  question,
  handleAnswer,
  showResult,
  selectedAnswer,
  option,
  index,
}: {
  question: Question;
  handleAnswer: (answer: string) => void;
  showResult: boolean;
  selectedAnswer: string | undefined;
  option: string;
  index: number;
}) => {
  const isThisOptionCorrectlySelected = option === question.answer;
  const isThisOptionIncorrectlySelected =
    showResult && option !== question.answer;
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleAnswer(option)}
      className={cx(
        "p-4 text-left  font-semibold rounded-lg transition-colors flex items-center border-2 border-transparent text-white",
        showResult && isThisOptionCorrectlySelected
          ? "bg-emerald-200 border-none"
          : showResult && selectedAnswer === option
          ? "bg-red-200 border-none"
          : "bg-violet-200 hover:bg-violet-300",

        selectedAnswer === option
          ? "border-violet-500 font-bold"
          : "hover:opacity-90"
      )}
    >
      {showResult && isThisOptionCorrectlySelected ? (
        <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-emerald-500">
          <IconCheck className="text-white" />
        </div>
      ) : showResult &&
        selectedAnswer === option &&
        isThisOptionIncorrectlySelected ? (
        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-red-500 rounded-full">
          <IconX className="text-white" />
        </div>
      ) : (
        <span className="flex items-center justify-center w-8 h-8 mr-2 text-black bg-white rounded-full">
          {optionLabels[index]}
        </span>
      )}
      {option}
    </motion.button>
  );
};
