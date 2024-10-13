import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { quizzes } from "../types/question";
import { Option } from "../components/solve-quiz/option";
import Confetti from "react-confetti";

export const SolveQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [confettiEnabled, setConfettiEnabled] = useState(false);
  const [showResult, setShowResult] = useState(false);
  // const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleAnswer = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer && !showResult) {
      setShowResult(true);
      const correct = selectedAnswer === questions[currentQuestion].answer;
      // setIsCorrect(correct);
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
      // setIsCorrect(undefined);
      setShowResult(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      setConfettiEnabled(true);
      setInterval(() => {
        setConfettiEnabled(false);
      }, 5000);
    }
  }, [isQuizFinished]);

  const questions = quizzes[0].questions;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex">
      {confettiEnabled && <Confetti />}
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
            <Option
              index={index}
              option={option}
              selectedAnswer={selectedAnswer}
              handleAnswer={handleAnswer}
              showResult={showResult}
              question={questions[currentQuestion]}
            />
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (showResult) {
              nextQuestion();
            } else {
              handleSubmit();
            }
          }}
          disabled={!selectedAnswer}
          className={`mt-6 w-full py-3 rounded-lg transition-colors ${
            selectedAnswer
              ? "bg-violet-500 text-white hover:bg-violet-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : showResult
            ? "Next Question"
            : "Submit Answer"}
        </motion.button>
      </motion.div>
      <div className="w-px h-full mx-4 bg-zinc-400"></div>
      <div className="flex flex-col items-center w-1/4 p-4 rounded-xl bg-violet-50">
        <h3 className="mt-2 mb-4 text-xl font-semibold">Question Overview</h3>
        <div className="grid grid-cols-5 gap-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                index === currentQuestion
                  ? "bg-violet-500"
                  : index < answers.length
                  ? answers[index]
                    ? "bg-emerald-500"
                    : "bg-red-500"
                  : "bg-zinc-300"
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
