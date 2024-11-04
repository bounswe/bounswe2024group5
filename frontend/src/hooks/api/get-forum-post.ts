import { useQuery } from "@tanstack/react-query";
import { ForumPostDetails, mockForumPosts, mockForumReplies } from "../../types/forum-post";

export const useFetchPost = (postId: number) => {
    
    const context = useQuery({
        queryKey: ['post', postId],
        queryFn: () => {
            return {
                post: mockForumPosts.filter(post => post.id === postId),
                replies: mockForumReplies
            } as ForumPostDetails
        }
    })

    return context
}