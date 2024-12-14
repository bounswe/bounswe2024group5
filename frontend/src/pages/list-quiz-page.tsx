import { motion } from "framer-motion";
import { useMemo } from "react";
import { useState } from "react";
import { Pagination } from "antd";
import { RegularQuizCard } from "../components/list-quizzes/regular-quiz-card";
import { FeaturedQuizCard } from "../components/list-quizzes/featured-quiz-card";
import { Link } from "react-router-dom";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";

type DifficultyFilter = "all" | string;

export const getDifficultyLevel = (difficulty: number): string => {
  if (difficulty < 400) return "A1";
  if (difficulty < 1000) return "A2";
  if (difficulty < 1800) return "B1";
  if (difficulty < 2600) return "B2";
  if (difficulty < 3300) return "C1";
  return "C2";
};
export const ListQuizzesPage = () => {
  const getDifficultyAnnouncement = (level: string) => {
    const levels = {
      A1: "Beginner level (A1) - Basic understanding",
      A2: "Elementary level (A2) - Foundation building",
      B1: "Intermediate level (B1) - Practical usage",
      B2: "Upper intermediate level (B2) - Fluent usage",
      C1: "Advanced level (C1) - Professional competence",
      C2: "Mastery level (C2) - Near-native proficiency",
      all: "Quizzes of all proficiency levels",
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

      const quizDifficultyLevel = getDifficultyLevel(quiz.difficulty);
      const matchesDifficulty =
        difficultyFilter === "all" || quizDifficultyLevel === difficultyFilter;

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
    <main
      className="min-h-screen px-4 border border-purple-300 bg-purple-50 rounded-3xl"
      role="main"
      aria-label="Quiz listing page"
    >
      <div className="container px-4 py-8 mx-auto">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
          aria-label="featured-section"
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className="mb-4 text-2xl font-semibold text-purple-800"
              id="featured-section"
            >
              Featured Quizzes
            </h2>
            <Link to="/add-quiz" aria-label="Create a new quiz">
              <button className="px-4 py-2 text-white bg-violet-500 rounded-3xl">
                Create a quiz
              </button>
            </Link>
          </div>
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
            aria-label="Featured quizzes grid"
          >
            {highlightedQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                role="listitem"
                aria-label={`${quiz.title} - ${getDifficultyAnnouncement(
                  getDifficultyLevel(quiz.difficulty)
                )}`}
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
            <h2
              className="mb-4 text-2xl font-semibold text-purple-800"
              id="all-quizzes-section"
            >
              All Quizzes
            </h2>

            <div className="flex gap-2" aria-label="Quiz filters">
              <select
                className="px-4 py-2 bg-white border-2 rounded-full outline-none border-violet-500"
                value={difficultyFilter}
                onChange={handleDifficultyChange}
                aria-label="Filter quizzes by proficiency level"
                aria-description="Filter quizzes by language proficiency level from A1 to C2"
              >
                <option value="all">All Proficiency Levels</option>
                <option value="A1">A1 - Beginner Level (0-399)</option>
                <option value="A2">A2 - Elementary Level (400-999)</option>
                <option value="B1">B1 - Intermediate Level (1000-1799)</option>
                <option value="B2">
                  B2 - Upper Intermediate Level (1800-2599)
                </option>
                <option value="C1">C1 - Advanced Level (2600-3299)</option>
                <option value="C2">C2 - Mastery Level (3300+)</option>
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
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            aria-label="All quizzes grid"
          >
            {currentQuizzes.map((quiz) => (
              <div
                role="listitem"
                key={quiz.id}
                aria-label={`Educational quiz: ${
                  quiz.title
                } - ${getDifficultyAnnouncement(
                  getDifficultyLevel(quiz.difficulty)
                )}`}
              >
                <RegularQuizCard quiz={quiz} />
              </div>
            ))}
          </div>
          <div
            className="flex justify-center mt-8"
            aria-label="Quiz pagination"
          >
            <Pagination
              current={currentPage}
              total={regularQuizzes.length}
              pageSize={pageSize}
              onChange={onPageChange}
              showSizeChanger={false}
              aria-label={`Page ${currentPage} of ${Math.ceil(
                regularQuizzes.length / pageSize
              )}`}
            />
          </div>
        </motion.section>
      </div>
    </main>
  );
};
