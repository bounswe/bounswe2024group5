import { ForumPost } from "../components/forum/ForumPost";
import { ForumReply } from "../components/forum/ForumReply";
import { mockForumPosts, mockForumReplies } from "../types/forum-post";

export const ForumPage = () => {  
  return (
    <div className="flex flex-col gap-8 mx-auto items-center">
      { mockForumPosts.map(mockPost => {
        return <ForumPost post={mockPost} />
      })}
      { mockForumReplies.map(mockReply => {
        return <ForumReply reply={mockReply} />
      })}
    </div>
  );
};
