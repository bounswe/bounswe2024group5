import { motion } from "framer-motion";
import { Question } from "../../types/question";
import { IconArrowLeft, IconArrowRight, IconBulb } from "@tabler/icons-react";
import { useState } from "react";
import { Modal, Spin } from "antd";
import { useHint } from "../../hooks/api/question-hint";

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
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const isThisQuestionAnswered = answers[currentQuestion] !== undefined;

  const currentWord = questions[currentQuestion].word;

  const hintWord = questions[currentQuestion].questionType === "turkish_to_english"? questions[currentQuestion].correctAnswer : questions[currentQuestion].word; 
  const { data: hintImages, isLoading: isLoadingHints } = useHint(hintWord);

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

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsHintModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors rounded-lg bg-emerald-500 hover:bg-emerald-600"
        >
          <IconBulb size={20} stroke={2} />
          Need a hint? Click here!
        </motion.button>
      </div>

      <Modal
        title={`Hints for "${currentWord}"`}
        open={isHintModalOpen}
        onCancel={() => setIsHintModalOpen(false)}
        footer={null}
        centered
      >
        {isLoadingHints ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {hintImages?.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Hint ${index + 1} for ${currentWord}`}
                className="object-cover w-full h-40 rounded-lg"
              />
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
