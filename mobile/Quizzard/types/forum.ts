export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  tags: string[];
  createdAt: string;
  likes: number;
}

export interface Reply {
  id: number;
  content: string;
  username: string;
  createdAt: string;
} 