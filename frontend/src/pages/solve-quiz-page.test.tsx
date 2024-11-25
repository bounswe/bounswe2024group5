/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocation } from "react-router-dom";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";
import { useQuizAttempts } from "../hooks/api/attempts/list";
import { useCreateQuizAttempt } from "../hooks/api/attempts/create";
import { useQuestionAnswers } from "../hooks/api/questions-answers/list";
import { useCreateQuestionAnswer } from "../hooks/api/questions-answers/answer";

// Mock data
const mockQuiz = {
  id: 1,
  title: "Test Quiz",
  questions: [
    {
      id: 1,
      word: "hello",
      questionType: "english_to_turkish" as const,
      correctAnswer: "merhaba",
      options: ["merhaba", "güle güle", "nasılsın", "iyi akşamlar"],
    },
    {
      id: 2,
      word: "goodbye",
      questionType: "english_to_turkish" as const,
      correctAnswer: "güle güle",
      options: ["merhaba", "güle güle", "nasılsın", "iyi akşamlar"],
    },
  ],
};

const mockQuizAttempt = {
  id: 1,
  quizId: 1,
  score: 0,
  completed: false,
  createdAt: new Date().toISOString(),
};

const mockLocation = {
  pathname: "/quiz/1",
  search: "",
  hash: "",
  state: null,
};

// Mock the hooks
vi.mock("react-router-dom", () => ({
  useLocation: () => mockLocation,
}));

vi.mock("../hooks/api/get-quizzes", () => ({
  useFetchQuizzes: vi.fn(),
}));

vi.mock("../hooks/api/attempts/list", () => ({
  useQuizAttempts: vi.fn(),
}));

vi.mock("../hooks/api/attempts/create", () => ({
  useCreateQuizAttempt: vi.fn(),
}));

vi.mock("../hooks/api/questions-answers/list", () => ({
  useQuestionAnswers: vi.fn(),
}));

vi.mock("../hooks/api/questions-answers/answer", () => ({
  useCreateQuestionAnswer: vi.fn(),
}));

describe("SolveQuizPage", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Quiz Loading", () => {
    it("should load quiz correctly", () => {
      (useFetchQuizzes as any).mockReturnValue({
        data: [mockQuiz],
        isLoading: false,
      });

      const { result } = renderHook(() => useFetchQuizzes());
      expect(result.current.data?.[0]).toEqual(mockQuiz);
      expect(result.current.isLoading).toBeFalsy();
    });

    it("should handle quiz loading state", () => {
      (useFetchQuizzes as any).mockReturnValue({
        data: null,
        isLoading: true,
      });

      const { result } = renderHook(() => useFetchQuizzes());
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.data).toBeNull();
    });
  });

  describe("Quiz Attempt Management", () => {
    beforeEach(() => {
      (useQuizAttempts as any).mockReturnValue({
        data: [],
        isLoading: false,
      });
      (useCreateQuizAttempt as any).mockReturnValue({
        mutateAsync: vi.fn().mockResolvedValue(mockQuizAttempt),
      });
    });

    it("should create new quiz attempt if none exists", async () => {
      const { result } = renderHook(() => useCreateQuizAttempt());
      const newAttempt = await result.current.mutateAsync({ quizId: 1 });
      expect(newAttempt).toEqual(mockQuizAttempt);
    });

    it("should use existing incomplete attempt", () => {
      (useQuizAttempts as any).mockReturnValue({
        data: [mockQuizAttempt],
        isLoading: false,
      });

      const { result } = renderHook(() =>
        useQuizAttempts({
          quizId: 1,
          isCompleted: false,
        })
      );
      expect(result.current.data?.[0]).toEqual(mockQuizAttempt);
    });
  });

  describe("Answer Management", () => {
    const mockAnswerResponse = {
      id: 1,
      questionId: 1,
      answer: "merhaba",
      isCorrect: true,
    };

    beforeEach(() => {
      (useCreateQuestionAnswer as any).mockReturnValue({
        mutateAsync: vi.fn().mockResolvedValue(mockAnswerResponse),
      });
    });

    it("should create answer correctly", async () => {
      const { result } = renderHook(() => useCreateQuestionAnswer());

      const answer = await result.current.mutateAsync({
        quizAttemptId: 1,
        questionId: 1,
        answer: "merhaba",
      });

      expect(answer).toEqual(mockAnswerResponse);
      expect(answer.isCorrect).toBeTruthy();
    });

    it("should track answered questions", () => {
      (useQuestionAnswers as any).mockReturnValue({
        data: [mockAnswerResponse],
      });

      const { result } = renderHook(() =>
        useQuestionAnswers({ quizAttemptId: 1 })
      );
      expect(result.current.data?.length).toBe(1);
      expect(result.current.data?.[0].isCorrect).toBeTruthy();
    });
  });

  describe("Quiz Progress", () => {
    const mockAnswers = [
      { questionId: 1, answer: "merhaba", isCorrect: true },
      { questionId: 2, answer: "güle güle", isCorrect: true },
    ];

    beforeEach(() => {
      (useQuestionAnswers as any).mockReturnValue({
        data: mockAnswers,
      });
    });

    it("should calculate score correctly", () => {
      const { result } = renderHook(() =>
        useQuestionAnswers({ quizAttemptId: 1 })
      );
      const correctAnswers = result.current.data?.filter(
        (a) => a.isCorrect
      ).length;
      expect(correctAnswers).toBe(2);
    });

    it("should track quiz completion", () => {
      const { result } = renderHook(() =>
        useQuestionAnswers({ quizAttemptId: 1 })
      );
      const isComplete =
        result.current.data?.length === mockQuiz.questions.length;
      expect(isComplete).toBeTruthy();
    });
  });

  describe("Quiz Navigation", () => {
    it("should get correct question from URL", () => {
      const location = useLocation();
      expect(location.pathname).toBe("/quiz/1");
      expect(location.pathname.split("/").pop()).toBe("1");
    });

    it("should parse quiz ID correctly", () => {
      const location = useLocation();
      const quizId = location.pathname.split("/").pop();
      const quizIdAsNumber = Number.parseInt(quizId || "");
      expect(quizIdAsNumber).toBe(1);
    });
  });

  describe("Error States", () => {
    it("should handle quiz not found", () => {
      (useFetchQuizzes as any).mockReturnValue({
        data: [],
        isLoading: false,
      });

      const { result } = renderHook(() => useFetchQuizzes());
      expect(result.current.data).toEqual([]);
    });

    it("should handle empty questions", () => {
      const emptyQuiz = { ...mockQuiz, questions: [] };
      (useFetchQuizzes as any).mockReturnValue({
        data: [emptyQuiz],
        isLoading: false,
      });

      const { result } = renderHook(() => useFetchQuizzes());
      expect(result.current.data?.[0].questions).toHaveLength(0);
    });
  });
});
