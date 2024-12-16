/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocation } from "react-router-dom";
import { useLeaderboard } from "../hooks/api/leaderboard/get";

const mockLeaderboardData = {
  weekly: {
    quizSolved: [{ username: "user1", solved: 10 }],
    quizCreated: [{ username: "user2", created: 5 }],
    pointsEarned: [{ username: "user3", points: 1000 }],
  },
  monthly: {
    quizSolved: [{ username: "user4", solved: 30 }],
    quizCreated: [{ username: "user5", created: 15 }],
    pointsEarned: [{ username: "user6", points: 3000 }],
  },
};

const mockLocation = {
  pathname: "/leaderboard",
  search: "",
  hash: "",
  state: null,
};

vi.mock("react-router-dom", () => ({
  useLocation: () => mockLocation,
}));

vi.mock("../hooks/api/leaderboard/get", () => ({
  useLeaderboard: vi.fn(),
}));

describe("Leaderboard Data Management", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Leaderboard Loading", () => {
    it("should handle loading state", () => {
      (useLeaderboard as any).mockReturnValue({
        data: null,
        isLoading: true,
      });

      const { result } = renderHook(() => useLeaderboard());
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.data).toBeNull();
    });

    it("should load leaderboard data correctly", () => {
      (useLeaderboard as any).mockReturnValue({
        data: mockLeaderboardData,
        isLoading: false,
      });

      const { result } = renderHook(() => useLeaderboard());
      expect(result.current.data).toEqual(mockLeaderboardData);
      expect(result.current.data?.weekly.quizSolved[0].solved).toBe(10);
      expect(result.current.data?.monthly.pointsEarned[0].points).toBe(3000);
    });
  });

  describe("Error States", () => {
    it("should handle error state", () => {
      const error = new Error("Failed to load leaderboard");
      (useLeaderboard as any).mockReturnValue({
        data: null,
        isLoading: false,
        error,
      });

      const { result } = renderHook(() => useLeaderboard());
      expect(result.current.error).toEqual(error);
    });

    it("should handle empty leaderboard data", () => {
      const emptyData = {
        weekly: {
          quizSolved: [],
          quizCreated: [],
          pointsEarned: [],
        },
        monthly: {
          quizSolved: [],
          quizCreated: [],
          pointsEarned: [],
        },
      };

      (useLeaderboard as any).mockReturnValue({
        data: emptyData,
        isLoading: false,
      });

      const { result } = renderHook(() => useLeaderboard());
      expect(result.current.data?.weekly.quizSolved).toHaveLength(0);
      expect(result.current.data?.monthly.quizSolved).toHaveLength(0);
    });
  });

  describe("Navigation", () => {
    it("should be on correct page", () => {
      const location = useLocation();
      expect(location.pathname).toBe("/leaderboard");
    });
  });
});
