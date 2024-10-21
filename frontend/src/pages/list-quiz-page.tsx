import { motion } from "framer-motion";
import { useMemo } from "react";
import { useState } from "react";
import { Pagination } from "antd";
import { RegularQuizCard } from "../components/list-quizzes/regular-quiz-card";
import { FeaturedQuizCard } from "../components/list-quizzes/featured-quiz-card";
import { Link } from "react-router-dom";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";

type DifficultyFilter = "all" | string;
export const ListQuizzesPage = () => {
  const { data: quizzes } = useFetchQuizzes();

  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 6;

  const highlightedQuizzes = quizzes?.slice(0, 4) || [];

  const filteredQuizzes = useMemo(() => {
    return (quizzes || []).filter((quiz) => {
      const matchesSearch = quiz.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" ||
        quiz.difficulty.toString() === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    });
  }, [quizzes, searchQuery, difficultyFilter]);

  const regularQuizzes = quizzes || [];

  const indexOfLastQuiz = currentPage * pageSize;
  const indexOfFirstQuiz = indexOfLastQuiz - pageSize;
  const currentQuizzes = filteredQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );
  console.log(indexOfFirstQuiz, indexOfLastQuiz);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyFilter(e.target.value);
    setCurrentPage(1);
  };

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
              <select
                className="px-4 py-2 bg-white border-2 rounded-full outline-none border-violet-500"
                value={difficultyFilter}
                onChange={handleDifficultyChange}
              >
                <option value="all">All Levels</option>
                <option value="1">Beginner</option>
                <option value="2">Intermediate</option>
                <option value="3">Advanced</option>
              </select>
              <input
                className="w-48 px-4 py-2 border-2 rounded-full outline-none border-violet-500"
                placeholder="Search a quiz..."
                onChange={handleSearch}
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
