import { ForumPost } from "../components/forum/ForumPost";
import { ForumPostProps } from "../types/forum-post";

export const ForumPage = () => {

  const exampleForumPost: ForumPostProps = {
    id: 1,
    username: "odenizddd",
    title: "How can I use the word affection in a sentence?",
    content: "I came across the word affection when I was solving a quiz. I was able to find the correct answer by eliminating other options, however I don't feel confident using this word in a real sentence. Can you guys give me several examples, please?",
    upvote: 26,
    tags: ["affection"],
    createdAt: "",
    updatedAt: ""
  }

  return (
    <div>
      <ForumPost {...exampleForumPost}></ForumPost>
    </div>
  );
};
