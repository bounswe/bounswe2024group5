// User types:
export type User = {
    username: string;
    password: string;
    email?: string;
};
export type RegisteredUser = {
    username: string;
    password: string;
    email?: string;
    profile: Profile
};
export type GuestUser = {
    username: string;
    password: string;
    email?: string;
};
export type Profile = {
    name: string;
    surname: string;
    level: string;
    elo: number,
    // profilePicture: string;
}

// Quiz types:
export type Quiz = {
    id: number;
    username: string;
    title: string;
    elo: number;                // difficulty 
    image: string;              // URL ?
    description: string;
    difficulty: string;    // a1, a2, b1, b2, c1, c2
    questions: Question[];
    likes: number;
}
export type Question = {
    id: number;
    quizId: number;
    questionType: number;
    word: string;
    correct_answer: string;
    wrong_answers: string[];
    difficulty: number;         // elo
}

// Forum types:
export type Post = {
    id: number;
    title: string;
    content: Content;
    replies: Reply[];
    upvotes: number;
    tags: string[];
}
export type Content = {
    username: RegisteredUser;
    creationTimestamp: number;
    text: string;
};
export type Reply = {
    id: number;
    postId: number;
    content: Content;
}
export type ForumFeed = {
    posts: Post[];
}
// export type SearchEngine = {
//     searchHistory: string[];
//     filter: Filter;
// };

// export type Filter = {
//     parameters: Map<string, Object>;
// };
