import React from "react";
import { motion } from "framer-motion";
import {
  IconTrophy,
  IconStar,
  IconChartBar,
  IconClock,
  IconHome,
  IconRotate,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { RecommendedQuizzes } from "./quiz-recommendations";

interface QuizResultProps {
  correctAnswers: number;
  questionCount: number;
  eloGained: number;
  completedAt: string;
  quizId: number;
  resetQuizState: () => void;
}

const Button = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all
      ${
        variant === "primary"
          ? "bg-violet-600 text-white hover:bg-violet-700"
          : "border border-violet-400 text-violet-600 hover:bg-violet-50"
      }
    `}
  >
    {children}
  </button>
);

const StatBox = ({
  icon,
  label,
  value,
  valueColor = "text-violet-600",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueColor?: string;
}) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl">
    <div className="mb-2 text-violet-500">{icon}</div>
    <p className={`text-2xl font-bold ${valueColor} mb-1`}>{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export const QuizResult = ({
  correctAnswers,
  eloGained,
  questionCount,
  completedAt,
  quizId,
  resetQuizState,
}: QuizResultProps) => {
  const navigate = useNavigate();
  const percentage = Math.round((correctAnswers / questionCount) * 100);
  const completedDate = new Date(completedAt);

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect! You're a master!";
    if (percentage >= 80) return "Excellent work!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  const getGradeColor = () => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-blue-600";
    if (percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="flex flex-row w-full gap-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1"
      >
        <div className="h-full p-8 pt-20 bg-violet-50 rounded-2xl">
          <div className="mb-8 text-center ">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-4"
            >
              <IconTrophy
                size={48}
                className="mx-auto text-violet-600"
                stroke={1.5}
              />
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-violet-900">
              Quiz Complete!
            </h1>
            <p className="text-lg text-gray-600">{getPerformanceMessage()}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatBox
              icon={<IconStar size={24} stroke={1.5} />}
              label="Correct Answers"
              value={`${correctAnswers}/${questionCount}`}
              valueColor={getGradeColor()}
            />
            <StatBox
              icon={<IconChartBar size={24} stroke={1.5} />}
              label="Accuracy"
              value={`${percentage}%`}
              valueColor={getGradeColor()}
            />
            <StatBox
              icon={<IconStar size={24} stroke={1.5} />}
              label="Points Gained"
              value={`${eloGained > 0 ? "+" : ""}${eloGained}`}
              valueColor="text-green-600"
            />
            <StatBox
              icon={<IconClock size={24} stroke={1.5} />}
              label="Completed At"
              value={completedDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            />
          </div>

          <div className="flex justify-center gap-3 mt-8 ">
            <Button variant="outline" onClick={() => navigate("/")}>
              <IconHome size={20} stroke={1.5} />
              Back to Home
            </Button>
            <Button
              onClick={() => {
                resetQuizState();
                navigate(`/quiz/${quizId}`);
              }}
            >
              <IconRotate size={20} stroke={1.5} />
              Try Again
            </Button>
          </div>
        </div>
      </motion.div>
      <RecommendedQuizzes quizId={quizId} />
    </div>
  );
};
