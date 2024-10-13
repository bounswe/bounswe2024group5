import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { quizzes } from "../types/question";
import { OptionButton } from "../components/solve-quiz/option";
import Confetti from "react-confetti";
import { QuizOverview } from "../components/solve-quiz/quiz-overview";
import { ProgressBar } from "../components/solve-quiz/progress-bar";
import { QuizActionButton } from "../components/solve-quiz/quiz-action-button";

export const SolveQuizPage = () => {
  const questions = quizzes[0].questions;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [confettiEnabled, setConfettiEnabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState<(string | undefined)[]>(
    Array(questions.length).fill(undefined)
  );

  const handleAnswer = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  console.log(answers);
  const handleNavigateToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);

    if (answers[questionIndex]) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer && !showResult) {
      setShowResult(true);
      const correct = selectedAnswer === questions[currentQuestion].answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }

      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion] = selectedAnswer;
        return newAnswers;
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(undefined);

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
      }, 7000);
    }
  }, [isQuizFinished]);

  return (
    <div className="flex w-full">
      {confettiEnabled && <Confetti />}
      {isQuizFinished ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center p-6 rounded-xl bg-violet-50">
            <h1 className="text-4xl font-bold">Quiz Finished!</h1>
            <p className="mt-4 text-lg">
              You scored {score} out of {questions.length}
            </p>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-grow p-6 mr-4 rounded-xl bg-violet-50"
          >
            <ProgressBar
              currentQuestion={currentQuestion}
              questions={questions}
              answers={answers}
            />

            <p className="mb-6 text-lg">
              {questions[currentQuestion].question}
            </p>

            <div className="grid grid-cols-2 gap-4 ">
              {questions[currentQuestion].options.map((option, index) => (
                <OptionButton
                  index={index}
                  option={option}
                  selectedAnswer={selectedAnswer}
                  handleAnswer={handleAnswer}
                  question={questions[currentQuestion]}
                  answers={answers}
                  currentQuestion={currentQuestion}
                />
              ))}
            </div>

            <QuizActionButton
              showResult={showResult}
              questions={questions}
              submitAnswer={submitAnswer}
              nextQuestion={nextQuestion}
              currentQuestion={currentQuestion}
              selectedAnswer={selectedAnswer}
              answers={answers}
            />
          </motion.div>

          <QuizOverview
            questions={questions}
            currentQuestion={currentQuestion}
            score={score}
            answers={answers}
            handleNavigateToQuestion={handleNavigateToQuestion}
          />
        </>
      )}
    </div>
  );
};
