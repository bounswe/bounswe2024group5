/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useHint } from "../../hooks/api/question-hint";
import { useQuery } from "@tanstack/react-query";

const mockHintData = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
];

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

describe("Question Hint Management", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  describe("Hint Loading", () => {
    it("should load hint images successfully", () => {
      localStorage.setItem("token", "mock-token");
      (useQuery as any).mockReturnValue({
        data: mockHintData,
        isLoading: false,
        error: null,
      });

      const { result } = renderHook(() => useHint("hello"));

      expect(result.current.data).toEqual(mockHintData);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle unauthorized error correctly", () => {
      localStorage.removeItem("token");
      const error = new Error("No authentication token found");
      (useQuery as any).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: error,
      });

      const { result } = renderHook(() => useHint("hello"));

      expect(result.current.data).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(error);
    });
  });
});
