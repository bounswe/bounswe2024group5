/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { CopyLinkButton } from "./copy-quiz-link-button";

// Mock the clipboard API
const mockClipboard = {
  writeText: vi.fn(),
};
Object.assign(navigator, { clipboard: mockClipboard });

// Mock success notification function
const mockSuccess = vi.fn();

// Mock the notification module
vi.mock("antd", () => ({
  notification: {
    useNotification: () => {
      return [
        {
          success: mockSuccess,
        },
        null,
      ];
    },
  },
}));

vi.mock("@tabler/icons-react", () => ({
  IconShare: ({ onClick }: { onClick: (e: any) => void }) => (
    <svg data-testid="share-icon" onClick={onClick}></svg>
  ),
}));

describe("CopyLinkButton", () => {
  const testUrl = "https://example.com/quiz/123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should copy URL to clipboard and show notification when clicked", async () => {
    const { getByTestId } = render(<CopyLinkButton url={testUrl} />);

    const shareIcon = getByTestId("share-icon");
    await fireEvent.click(shareIcon);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testUrl);
    expect(mockSuccess).toHaveBeenCalledWith({
      message: "Link Copied",
      description: "Quiz link has been copied to clipboard!",
      placement: "top",
      duration: 2,
    });
  });

  it("should render share icon that is clickable", () => {
    const { getByTestId } = render(<CopyLinkButton url={testUrl} />);

    const shareIcon = getByTestId("share-icon");
    expect(shareIcon).toBeDefined();
    expect(shareIcon).toHaveAttribute("data-testid", "share-icon");
  });
});
