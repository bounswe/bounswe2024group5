import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react";
import HostContext from "../../HostContext";
import { ForumPost } from "../../types/forum-post";

type ReplyPayload = {
    content: string,
}

export const useCreateReply = (postId: number) => {
    const queryClient = useQueryClient();
    const hostUrl = useContext(HostContext)

    return useMutation({
        mutationFn: async ( postPayload: ReplyPayload ) => {
            const TOKEN = sessionStorage.getItem('token');
            const response = await fetch(`${hostUrl}/api/posts/${postId}/replies`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postPayload),
			});

			if (!response.ok) {
				throw new Error('Failed to send reply.');
			}

			return response.json();
        },
        onSuccess: (newReply) => {
            queryClient.invalidateQueries({ queryKey: ['replies']});
            queryClient.setQueryData<ForumPost[]>(['replies'], (old) => [...(old || []), newReply])
        }
    })
}