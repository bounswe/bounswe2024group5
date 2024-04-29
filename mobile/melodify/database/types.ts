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
    followingList: RegisteredUser[];
    followerList: RegisteredUser[];
    sharedPosts: Post[];
    bio: string;
    publicName: string;
    profilePicture: string;
    socialPlatforms: string[];
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
    blockedUsers: RegisteredUser[];
    likedPosts: Post[];
};

export type SearchEngine = {
    searchHistory: string[];
    filter: Filter;
};


export type Filter = {
    parameters: Map<string, Object>;
};