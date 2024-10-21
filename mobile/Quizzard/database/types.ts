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
    profile: Profile;
    createdQuizzes: Quiz[];
    favoritedQuizzes: Quiz[];
    favoritedQuestions: Question[];
    posts: ForumPost[];
};
export type GuestUser = {
    username: string;
    password: string;
    email?: string;
};
export type Profile = {
    name: string;
    surname: string;
    level: string;        // a1, a2, b1, b2, c1, c2
    elo: number,
    profilePicture: string;
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
    correctAnswer: string;
    wrongAnswers: string[];
    difficulty: number;         // elo
}

// Forum types:
export type ForumPost = {
    id: number;
    title: string;
    content: Content;
    replies: ForumReply[];
    upvote: number;
    tags: string[];
}
export type Content = {
    username: RegisteredUser;
    creationTimestamp: number;
    text: string;
};
export type ForumReply = {
    id: number;
    postId: number;
    content: Content;
}
export type ForumFeed = {
    posts: ForumPost[];
}
// export type SearchEngine = {
//     searchHistory: string[];
//     filter: Filter;
// };

// export type Filter = {
//     parameters: Map<string, Object>;
// };
