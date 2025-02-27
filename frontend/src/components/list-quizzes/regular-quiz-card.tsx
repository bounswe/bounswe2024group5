import { Link } from "react-router-dom";
import { Quiz } from "../../types/question";
import { motion } from "framer-motion";
import {
  IconBooks,
  IconClock,
  IconHeart,
  IconPhotoOff,
  IconUser,
} from "@tabler/icons-react";
import { CopyLinkButton } from "../copy-quiz-link-button";
import { cx } from "class-variance-authority";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useQuizAttempts } from "../../hooks/api/attempts/list";

import { DifficultyBadge } from "../badges/level";
import { useFetchQuizFavorites } from "../../hooks/api/quiz-favorite/get-quiz-favorite";
import { usePostQuizFavorite } from "../../hooks/api/quiz-favorite/post-quiz-favorite";
import { useDeleteQuizFavorite } from "../../hooks/api/quiz-favorite/delete-quiz-favorite";

export const RegularQuizCard = ({ quiz }: { quiz: Quiz }) => {
  
  const quizUrl = `${window.location.origin}/quiz/${quiz.id}`;
  const { data: favoriteQuizzes } = useFetchQuizFavorites();
  const { mutateAsync: postQuizFavorite } = usePostQuizFavorite();
  const { mutateAsync: deleteQuizFavorite } = useDeleteQuizFavorite();

  const isCurrentQuizFavorite = favoriteQuizzes?.filter(favoriteQuizzes => favoriteQuizzes?.quizId === quiz.id).length == 1;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isCurrentQuizFavorite) {
      postQuizFavorite(quiz.id);
    } else {
      deleteQuizFavorite(quiz.id);
    }
  };


  const { data: attempts } = useQuizAttempts({
    quizId: quiz.id,
  });

  const getProgressLabel = () => {
    if (!attempts?.length) return null;

    const hasCompletedAttempt = attempts.some((attempt) => attempt.completed);
    const hasInProgressAttempt = attempts.some((attempt) => !attempt.completed);

    if (hasCompletedAttempt) {
      return (
        <span className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
          Completed
          <IconCircleDashedCheck className="w-5 h-5" />
        </span>
      );
    }

    if (hasInProgressAttempt) {
      return (
        <span className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          In Progress
          <IconClock className="w-5 h-5" />
        </span>
      );
    }

    return null;
  };

  return (
    <Link to={`/quiz/${quiz.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="flex overflow-hidden bg-purple-100 shadow-md cursor-pointer rounded-3xl "
      >
        {quiz.image === "none" ? (
          <div className="min-w-[200px] min-h-[200px] rounded-3xl bg-white m-2 flex items-center justify-center">
            <IconPhotoOff className="w-20 h-20 m-auto text-gray-300" />
          </div>
        ) : (
          <img
            src={quiz.image}
            alt={quiz.title}
            className=" rounded-3xl w-[200px] h-[200px] m-2"
          />
        )}
        <div className="flex flex-col flex-grow p-4">
          {/* First group - title and description */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center pointer-events-none">
                <h3 className="text-xl font-bold text-center text-purple-800">
                  {quiz.title}
                </h3>
              </div>
              <div className="ml-auto">{getProgressLabel()}</div>
            </div>
            <p className="mb-4 text-gray-600 place-self-start">
              {quiz.description}
            </p>
          </div>

          {/* Second group - user info and questions count */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <IconUser className="text-zinc-700" size={20} />
              <Link to={`/profile/${quiz.username}`}>
                <p className="text-sm text-gray-700 group">
                  created by{" "}
                  <span className="font-semibold group-hover:underline">
                    {quiz.username}
                  </span>
                </p>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <IconBooks className="text-zinc-700" size={20} />
              <p className="text-sm text-gray-700">
                {quiz.questions.length} questions
              </p>
            </div>
          </div>

          <div className="flex-grow" />

          <motion.div
            className="flex items-center justify-between pr-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DifficultyBadge difficulty={quiz.difficulty} />

            <div className="flex items-center gap-1">
            <CopyLinkButton url={quizUrl} />
              <div className="flex items-center gap-1 text-zinc-500">
                <IconHeart
                  className={cx("stroke-red-500", {
                    "fill-red-500": isCurrentQuizFavorite,
                    "hover:fill-red-300": !isCurrentQuizFavorite,
                  })}
                  onClick={handleLikeClick}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};
