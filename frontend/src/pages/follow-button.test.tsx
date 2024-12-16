/* eslint-disable @typescript-eslint/no-explicit-any */
import {  beforeEach, describe, expect, it, vi } from "vitest";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../hooks/api/profile/get";
import ProfilePage from "./profile-page";
import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchFollowing } from "../hooks/api/profile/follow-button/get-following";
import { usePostFollowing } from "../hooks/api/profile/follow-button/post-following";
import { useDeleteFollowing } from "../hooks/api/profile/follow-button/delete-following";

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}))

vi.mock("../hooks/api/profile/get", () => ({
    useGetProfile: vi.fn(),
}))

vi.mock("../hooks/api/profile/follow-button/get-following", () => ({
    useFetchFollowing: vi.fn(),
}))

vi.mock("../hooks/api/profile/follow-button/post-following", () => ({
    usePostFollowing: vi.fn(),
}))

vi.mock("../hooks/api/profile/follow-button/delete-following", () => ({
    useDeleteFollowing: vi.fn(),
}))

const mockProfile = {
    username: "testuser",
    name: "Test User",
    email: "test@example.com",
    profilePicture: "test.jpg",
    score: 100,
    englishProficiency: "B2",
    noCreatedQuizzes: 5,
};

const queryClient = new QueryClient();

describe("Follow button", () => {

    beforeEach(() => {
        (useParams as any).mockReturnValue({ username:"testuser" });
        (useGetProfile as any).mockReturnValue({
            data: mockProfile,
            error: null,
        });
        (useFetchFollowing as any).mockReturnValue({
            data: [],
            error: null,
        });
        (usePostFollowing as any).mockReturnValue({
            mutateAsync: vi.fn().mockResolvedValue({ username: "testuser" }),
        });
        (useDeleteFollowing as any).mockReturnValue({
            mutateAsync: vi.fn().mockResolvedValue("testuser"),
        });
    });

    it("should not render in user's own profile.", () => {
        (useParams as any).mockReturnValue({ username: undefined });

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );
        expect(screen.queryByTestId("follow-button")).not.toBeInTheDocument();
    })

    it("should render in other users' profiles.", () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );
        expect(screen.queryByTestId("follow-button")).toBeInTheDocument();
    })

    it("should display 'Follow' when user is not following the profile.", () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );
        expect(screen.getByTestId("follow-button")).toHaveTextContent("Follow");
    })

    it("should display 'Unfollow' when user is following the profile.", () => {
        (useFetchFollowing as any).mockReturnValue({
            data: [
                {
                    username: "testuser"
                }
            ],
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );
        expect(screen.getByTestId("follow-button")).toHaveTextContent("Unfollow");
    })

    it("should call followUser when 'Follow' is clicked.", () => {

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );

        fireEvent.click(screen.getByTestId("follow-button"));
        expect(usePostFollowing).toHaveBeenCalled();
    })

    it("should call unfollowUser when 'Unfollow' is clicked.", () => {
        (useFetchFollowing as any).mockReturnValue({
            data: [
                {
                    username: "testuser"
                }
            ],
            error: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <ProfilePage />
            </QueryClientProvider>
        );
        expect(screen.getByTestId("follow-button")).toHaveTextContent("Unfollow");

        fireEvent.click(screen.getByTestId("follow-button"));
        expect(useDeleteFollowing).toHaveBeenCalled();
    })
})