import React from "react";
import { motion } from "framer-motion";
import {
  IconTrophy,
  IconStar,
  IconChartBar,
  IconClock,
  IconHome,
  IconRotate,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface QuizResultProps {
  correctAnswers: number;
  questionCount: number;
  eloGained: number;
  completedAt: string;
  quizId: number;
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
      px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors
      ${
        variant === "primary"
          ? "bg-violet-600 text-white hover:bg-violet-700"
          : "border-2 border-violet-600 text-violet-600 hover:bg-violet-50"
      }
    `}
  >
    {children}
  </button>
);

const StatCard = ({
  icon,
  label,
  value,
  valueColor = "text-violet-600",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
}) => (
  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
    <div className="mr-4 text-violet-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  </div>
);
export const QuizResult = ({
  correctAnswers,
  eloGained,
  questionCount,
  completedAt,
  quizId,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="p-8 bg-violet-50 rounded-xl">
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <IconTrophy
              size={80}
              className="mx-auto text-violet-600"
              stroke={1.5}
            />
          </motion.div>
          <h1 className="mb-2 text-4xl font-bold">Quiz Complete!</h1>
          <p className="text-xl font-medium text-gray-600">
            {getPerformanceMessage()}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <StatCard
            icon={<IconStar size={32} stroke={1.5} />}
            label="Correct Answers"
            value={`${correctAnswers} / ${questionCount}`}
            valueColor={getGradeColor()}
          />
          <StatCard
            icon={<IconChartBar size={32} stroke={1.5} />}
            label="Accuracy"
            value={`${percentage}%`}
            valueColor={getGradeColor()}
          />
          <StatCard
            icon={<IconTrendingUp size={32} stroke={1.5} />}
            label="Points Gained"
            value={`+${eloGained}`}
            valueColor="text-green-600"
          />
          <StatCard
            icon={<IconClock size={32} stroke={1.5} />}
            label="Completed At"
            value={completedDate.toLocaleString()}
          />
        </div>

        <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
          <Button variant="outline" onClick={() => navigate("/")}>
            <IconHome size={20} stroke={1.5} />
            Back to Home
          </Button>
          <Button onClick={() => navigate(`/quiz/${quizId}`)}>
            <IconRotate size={20} stroke={1.5} />
            Try Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
