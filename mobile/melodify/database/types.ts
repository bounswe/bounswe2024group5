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

export type Profile = {
}

export type Post = {}