/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CreateaPostComponent } from "./CreatePost";
import { useCreatePost } from "../../hooks/api/create-post";

vi.mock("../../hooks/api/create-post", () => ({
  useCreatePost: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
}));

vi.mock("../../hooks/api/autocomplete", () => ({
  useWordAutocomplete: vi.fn((input) => ({
    data: ["hello"].filter((s) => s.includes(input)),
    isLoading: false,
  })),
}));

describe("CreateaPostComponent", () => {
  const mockClose = vi.fn();

  it("should handle form submission with validation", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const mockCreatePost = vi.fn();
    (useCreatePost as any).mockReturnValue({
      mutateAsync: mockCreatePost,
    });

    render(<CreateaPostComponent close={mockClose} />);

    await userEvent.click(screen.getByText("Send Post"));
    expect(alertMock).toHaveBeenCalledWith(
      "Please enter a title for this post."
    );

    await userEvent.type(
      screen.getByPlaceholderText("Enter title."),
      "Test Title"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter content."),
      "Test Content"
    );

    const tagInput = screen.getByPlaceholderText(
      "Which words are relevant to this post?"
    );
    await userEvent.type(tagInput, "hello");
    await userEvent.keyboard("{Enter}");

    await userEvent.click(screen.getByText("Send Post"));

    expect(mockCreatePost).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
      tags: ["hello"],
    });
  });
});
