import { Quiz } from "../../types/question";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { DifficultyBadge, QUIZ_DIFFICULTIES } from "../badges/level";
import { IconBooks, IconHeart, IconShare, IconUser } from "@tabler/icons-react";
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
            <Link to={`/profile/${quiz.username}`}>
              <div className="flex items-center gap-1">
                <IconUser className="text-zinc-700" size={20} />
                <p className="text-sm text-gray-700 group">
                  created by{" "}
                  <span className="font-semibold group-hover:underline">
                    {quiz.username}
                  </span>
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-1 mb-4">
              <IconBooks className="text-zinc-700" size={20} />
              <p className="text-sm text-gray-700">
                {quiz.questions.length} questions
              </p>
            </div>
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <DifficultyBadge level={QUIZ_DIFFICULTIES[quiz.difficulty]} />

              <div className="flex items-center gap-1">
                <IconShare
                  className="text-zinc-500 hover:text-zinc-700"
                  size={20}
                />
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
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
