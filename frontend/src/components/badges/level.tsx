import { IconFlame, IconTarget, IconTrophy } from "@tabler/icons-react";
import { motion } from "framer-motion";
export const QUIZ_DIFFICULTIES = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const DifficultyBadge = ({
  level,
}: {
  level: (typeof QUIZ_DIFFICULTIES)[number];
}) => {
  const badges = {
    Beginner: {
      icon: <IconTrophy size={16} />,
      colors: "bg-white text-emerald-500",
    },
    Intermediate: {
      icon: <IconTarget size={16} />,
      colors: "bg-white text-amber-500  ",
    },
    Advanced: {
      icon: <IconFlame size={16} />,
      colors: "bg-white text-rose-500",
    },
  };

  const { icon } = badges[level];

  return (
    <motion.span
      className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-white ${
        level === "Beginner"
          ? " text-green-600 border border-green-600"
          : level === "Intermediate"
          ? " text-yellow-600 border border-yellow-600"
          : " text-red-600 border border-red-600"
      }`}
      whileHover={{ scale: 1.1 }}
    >
      {icon}
      <span className="text-xs">{level}</span>
    </motion.span>
  );
};
