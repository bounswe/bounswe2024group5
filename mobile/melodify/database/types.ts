export type Content = {
    author: RegisteredUser;
    creationTimestamp: number;
    editTimestamp?: number;
    text?: string;
    likeList: RegisteredUser[];
};
export type Post = {
    postId: string;
    comments: Comment[];
    imageUrl?: string;
    videoUrl?: string;
    tag?: string;

}

export type Profile = {
    followers: number;
    following: number;
    name: string;
    surname: string;
    bio: string;
    // profilePicture: string;
    private: boolean;
}

export type Comment = {
    commentId: string;
    parentPost: Post;
}

export type Feed = {
    postList: Post[];
}

export type User = {
    username: string;
    password: string;
    email?: string;
};

export type GuestUser = {
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

export type SearchEngine = {
    searchHistory: string[];
    filter: Filter;
};


export type Filter = {
    parameters: Map<string, Object>;
};