import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";
import HostContext from "../../HostContext";
import { ForumPost } from "../../types/forum-post";

type PostPayload = {
    title: string,
    content: string,
    tags: string[]
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext)

    return useMutation({
        mutationFn: async (postPayload: PostPayload) => {
            const TOKEN = localStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postPayload),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            return response.json();
        },
        onSuccess: (newQuiz) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.setQueryData<ForumPost[]>(['posts'], (old) => [...(old || []), newQuiz])
        }
    })
}