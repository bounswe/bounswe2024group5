import { useContext } from "react";
import HostContext from "../../HostContext";
import { useQuery } from "@tanstack/react-query";
import { ForumPost } from "../../types/forum-post";

export const useSearchPosts = (params: { keyword: string; page?: number, size?: number }) => {
    const TOKEN = localStorage.getItem('token');
    const hostUrl = useContext(HostContext);

    return useQuery({
        queryKey: ['search-posts', params],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            queryParams.append('keyword', params.keyword);
            queryParams.append('page', params.page?.toString() || "0");
            queryParams.append('size', params.size?.toString() || "40");

            const url = `${hostUrl}/api/posts/search${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to search posts.');
            }

            const body = await response.json();
            return body as ForumPost[];
        }
    });
};