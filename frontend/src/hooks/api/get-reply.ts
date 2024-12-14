import { useContext } from "react";
import HostContext from "../../HostContext";
import { useQuery } from "@tanstack/react-query";
import { ForumReply } from "../../types/forum-post";

export const useFetchReplies = (postId: number | null) => {
    const TOKEN = localStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['replies', postId],
        queryFn: async () => {
            if (postId === null) return null;
            const response = await fetch(`${hostUrl}/api/posts/${postId}/replies`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch replies!');
            }
            const body = await response.json();
            return body as ForumReply[];
        }
    });
}