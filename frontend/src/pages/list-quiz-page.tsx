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
  const getDifficultyAnnouncement = (level: string) => {
    const levels = {
      "0": "Beginner friendly quiz",
      "1": "Intermediate level quiz",
      "2": "Advanced level quiz",
      "all": "Quizzes of all difficulty levels"
    } as const;
    return levels[level as keyof typeof levels] || levels["all"];
  };
  const { data: quizzes } = useFetchQuizzes();

  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 4;

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
    <main className="min-h-screen px-4 border border-purple-300 bg-purple-50 rounded-3xl" role="main" aria-label="Quiz listing page">
      <div className="container px-4 py-8 mx-auto">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
          aria-label="featured-section"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="mb-4 text-2xl font-semibold text-purple-800" id="featured-section">
              Featured Quizzes
            </h2>
            <Link to="/add-quiz" aria-label="Create a new quiz">
              <button className="px-4 py-2 text-white bg-violet-500 rounded-3xl">
                Create a quiz
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" aria-label="Featured quizzes grid">
            {highlightedQuizzes.map((quiz) => (
              <div 
                key={quiz.id} 
                role="listitem"
                aria-label={`${quiz.title} - ${getDifficultyAnnouncement(quiz.difficulty.toString())}`}
              >
                <FeaturedQuizCard quiz={quiz} />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          aria-labelledby="all-quizzes-section"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="mb-4 text-2xl font-semibold text-purple-800" id="all-quizzes-section">
              All Quizzes
            </h2>

            <div className="flex gap-2" aria-label="Quiz filters">
              <select
                className="px-4 py-2 bg-white border-2 rounded-full outline-none border-violet-500"
                value={difficultyFilter}
                onChange={handleDifficultyChange}
                aria-label="Filter quizzes by difficulty level"
                aria-description="Filter quizzes by learning difficulty: beginner, intermediate, or advanced"
              >
                <option value="all">All Difficulty Levels</option>
                <option value="0">Beginner - Perfect for New Learners</option>
                <option value="1">Intermediate - For Growing Skills</option>
                <option value="2">Advanced - Challenge Yourself</option>
              </select>
              <input
                className="w-48 px-4 py-2 border-2 rounded-full outline-none border-violet-500"
                placeholder="Search a quiz..."
                onChange={handleSearch}
                aria-label="Search quizzes"
                role="searchbox"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="All quizzes grid">
            {currentQuizzes.map((quiz) => (
              <div role="listitem" key={quiz.id} aria-label={`Educational quiz: ${quiz.title} - ${getDifficultyAnnouncement(quiz.difficulty.toString())}`}>
                <RegularQuizCard  quiz={quiz} />
              </div>
              
            ))}
          </div>
          <div className="flex justify-center mt-8" aria-label="Quiz pagination">
            <Pagination
              current={currentPage}
              total={regularQuizzes.length}
              pageSize={pageSize}
              onChange={onPageChange}
              showSizeChanger={false}
              aria-label={`Page ${currentPage} of ${Math.ceil(regularQuizzes.length / pageSize)}`}
            />
          </div>
        </motion.section>
      </div>
    </main>
  );
};
