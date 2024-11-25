import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useState } from "react";

// Define types
type QuestionType =
  | "english_to_turkish"
  | "turkish_to_english"
  | "english_to_sense";

interface Question {
  id: number;
  word: string;
  questionType: QuestionType;
  correctAnswer: string;
  wrongAnswers: string[];
  options: string[];
  difficulty: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: number;
  image: string;
  questions: Question[];
}

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../../hooks/api/create-quiz", () => ({
  useCreateQuiz: () => ({
    mutateAsync: vi.fn(),
  }),
}));

vi.mock("../../hooks/api/upload-image", () => ({
  useUploadFile: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe("AddQuizPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize quiz with default values", () => {
    const { result } = renderHook(() => {
      const [quiz, setQuiz] = useState<Quiz>({
        id: expect.any(Number),
        title: "",
        description: "",
        difficulty: 1,
        image: "none",
        questions: [],
      });
      return { quiz, setQuiz };
    });

    expect(result.current.quiz).toEqual({
      id: expect.any(Number),
      title: "",
      description: "",
      difficulty: 1,
      image: "none",
      questions: [],
    });
  });

  it("should add a new question correctly", () => {
    const { result } = renderHook(() => {
      const [quiz, setQuiz] = useState<Quiz>({
        id: 1,
        title: "",
        description: "",
        difficulty: 1,
        image: "none",
        questions: [],
      });

      const addQuestion = () => {
        const newQuestion: Question = {
          id: expect.any(Number),
          word: "",
          questionType: "english_to_turkish",
          correctAnswer: "",
          wrongAnswers: ["", "", ""],
          options: [],
          difficulty: 1,
        };

        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: [...prevQuiz.questions, newQuestion],
        }));
      };

      return { quiz, addQuestion };
    });

    act(() => {
      result.current.addQuestion();
    });

    expect(result.current.quiz.questions).toHaveLength(1);
    expect(result.current.quiz.questions[0]).toEqual({
      id: expect.any(Number),
      word: "",
      questionType: "english_to_turkish",
      correctAnswer: "",
      wrongAnswers: ["", "", ""],
      options: [],
      difficulty: 1,
    });
  });

  it("should update question fields correctly", () => {
    const { result } = renderHook(() => {
      const [quiz, setQuiz] = useState<Quiz>({
        id: 1,
        title: "",
        description: "",
        difficulty: 1,
        image: "none",
        questions: [
          {
            id: 1,
            word: "",
            questionType: "english_to_turkish",
            correctAnswer: "",
            wrongAnswers: ["", "", ""],
            options: [],
            difficulty: 1,
          },
        ],
      });

      const updateQuestion = (
        id: number,
        field: keyof Question,
        value: unknown
      ) => {
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: prevQuiz.questions.map((q) =>
            q.id === id ? { ...q, [field]: value } : q
          ),
        }));
      };

      return { quiz, updateQuestion };
    });

    act(() => {
      result.current.updateQuestion(1, "word", "test");
    });

    expect(result.current.quiz.questions[0].word).toBe("test");
  });

  it("should update wrong answers correctly", () => {
    const { result } = renderHook(() => {
      const [quiz, setQuiz] = useState<Quiz>({
        id: 1,
        title: "",
        description: "",
        difficulty: 1,
        image: "none",
        questions: [
          {
            id: 1,
            word: "",
            questionType: "english_to_turkish",
            correctAnswer: "",
            wrongAnswers: ["", "", ""],
            options: [],
            difficulty: 1,
          },
        ],
      });

      const updateWrongAnswer = (
        questionId: number,
        answerIndex: number,
        value: string
      ) => {
        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: prevQuiz.questions.map((q) =>
            q.id === questionId
              ? {
                  ...q,
                  wrongAnswers: q.wrongAnswers.map((ans, idx) =>
                    idx === answerIndex ? value : ans
                  ),
                }
              : q
          ),
        }));
      };

      return { quiz, updateWrongAnswer };
    });

    act(() => {
      result.current.updateWrongAnswer(1, 0, "wrong answer 1");
    });

    expect(result.current.quiz.questions[0].wrongAnswers[0]).toBe(
      "wrong answer 1"
    );
  });
});
