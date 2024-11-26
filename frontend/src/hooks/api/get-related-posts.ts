import { useContext } from "react";
import HostContext from "../../HostContext";
import { useQuery } from "@tanstack/react-query";
import { ForumPost } from "../../types/forum-post";

export const useFetchRelatedPosts = (postId: number | null) => {
    const TOKEN = sessionStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['related-posts', postId],
        queryFn: async () => {
            if (postId === null) return null;
            const response = await fetch(`${hostUrl}/api/posts/${postId}/related`, {
                headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json'
				}
            });
            if (!response.ok) {
                throw new Error('Failed to fetch replies!');
            }
            const body = await response.json();

            console.log("here2");
            console.log(body);

            return body as ForumPost[];
        }
    });
}