import { useQuery } from "@tanstack/react-query";
import { ForumPost } from "../../types/forum-post";
import HostContext from "../../HostContext";
import { useContext } from "react";

export const useFetchPosts = (params?: { username?: string; tag?: string }) => {
    const TOKEN = localStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['posts', params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params?.username) queryParams.append('username', params.username);
            if (params?.tag) queryParams.append('tag', params.tag);

            const url = `${hostUrl}/api/posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const body = await response.json();
            return body as ForumPost[];
        }
    });
};

export const useFetchPost = (postId: number | null) => {

    const TOKEN = localStorage.getItem('token');
    const hostUrl = useContext(HostContext);
    return useQuery({
        queryKey: ['posts', postId],
        queryFn: async () => {
            if (postId === null) return null;
            const response = await fetch(`${hostUrl}/api/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const body = await response.json()
            return body as ForumPost;
        }
    });
}