import { Quiz } from "../types/question";
import { motion } from "framer-motion";
import { useState } from "react";
import { Pagination } from "antd";
import { RegularQuizCard } from "../components/list-quizzes/regular-quiz-card";
import { FeaturedQuizCard } from "../components/list-quizzes/featured-quiz-card";
import { Link } from "react-router-dom";

const allQuizzes: Quiz[] = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: `Quiz ${index + 1}`,
    description: `Description for Quiz ${index + 1}`,
    level: ["beginner", "intermediate", "advanced"][
      Math.floor(Math.random() * 3)
    ] as Quiz["level"],
    category: ["fruits", "animals", "colors", "numbers"][
      Math.floor(Math.random() * 4)
    ] as Quiz["category"],
    questionCount: Math.floor(Math.random() * 30) + 10,
    imageUrl: "/api/placeholder/250/250",
    highlighted: index < 4,
    questions: [],
  }));
export const ListQuizzesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const highlightedQuizzes = allQuizzes.filter((quiz) => quiz.highlighted);
  const regularQuizzes = allQuizzes.filter((quiz) => !quiz.highlighted);

  const indexOfLastQuiz = currentPage * pageSize;
  const indexOfFirstQuiz = indexOfLastQuiz - pageSize;
  const currentQuizzes = regularQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen px-4 border border-purple-300 bg-purple-50 rounded-3xl">
      <div className="container px-4 py-8 mx-auto">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="mb-4 text-2xl font-semibold text-purple-800">
              Featured Quizzes
            </h2>
            <Link to="/add-quiz">
              <button className="px-4 py-2 text-white bg-violet-500 rounded-3xl">
                Create a quiz
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlightedQuizzes.map((quiz) => (
              <FeaturedQuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="mb-4 text-2xl font-semibold text-purple-800">
              All Quizzes
            </h2>

            <div className="flex gap-2">
              <input
                className="w-48 px-4 py-2 border-2 rounded-full outline-none border-violet-500"
                placeholder="Search a quiz..."
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {currentQuizzes.map((quiz) => (
              <RegularQuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Pagination
              current={currentPage}
              total={regularQuizzes.length}
              pageSize={pageSize}
              onChange={onPageChange}
              showSizeChanger={false}
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
};
