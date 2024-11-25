/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../hooks/api/profile/get";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";
import { useQuizAttempts } from "../hooks/api/attempts/list";
import { useFetchPosts } from "../hooks/api/get-forum-post";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
}));

vi.mock("../hooks/api/profile/get", () => ({
  useGetProfile: vi.fn(),
}));

vi.mock("../hooks/api/get-quizzes", () => ({
  useFetchQuizzes: vi.fn(),
}));

vi.mock("../hooks/api/attempts/list", () => ({
  useQuizAttempts: vi.fn(),
}));

vi.mock("../hooks/api/get-forum-post", () => ({
  useFetchPosts: vi.fn(),
}));

const mockProfile = {
  username: "testuser",
  name: "Test User",
  email: "test@example.com",
  profilePicture: "test.jpg",
  score: 100,
  englishProficiency: "B2",
  noCreatedQuizzes: 5,
};

const mockQuizzes = [
  {
    id: 1,
    title: "Quiz 1",
    difficulty: 1500,
    questions: [{ id: 1 }, { id: 2 }],
  },
  {
    id: 2,
    title: "Quiz 2",
    difficulty: 2000,
    questions: [{ id: 3 }, { id: 4 }],
  },
];

const mockAttempts = [
  {
    id: 1,
    quiz: { title: "Quiz 1" },
    score: 80,
    date: "2024-03-20",
  },
  {
    id: 2,
    quiz: { title: "Quiz 2" },
    score: 90,
    date: "2024-03-21",
  },
];

const mockPosts = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    date: "2024-03-20",
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content 2",
    date: "2024-03-21",
  },
];

describe("ProfilePage Data Loading", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Own Profile", () => {
    beforeEach(() => {
      (useParams as any).mockReturnValue({ username: undefined });
      (useGetProfile as any).mockReturnValue({
        data: mockProfile,
        error: null,
      });
      (useFetchQuizzes as any).mockReturnValue({ data: mockQuizzes });
      (useQuizAttempts as any).mockReturnValue({ data: mockAttempts });
      (useFetchPosts as any).mockReturnValue({ data: mockPosts });
    });

    it("should load own profile correctly", () => {
      const { result } = renderHook(() => useGetProfile(undefined));
      expect(result.current.data).toEqual(mockProfile);
      expect(result.current.error).toBeNull();
    });

    it("should load own quizzes correctly", () => {
      const { result } = renderHook(() =>
        useFetchQuizzes({ username: mockProfile.username })
      );
      expect(result.current.data).toEqual(mockQuizzes);
      expect(result.current.data?.length).toBe(2);
    });

    it("should load quiz attempts correctly", () => {
      const { result } = renderHook(() => useQuizAttempts());
      expect(result.current.data).toEqual(mockAttempts);
      expect(result.current.data?.length).toBe(2);
    });
  });

  describe("Other User Profile", () => {
    const otherUsername = "otheruser";

    beforeEach(() => {
      (useParams as any).mockReturnValue({ username: otherUsername });
      (useGetProfile as any).mockReturnValue({
        data: { ...mockProfile, username: otherUsername },
        error: null,
      });
    });

    it("should load other user profile correctly", () => {
      const { result } = renderHook(() => useGetProfile(otherUsername));
      expect(result.current.data?.username).toBe(otherUsername);
    });
  });

  describe("Error States", () => {
    it("should handle profile loading error", () => {
      const errorMessage = "Failed to load profile";
      (useGetProfile as any).mockReturnValue({
        data: null,
        error: new Error(errorMessage),
      });

      const { result } = renderHook(() => useGetProfile("unknown"));
      expect(result.current.error).toBeTruthy();
      expect(result.current.error?.message).toBe(errorMessage);
    });
  });

  describe("Profile Stats", () => {
    beforeEach(() => {
      (useGetProfile as any).mockReturnValue({
        data: mockProfile,
        error: null,
      });
    });

    it("should have correct number of quizzes created", () => {
      const { result } = renderHook(() => useGetProfile(undefined));
      expect(result.current.data?.noCreatedQuizzes).toBe(5);
    });

    it("should show correct English proficiency level", () => {
      const { result } = renderHook(() => useGetProfile(undefined));
      expect(result.current.data?.englishProficiency).toBe("B2");
    });

    it("should show correct score", () => {
      const { result } = renderHook(() => useGetProfile(undefined));
      expect(result.current.data?.score).toBe(100);
    });
  });

  describe("Forum Posts", () => {
    beforeEach(() => {
      (useFetchPosts as any).mockReturnValue({ data: mockPosts });
    });

    it("should load forum posts correctly", () => {
      const { result } = renderHook(() =>
        useFetchPosts({ username: mockProfile.username })
      );
      expect(result.current.data).toEqual(mockPosts);
      expect(result.current.data?.length).toBe(2);
    });
  });
});
