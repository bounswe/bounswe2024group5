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
};
export type GuestUser = {
    username: string;
    password: string;
    email?: string;
};
export type Profile = {
    name: string;
    score: number,
    profilePicture: string;
    englishProficiency: string;         // a1, a2, b1, b2, c1, c2
    createdQuizzes: Quiz[];
    favoritedQuizzes: Quiz[];
    favoritedQuestions: Question[];
    posts: ForumQuestion[];
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
    createdAt?: string;
    updatedAt?: string;
}
export type Question = {
    id: number;
    quizId: number;
    word: string;
    questionType: QuestionType;
    options: string[];
    correctAnswer: string;      // 'A', 'B', 'C' or 'D'
    wrongAnswers: string[];
    difficulty: number;         // elo
}

export type QuestionType =
  | "english_to_turkish"
  | "turkish_to_english"
  | "english_to_sense";

// Forum types:
export type ForumQuestion = {
    id: number;
    title: string;
    content: string;
    username: string;
    noUpvote: number;
    hasUpvoted: boolean;
    createdAt: string;
    tags: string[];
    noReplies: number;
}

export type ForumReply = {
    id: number;
    content: string;
    createdAt: string;
    postId: number;
    username: string;
}

export type ForumFeed = {
    posts: ForumQuestion[];
}
// export type SearchEngine = {
//     searchHistory: string[];
//     filter: Filter;
// };

// export type Filter = {
//     parameters: Map<string, Object>;
// };
