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
import { useCreateQuestionAnswer } from "../hooks/api/questions-answers/answer";
import { useQuestionAnswers } from "../hooks/api/questions-answers/list";
import { QuizResult } from "../components/solve-quiz/quiz-result";
import { useUpdateQuizAttempt } from "../hooks/api/attempts/update";
import { ForumForQuizSolvePage } from "../components/solve-quiz/forum-integration";
export const SolveQuizPage = () => {
  const currentPath = useLocation().pathname;

  const quizId = currentPath.split("/").pop() || "";
  const quizIdAsNumber = Number.parseInt(quizId);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [lastSolvedQuestion, setLastSolvedQuestion] = useState(-1);

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [confettiEnabled, setConfettiEnabled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);

  const [answers, setAnswers] = useState<(string | undefined)[]>([]);

  const { data: quizzes, isLoading } = useFetchQuizzes();
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null);

  const { mutateAsync: createAnswer } = useCreateQuestionAnswer();
  const { mutateAsync: createQuizAttempt } = useCreateQuizAttempt();
  const { data: existingAttempts, isLoading: isLoadingAttempts } =
    useQuizAttempts({
      quizId: quizIdAsNumber,
      isCompleted: false,
    });

  const { mutateAsync: updateQuizAttempt } = useUpdateQuizAttempt(
    quizAttempt?.id ?? -1
  );
  const { data: currentAttempt } = useQuestionAnswers({
    quizAttemptId: quizAttempt?.id ?? -1,
  });

  const quiz = quizzes?.find((q) => q.id?.toString() === quizId);

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

  useEffect(() => {
    if (answers[currentQuestion]) {
      setSelectedAnswer(answers[currentQuestion]);
      setShowResult(true);
    } else {
      setSelectedAnswer(undefined);
      setShowResult(false);
    }
  }, [currentQuestion, answers]);

  useEffect(() => {
    if (
      currentAttempt?.length &&
      currentAttempt.length > 0 &&
      quizzes &&
      quiz
    ) {
      const progressedAnswers = Array(quiz.questions.length).fill(undefined);

      setScore(0);

      const calculatedScore = currentAttempt.reduce((total, attempt) => {
        const questionIndex = quiz.questions.findIndex(
          (q) => q.id === attempt.questionId
        );

        if (questionIndex !== -1) {
          progressedAnswers[questionIndex] = attempt.answer;
          return attempt.isCorrect ? total + 1 : total;
        }
        return total;
      }, 0);

      setScore(calculatedScore);
      setAnswers(progressedAnswers);

      const firstUnansweredIndex = progressedAnswers.findIndex(
        (answer) => answer === undefined
      );

      if (lastSolvedQuestion !== -1) {
        setCurrentQuestion(lastSolvedQuestion);
      } else {
        setCurrentQuestion(
          firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0
        );
      }
    }
  }, [currentAttempt, quizzes, quiz, lastSolvedQuestion]);

  useEffect(() => {
    if (quizzes && currentAttempt?.length === 0) {
      const quiz = quizzes.find((q) => q.id === quizIdAsNumber);
      if (quiz) {
        setAnswers(Array(quiz.questions.length).fill(undefined));
      }
    }
  }, [quizzes, quizIdAsNumber, currentAttempt]);

  useEffect(() => {
    if (isQuizFinished) {
      setConfettiEnabled(true);
      updateQuizAttempt({ completed: true });
      setInterval(() => {
        setConfettiEnabled(false);
      }, 7000);
    }
  }, [isQuizFinished, updateQuizAttempt]);

  if (isLoading || !quizzes) {
    return <Spin />;
  }

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

  const handleNavigateToQuestion = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const submitAnswer = async () => {
    if (selectedAnswer && !showResult && quizAttempt) {
      setShowResult(true);

      setLastSolvedQuestion(currentQuestion);
      const currentQuestionId = quiz.questions[currentQuestion].id;

      const answer = await createAnswer({
        quizAttemptId: quizAttempt.id,
        questionId: currentQuestionId ?? 0,
        answer: selectedAnswer,
      });

      if (answer.isCorrect && !answers[currentQuestion]) {
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
    } else {
      setIsQuizFinished(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <>
      <div className="flex w-full">
        {confettiEnabled && <Confetti />}
        {isQuizFinished ? (
          <QuizResult score={score} questionCount={quiz.questions.length} />
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
      <ForumForQuizSolvePage word={quiz.questions[currentQuestion].word} />
    </>
  );
};
