/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { RecommendedQuizzes } from "./quiz-recommendations";
import { useGetRecommendedQuizzes } from "../../hooks/api/quizzes/get-related-quizzes";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../hooks/api/quizzes/get-related-quizzes", () => ({
  useGetRecommendedQuizzes: vi.fn(),
}));

vi.mock("@tabler/icons-react", () => ({
  IconBulb: () => <div data-testid="bulb-icon"></div>,
  IconUser: () => <div data-testid="user-icon"></div>,
  IconBooks: () => <div data-testid="books-icon"></div>,
}));

const mockQuizzes = [
  {
    id: 1,
    title: "Test Quiz 1",
    description: "Description 1",
    username: "user1",
    questions: [{ id: 1 }, { id: 2 }],
    difficulty: 400,
    image: "none",
  },
  {
    id: 2,
    title: "Test Quiz 2",
    description: "Description 2",
    username: "user2",
    questions: [{ id: 3 }],
    difficulty: 1000,
    image: "https://example.com/image.jpg",
  },
];

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("RecommendedQuizzes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render recommended quizzes when data is loaded", () => {
    (useGetRecommendedQuizzes as any).mockReturnValue({
      data: mockQuizzes,
      isLoading: false,
      error: null,
    });

    const { getByText, getAllByRole, getByTestId } = renderWithRouter(
      <RecommendedQuizzes quizId={1} />
    );

    expect(getByText("Recommended Quizzes")).toBeInTheDocument();
    expect(getByTestId("bulb-icon")).toBeInTheDocument();

    expect(getByText("Test Quiz 1")).toBeInTheDocument();
    expect(getByText("Test Quiz 2")).toBeInTheDocument();

    const links = getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/quiz/1");
    expect(links[1]).toHaveAttribute("href", "/quiz/2");
  });

  it("should render nothing when loading, error, or no data", () => {
    (useGetRecommendedQuizzes as any).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { container } = render(<RecommendedQuizzes quizId={1} />);
    expect(container.firstChild).toBeNull();

    (useGetRecommendedQuizzes as any).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    });

    const { container: errorContainer } = render(
      <RecommendedQuizzes quizId={1} />
    );
    expect(errorContainer.firstChild).toBeNull();

    (useGetRecommendedQuizzes as any).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    const { container: emptyContainer } = render(
      <RecommendedQuizzes quizId={1} />
    );
    expect(emptyContainer.firstChild).toBeNull();
  });
});

const mockRecommendedQuizzes = [
  {
    id: 1,
    title: "Turkish Basics",
    description: "Learn basic Turkish phrases",
    username: "teacher1",
    questions: [{ id: 1 }, { id: 2 }, { id: 3 }],
    difficulty: 350,
    image: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    title: "Advanced Grammar",
    description: "Master Turkish grammar rules",
    username: "teacher2",
    questions: [{ id: 4 }, { id: 5 }],
    difficulty: 2800,
    image: "none",
  },
];
describe("RecommendedQuizzes with Data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useGetRecommendedQuizzes as any).mockReturnValue({
      data: mockRecommendedQuizzes,
      isLoading: false,
      error: null,
    });
  });

  it("should render quiz cards with complete information", () => {
    const { getByText, getAllByTestId, getAllByRole } = render(
      <BrowserRouter>
        <RecommendedQuizzes quizId={1} />
      </BrowserRouter>
    );

    expect(getByText("Recommended Quizzes")).toBeInTheDocument();

    expect(getByText("Turkish Basics")).toBeInTheDocument();
    expect(getByText("Learn basic Turkish phrases")).toBeInTheDocument();
    expect(getByText("teacher1")).toBeInTheDocument();
    expect(getByText("3 questions")).toBeInTheDocument();
    expect(getByText("A1")).toBeInTheDocument();

    expect(getByText("Advanced Grammar")).toBeInTheDocument();
    expect(getByText("Master Turkish grammar rules")).toBeInTheDocument();
    expect(getByText("teacher2")).toBeInTheDocument();
    expect(getByText("2 questions")).toBeInTheDocument();
    expect(getByText("C1")).toBeInTheDocument();

    const userIcons = getAllByTestId("user-icon");
    const booksIcons = getAllByTestId("books-icon");
    expect(userIcons).toHaveLength(2);
    expect(booksIcons).toHaveLength(2);

    const links = getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/quiz/1");
    expect(links[1]).toHaveAttribute("href", "/quiz/2");
  });
});
