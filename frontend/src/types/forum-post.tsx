export type ForumPost = {
    id: number,
    username: string,
    title: string,
    content: string,
    upvote: number,
    tags: string[],
    createdAt: string,
    updatedAt: string
}

export type ForumPostProps = ForumPost;