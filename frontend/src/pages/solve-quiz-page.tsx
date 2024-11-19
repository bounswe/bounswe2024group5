import { useEffect, useState } from "react";
import type { QuizAttempt } from "../hooks/api/attempts/list";
import { motion } from "framer-motion";
import { OptionButton } from "../components/solve-quiz/option";
import Confetti from "react-confetti";
import { QuizOverview } from "../components/solve-quiz/quiz-overview";
import { ProgressBar } from "../components/solve-quiz/progress-bar";
import { QuizActionButtons } from "../components/solve-quiz/quiz-action-buttons";
import { questionTemplate } from "../utils";
import { useLocation } from "react-router-dom";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";
import { Spin } from "antd";
import { useCreateQuizAttempt } from "../hooks/api/attempts/create";
import { useQuizAttempts } from "../hooks/api/attempts/list";
export const SolveQuizPage = () => {
  const currentPath = useLocation().pathname;

  const quizId = currentPath.split("/").pop() || "";
  const quizIdAsNumber = Number.parseInt(quizId);

  const { data: quizzes, isLoading } = useFetchQuizzes();
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

  const { mutateAsync: createQuizAttempt } = useCreateQuizAttempt();
  const { data: existingAttempts, isLoading: isLoadingAttempts } =
    useQuizAttempts({
      quizId: quizIdAsNumber,
      isCompleted: false,
    });

  useEffect(() => {
    const initializeQuizAttempt = async () => {
      // Don't do anything if we already have a quiz attempt
      if (quizAttempt) return;

      // Check for existing incomplete attempts first
      if (!isLoadingAttempts && existingAttempts?.length) {
        setQuizAttempt(existingAttempts[0]);
        console.log(quizAttempt);
        return;
      }

      // If no existing attempts, create a new one
      if (!isLoadingAttempts && !existingAttempts?.length) {
        try {
          const newAttempt = await createQuizAttempt({
            quizId: quizIdAsNumber,
          });
          setQuizAttempt(newAttempt);
        } catch (error) {
          console.error("Failed to create quiz attempt:", error);
        }
      }
    };

    initializeQuizAttempt();
  }, [
    quizIdAsNumber,
    existingAttempts,
    isLoadingAttempts,
    createQuizAttempt,
    quizAttempt,
  ]);

  console.log("QUIZ ATTEMPT:", quizAttempt);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [confettiEnabled, setConfettiEnabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState<(string | undefined)[]>([]);

  useEffect(() => {
    if (quizzes) {
      const quiz = quizzes.find((q) => q.id === quizIdAsNumber);
      if (quiz) {
        setAnswers(Array(quiz.questions.length).fill(undefined));
      }
    }
  }, [quizzes, quizIdAsNumber]);

  useEffect(() => {
    if (isQuizFinished) {
      setConfettiEnabled(true);
      setInterval(() => {
        setConfettiEnabled(false);
      }, 7000);
    }
  }, [isQuizFinished]);

  if (isLoading || !quizzes) {
    return <Spin />;
  }

  const quiz = quizzes?.find((q) => q.id?.toString() === quizId);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  if (quiz.questions.length === 0) {
    return <div>Quiz has no questions</div>;
  }

  const handleAnswer = (answer: string) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  // console.log(answers);
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
      console.log(
        quiz.questions[currentQuestion].correctAnswer,
        selectedAnswer
      );
      const correct =
        selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
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
    if (currentQuestion < (quiz.questions.length ?? 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(undefined);

      setShowResult(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(undefined);
      setShowResult(false);
    }
  };

  return (
    <div className="flex w-full">
      {confettiEnabled && <Confetti />}
      {isQuizFinished ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col items-center p-6 rounded-xl bg-violet-50">
            <h1 className="text-4xl font-bold">Quiz Finished!</h1>
            <p className="mt-4 text-lg">
              You scored {score} out of {quiz.questions.length}
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
              questions={quiz.questions}
              answers={answers}
            />

            <p className="mb-6 text-lg">
              {questionTemplate({
                word: quiz.questions[currentQuestion].word,
                type: quiz.questions[currentQuestion].questionType,
              })}
            </p>

            <div className="grid grid-cols-2 gap-4 ">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <OptionButton
                  key={index}
                  index={index}
                  option={option}
                  selectedAnswer={selectedAnswer}
                  handleAnswer={handleAnswer}
                  question={quiz.questions[currentQuestion]}
                  answers={answers}
                  currentQuestion={currentQuestion}
                />
              ))}
            </div>

            <QuizActionButtons
              questions={quiz.questions}
              submitAnswer={submitAnswer}
              nextQuestion={nextQuestion}
              previousQuestion={previousQuestion}
              currentQuestion={currentQuestion}
              selectedAnswer={selectedAnswer}
              answers={answers}
            />
          </motion.div>

          <QuizOverview
            questions={quiz.questions}
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
