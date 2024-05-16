CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    bio VARCHAR(1023),
    public_name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    spotify_acc VARCHAR(255),
    instagram_acc VARCHAR(255),
    is_Private boolean DEFAULT 0,
    UNIQUE (username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    text VARCHAR(1024),
    media_url varchar(1023),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag varchar(255),
    post_id INT references posts (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    text VARCHAR(1023) NOT NULL,
    post_id INT NOT NULL references posts (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS followings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    followed VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    UNIQUE(follower, followed),
    check(follower != followed),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    post_id INT NOT NULL references posts (id) ON DELETE CASCADE,
    UNIQUE(username, post_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    comment_id INT NOT NULL references comments (id) ON DELETE CASCADE,
    UNIQUE(username, comment_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blocker VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    blocked VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    UNIQUE(blocker, blocked),
    check(blocker != blocked),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_sharings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    post_id INT NOT NULL references posts (id) ON DELETE CASCADE,
    UNIQUE(username, post_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS search_histories (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL references users (username) ON DELETE CASCADE,
    query VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
