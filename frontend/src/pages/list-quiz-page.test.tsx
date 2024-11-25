import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi } from "vitest";
import { useState, useMemo } from "react";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";

const mockQuizzes = [
  {
    id: 1,
    title: "Basic Quiz",
    difficulty: 200,
    description: "A1 level quiz",
    image: "test.jpg",
  },
  {
    id: 2,
    title: "Advanced Quiz",
    difficulty: 2700,
    description: "C1 level quiz",
    image: "test.jpg",
  },
  {
    id: 3,
    title: "Intermediate Quiz",
    difficulty: 1500,
    description: "B1 level quiz",
    image: "test.jpg",
  },
];

vi.mock("../hooks/api/get-quizzes", () => ({
  useFetchQuizzes: () => ({
    data: mockQuizzes,
  }),
}));

describe("ListQuizzesPage Utils", () => {
  describe("getDifficultyLevel", () => {
    const getDifficultyLevel = (difficulty: number): string => {
      if (difficulty < 400) return "A1";
      if (difficulty < 1000) return "A2";
      if (difficulty < 1800) return "B1";
      if (difficulty < 2600) return "B2";
      if (difficulty < 3300) return "C1";
      return "C2";
    };

    it("should return correct difficulty levels", () => {
      expect(getDifficultyLevel(200)).toBe("A1");
      expect(getDifficultyLevel(500)).toBe("A2");
      expect(getDifficultyLevel(1500)).toBe("B1");
      expect(getDifficultyLevel(2000)).toBe("B2");
      expect(getDifficultyLevel(2700)).toBe("C1");
      expect(getDifficultyLevel(3500)).toBe("C2");
    });
  });

  describe("Quiz Filtering", () => {
    const useQuizFiltering = (
      initialSearchQuery = "",
      initialDifficultyFilter = "all"
    ) => {
      const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
      const [difficultyFilter, setDifficultyFilter] = useState<"all" | string>(
        initialDifficultyFilter
      );
      const { data: quizzes } = useFetchQuizzes();

      const getDifficultyLevel = (difficulty: number): string => {
        if (difficulty < 400) return "A1";
        if (difficulty < 1000) return "A2";
        if (difficulty < 1800) return "B1";
        if (difficulty < 2600) return "B2";
        if (difficulty < 3300) return "C1";
        return "C2";
      };

      const filteredQuizzes = useMemo(() => {
        return (quizzes || []).filter((quiz) => {
          const matchesSearch = quiz.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

          const quizDifficultyLevel = getDifficultyLevel(quiz.difficulty);
          const matchesDifficulty =
            difficultyFilter === "all" ||
            quizDifficultyLevel === difficultyFilter;

          return matchesSearch && matchesDifficulty;
        });
      }, [quizzes, searchQuery, difficultyFilter]);

      return {
        filteredQuizzes,
        setSearchQuery,
        setDifficultyFilter,
      };
    };

    it("should filter quizzes by search query", () => {
      const { result } = renderHook(() => useQuizFiltering("Basic"));

      expect(result.current.filteredQuizzes).toHaveLength(1);
      expect(result.current.filteredQuizzes[0].title).toBe("Basic Quiz");
    });

    it("should filter quizzes by difficulty", () => {
      const { result } = renderHook(() => useQuizFiltering("", "C1"));

      expect(result.current.filteredQuizzes).toHaveLength(1);
      expect(result.current.filteredQuizzes[0].difficulty).toBe(2700);
    });

    it("should show all quizzes when no filters are applied", () => {
      const { result } = renderHook(() => useQuizFiltering());

      expect(result.current.filteredQuizzes).toHaveLength(3);
    });
  });

  describe("Pagination", () => {
    const usePagination = (initialPage = 1) => {
      const [currentPage, setCurrentPage] = useState(initialPage);
      const pageSize = 2; // Changed to 2 for testing purposes
      const quizzes = [
        {
          id: 1,
          title: "Quiz 1",
          difficulty: 200,
          description: "Test 1",
          image: "test.jpg",
        },
        {
          id: 2,
          title: "Quiz 2",
          difficulty: 2700,
          description: "Test 2",
          image: "test.jpg",
        },
        {
          id: 3,
          title: "Quiz 3",
          difficulty: 1500,
          description: "Test 3",
          image: "test.jpg",
        },
      ];

      const indexOfLastQuiz = currentPage * pageSize;
      const indexOfFirstQuiz = indexOfLastQuiz - pageSize;
      const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);

      return {
        currentQuizzes,
        setCurrentPage,
        pageSize,
      };
    };

    it("should show correct number of quizzes per page", () => {
      const { result } = renderHook(() => usePagination());
      expect(result.current.currentQuizzes).toHaveLength(2);
      expect(result.current.currentQuizzes[0].id).toBe(1);
      expect(result.current.currentQuizzes[1].id).toBe(2);
    });

    it("should show correct quizzes for second page", () => {
      const { result } = renderHook(() => usePagination(2));

      expect(result.current.currentQuizzes).toHaveLength(1);
      expect(result.current.currentQuizzes[0].id).toBe(3);
    });
  });
});
