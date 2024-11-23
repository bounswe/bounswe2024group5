// import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionInputWithTemplate } from "../components/create-quiz/word-input-with-question-template";

// import type { Question } from "../src/types/question";
import type { Question } from "../types/question";
describe("QuestionInputWithTemplate", () => {
  const mockOnWordChange = vi.fn();

  beforeEach(() => {
    mockOnWordChange.mockClear();
  });

  it("renders with english_to_turkish template correctly", () => {
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByText("How do you say")).toBeDefined();
    expect(screen.getByText("in Turkish?")).toBeDefined();
  });

  it("renders with turkish_to_english template correctly", () => {
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="turkish_to_english"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByText("How do you say")).toBeDefined();
    expect(screen.getByText("in English?")).toBeDefined();
  });

  it("renders with english_to_sense template correctly", () => {
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_sense"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByText("What is the meaning of")).toBeDefined();
    expect(screen.getByText("?")).toBeDefined();
  });

  it("renders with initial word value", () => {
    render(
      <QuestionInputWithTemplate
        word="test"
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByDisplayValue("test")).toBeDefined();
  });

  it("calls onWordChange when input value changes", async () => {
    const user = userEvent.setup();
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    const input = screen.getByPlaceholderText("Enter word");
    await user.type(input, "hello");

    expect(mockOnWordChange).toHaveBeenCalledTimes(5); // Once for each character
    expect(mockOnWordChange).toHaveBeenLastCalledWith("hello");
  });

  it("has proper input styling", () => {
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    const input = screen.getByPlaceholderText("Enter word");
    expect(input.className).includes("p-1");
    expect(input.className).includes("mx-2");
    expect(input.className).includes("border-b-2");
    expect(input.className).includes("border-purple-200");
  });

  it("handles empty word input correctly", async () => {
    const user = userEvent.setup();
    render(
      <QuestionInputWithTemplate
        word="test"
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    const input = screen.getByDisplayValue("test");
    await user.clear(input);

    expect(mockOnWordChange).toHaveBeenCalledWith("");
  });

  it("renders placeholder text correctly", () => {
    render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByPlaceholderText("Enter word")).toBeDefined();
  });

  it("updates template when questionType changes", () => {
    const { rerender } = render(
      <QuestionInputWithTemplate
        word=""
        questionType="english_to_turkish"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByText("in Turkish?")).toBeDefined();

    rerender(
      <QuestionInputWithTemplate
        word=""
        questionType="turkish_to_english"
        onWordChange={mockOnWordChange}
      />
    );

    expect(screen.getByText("in English?")).toBeDefined();
  });

  describe("getTemplate function", () => {
    const mockProps = {
      word: "",
      onWordChange: vi.fn(),
    };

    const questionTypes: Question["questionType"][] = [
      "english_to_turkish",
      "turkish_to_english",
      "english_to_sense",
    ];

    questionTypes.forEach((type) => {
      it(`returns correct template for ${type}`, () => {
        render(
          <QuestionInputWithTemplate {...mockProps} questionType={type} />
        );

        const input = screen.getByPlaceholderText("Enter word");
        expect(input).toBeDefined();

        switch (type) {
          case "english_to_turkish":
            expect(screen.getByText("in Turkish?")).toBeDefined();
            break;
          case "turkish_to_english":
            expect(screen.getByText("in English?")).toBeDefined();
            break;
          case "english_to_sense":
            expect(screen.getByText("?")).toBeDefined();
            break;
        }
      });
    });
  });
});
