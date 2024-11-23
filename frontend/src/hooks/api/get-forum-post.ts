import { useQuery } from "@tanstack/react-query";
import { ForumPost } from "../../types/forum-post";
import HostContext from "../../HostContext";
import { useContext } from "react";

export const useFetchPosts = () => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await fetch(`${hostUrl}/api/posts`, {
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
			});
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const body = await response.json()
            return body as ForumPost[];
        }
    });
}

export const useFetchPost = (postId: number) => {
    
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);
    return useQuery({
        queryKey: ['posts', postId],
        queryFn: async () => {
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