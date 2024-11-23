import { Quiz } from "../../types/question";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QUIZ_DIFFICULTIES } from "./regular-quiz-card";
import { IconHeart } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { useState } from "react";

export const FeaturedQuizCard = ({ quiz }: { quiz: Quiz }) => {
  const [liked, setLiked] = useState<boolean>(Math.random() < 0.5);
  const [likeCount, setLikeCount] = useState<number>(
    Math.floor(Math.random() * 100)
  );

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Link to={`/quiz/${quiz.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col pb-2 bg-purple-100 shadow-md cursor-pointer rounded-3xl"
      >
        <div className="w-full bg-white min-h-32 rounded-t-3xl" />
        <div className="flex flex-col justify-between flex-grow p-4 min-h-40">
          <div>
            <h3 className="mb-2 text-xl font-bold text-purple-800">
              {quiz.title}
            </h3>
            <p className="mb-4 text-gray-600">{quiz.description}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              created by <span className="font-semibold">{quiz.username} </span>
            </p>
            <p className="text-sm text-gray-600">
              {quiz.questions.length} questions
            </p>
            <motion.div
              className="flex items-center justify-between mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.span
                className={`px-2 py-1 rounded-full text-sm font-semibold 
                ${
                  quiz.difficulty === 0
                    ? "bg-green-200 text-green-800"
                    : quiz.difficulty === 1
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {QUIZ_DIFFICULTIES[quiz.difficulty]}
              </motion.span>

              <div className="flex items-center gap-1 text-zinc-500">
                <IconHeart
                  className={cx(
                    "stroke-red-500 cursor-pointer transition-colors duration-200",
                    {
                      "fill-red-500": liked,
                      "hover:fill-red-300": !liked,
                    }
                  )}
                  onClick={handleLikeClick}
                />
                {likeCount}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
