import React from "react";
import { motion } from "framer-motion";
import { IconUser, IconBooks } from "@tabler/icons-react";
import { Quiz } from "../../types/question";
import { Link } from "react-router-dom";
import { getDifficultyLevel } from "../../pages/list-quiz-page";

interface CompactQuizCardProps {
  quiz: Quiz;
}

export const CompactQuizCard: React.FC<CompactQuizCardProps> = ({ quiz }) => (
  <Link to={`/quiz/${quiz.id}`}>
    <motion.div
      className="p-4 transition-colors bg-white border-2 border-transparent rounded-2xl hover:border-emerald-500"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex gap-4">
        {quiz.image !== "none" ? (
          <img
            src={quiz.image}
            alt={quiz.title}
            className="object-cover w-20 h-20 rounded-xl"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded-xl" />
        )}
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold text-purple-900">
            {quiz.title}
          </h3>
          <p className="mb-2 text-sm text-gray-600 line-clamp-1">
            {quiz.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex gap-0.5 items-center">
                <IconUser size={16} />
                <span>{quiz.username}</span>
              </div>
              <div className="flex gap-0.5 items-center">
                <IconBooks size={16} />
                <span>{quiz.questions.length} questions</span>
              </div>
            </div>

            <div className="text-sm font-medium text-orange-700">
              {getDifficultyLevel(quiz.difficulty)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);
