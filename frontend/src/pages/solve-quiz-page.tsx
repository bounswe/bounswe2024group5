import React, { useState } from "react";
import { motion } from "framer-motion";
import { quizzes } from "../types/question";
import { IconCheck } from "@tabler/icons-react";

export const SolveQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
      const correct = selectedAnswer === questions[currentQuestion].answer;
      setIsCorrect(undefined);
      if (correct) {
        setScore(score + 1);
      }
      setAnswers([...answers, correct]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(undefined);
      setIsCorrect(undefined);
      setShowResult(false);
    } else {
      // Quiz finished
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
    }
  };

  const questions = quizzes[0].questions;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="flex">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-6 mr-4 rounded-xl bg-violet-50"
      >
        <div className="flex items-center gap-4">
          <div className="w-full bg-white rounded-full h-2.5 mb-6">
            <div
              className="bg-violet-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <h2 className="p-2 mb-4 font-semibold rounded-3xl text-nowrap bg-zinc-200">
            Question {currentQuestion + 1}/{questions.length}
          </h2>
        </div>
        <p className="mb-6 text-lg">{questions[currentQuestion].question}</p>
        <div className="grid grid-cols-2 gap-4 ">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option)}
              className={`p-4 text-left text-violet-500 font-semibold rounded-lg transition-colors flex items-center border-2 border-transparent ${
                selectedAnswer === option
                  ? "!border-violet-500 font-bold"
                  : "hover:opacity-90"
              } bg-violet-200 text-white`}
            >
              <span className="flex items-center justify-center w-8 h-8 mr-3 text-black bg-white rounded-full">
                {optionLabels[index]}
              </span>
              {option}
            </motion.button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className={`mt-6 w-full py-3 rounded-lg transition-colors ${
            selectedAnswer
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit Answer
        </motion.button>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center mt-6"
          >
            {/* {isCorrect ? (
                <IconCheck className="mr-2 text-green-500" />
              ) : (
                <XCircle className="mr-2 text-red-500" />
              )} */}
            <IconCheck className="mr-2 text-green-500" />
            <p className={isCorrect ? "text-green-500" : "text-red-500"}>
              {isCorrect
                ? "Correct!"
                : "Incorrect. The correct answer is: " +
                  questions[currentQuestion].answer}
            </p>
          </motion.div>
        )}
        {showResult && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextQuestion}
            className="px-6 py-2 mt-6 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </motion.button>
        )}
      </motion.div>
      <div className="w-px h-full mx-4 bg-zinc-400"></div>
      <div className="w-1/4 p-4 rounded-xl bg-violet-50 ">
        <h3 className="mb-4 text-xl font-semibold">Question Overview</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                index === currentQuestion
                  ? "bg-blue-500"
                  : index < answers.length
                  ? answers[index]
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-xl font-bold">
            Score: {score}/{questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};
