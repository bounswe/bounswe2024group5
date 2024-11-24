import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";
import HostContext from "../../HostContext";
import { ForumPost } from "../../types/forum-post";

export const useDeleteUpvote = (postId: number) => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext)

    return useMutation({
        mutationFn: async () => {
            console.log('deleting upvote... sdlfkdsnflk');
            const TOKEN = sessionStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/posts/${postId}/upvote`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
				}
			});

			if (!response.ok) {
				throw new Error('Failed to upvote post.');
			}
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts']});
            queryClient.setQueryData<ForumPost[]>(['posts'], (old) => old?.map(post => post.id === postId ? {...post, noUpvote: post.noUpvote-1} : post))
        }
    })
}