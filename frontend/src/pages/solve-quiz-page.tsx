import { useEffect, useState } from "react";
import type { QuizAttempt } from "../hooks/api/attempts/list";
import { Modal } from "antd";
import { motion } from "framer-motion";
import { OptionButton } from "../components/solve-quiz/option";
import Confetti from "react-confetti";
import { QuizOverview } from "../components/solve-quiz/quiz-overview";
import { ProgressBar } from "../components/solve-quiz/progress-bar";
import { QuizActionButtons } from "../components/solve-quiz/quiz-action-buttons";
import { questionTemplate } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";
import { Spin } from "antd";
import { useCreateQuizAttempt } from "../hooks/api/attempts/create";
import { useQuizAttempts } from "../hooks/api/attempts/list";
import { useCreateQuestionAnswer } from "../hooks/api/questions-answers/answer";
import { useQuestionAnswers } from "../hooks/api/questions-answers/list";
import { QuizResult } from "../components/solve-quiz/quiz-result";
import { useUpdateQuizAttempt } from "../hooks/api/attempts/update";
import { ForumForQuizSolvePage } from "../components/solve-quiz/forum-integration";
import { IconHeart, IconInfoCircleFilled } from "@tabler/icons-react";
import { usePostQuestionFavorite } from "../hooks/api/question-favorite/post-question-favorite";
import { useFetchQuestionFavorites } from "../hooks/api/question-favorite/get-question-favorite";
import { useDeleteQuestionFavorite } from "../hooks/api/question-favorite/delete-question-favorite";

export const SolveQuizPage = () => {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();

  const quizId = currentPath.split("/").pop() || "";
  const quizIdAsNumber = Number.parseInt(quizId);

  const [showCompletedWarning, setShowCompletedWarning] = useState(false);
  const [isNewCompletion, setIsNewCompletion] = useState(false);
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

  const { data: attempts } = useQuizAttempts({
    quizId: quizIdAsNumber,
  });

  const { mutateAsync: updateQuizAttempt } = useUpdateQuizAttempt(
    quizAttempt?.id ?? -1
  );
  const { data: currentAttempt } = useQuestionAnswers({
    quizAttemptId: quizAttempt?.id ?? -1,
  });

  const { mutateAsync: postQuestionFavorite } = usePostQuestionFavorite();
  const { mutateAsync: deleteQuestionFavorite } = useDeleteQuestionFavorite();
  const { data: favoriteQuestions } = useFetchQuestionFavorites();

  const resetQuizState = () => {
    setShowCompletedWarning(false);
    setIsNewCompletion(false);
    setCurrentQuestion(0);
    setLastSolvedQuestion(-1);
    setSelectedAnswer(undefined);
    setIsQuizFinished(false);
    setConfettiEnabled(false);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizAttempt(null);
  };

  useEffect(() => {
    resetQuizState();
  }, [quizId]);
  const quiz = quizzes?.find((q) => q.id?.toString() === quizId);

  const isCurrentQuestionFavorite =
    favoriteQuestions?.filter(
      (favoriteQuestion) =>
        favoriteQuestion?.question?.id === quiz?.questions[currentQuestion].id
    ).length === 1;

  useEffect(() => {
    const initializeQuizAttempt = async () => {
      // Don't do anything if we already have a quiz attempt
      if (quizAttempt) return;

      resetQuizState();

      // Check for existing incomplete attempts first
      if (!isLoadingAttempts && existingAttempts?.length) {
        setQuizAttempt(existingAttempts[0]);
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
    const checkQuizCompletion = () => {
      if (attempts?.length && !isNewCompletion) {
        const hasCompletedAttempt = attempts.some(
          (attempt) => attempt.completed
        );
        if (hasCompletedAttempt) {
          setShowCompletedWarning(true);
        }
      }
    };

    checkQuizCompletion();
  }, [attempts, isNewCompletion]);

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
      setIsNewCompletion(true);
      updateQuizAttempt({ completed: true }).then((updatedAttempt) => {
        setQuizAttempt(updatedAttempt);
      });

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

  const handleContinueAnyway = () => {
    setShowCompletedWarning(false);
  };

  const handleCancel = () => {
    navigate("/"); // Navigate to main page
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

  const handleQuestionLike = () => {
    if (!isCurrentQuestionFavorite) {
      postQuestionFavorite(quiz.questions[currentQuestion].id);
    } else {
      deleteQuestionFavorite(quiz.questions[currentQuestion].id);
    }
  };

  return (
    <>
      <Modal
        open={showCompletedWarning}
        closable={false}
        footer={null}
        centered
        maskClosable={false}
        width={400}
        className="overflow-hidden rounded-2xl"
      >
        <div className="flex flex-col items-center py-4">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-emerald-600">
            <IconInfoCircleFilled
              size={60}
              stroke={1}
              className="text-emerald-100"
            />
          </div>

          <h3 className="mb-2 text-xl font-semibold">Already Completed</h3>

          <p className="mb-6 text-center text-gray-600">
            You've already completed this quiz. You won't receive additional
            points, but you can practice again!
          </p>

          <div className="flex justify-center w-full gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-base border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Return to Quizzes
            </button>
            <button
              onClick={handleContinueAnyway}
              className="px-6 py-2 text-base text-white rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              Continue
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex w-full">
        {confettiEnabled && <Confetti />}
        {isQuizFinished ? (
          <QuizResult
            eloGained={quizAttempt?.score ?? 0}
            correctAnswers={score}
            questionCount={quiz.questions.length}
            completedAt={quizAttempt?.completedAt ?? new Date().toISOString()}
            quizId={quizIdAsNumber}
          />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex-grow p-6 mr-4 rounded-xl bg-violet-50"
            >
              <div
                onClick={handleQuestionLike}
                className="absolute flex items-center justify-center w-12 h-12 bg-red-200 rounded-full shadow-md cursor-pointer right-2 -top-8"
              >
                <IconHeart
                  size={32}
                  stroke={1}
                  color="red"
                  fill={isCurrentQuestionFavorite ? "red" : "none"}
                />
              </div>

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
                {quiz.questions[currentQuestion].options.map(
                  (option, index) => (
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
                  )
                )}
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
      {!isQuizFinished && (
        <ForumForQuizSolvePage word={quiz.questions[currentQuestion].word} />
      )}
    </>
  );
};
