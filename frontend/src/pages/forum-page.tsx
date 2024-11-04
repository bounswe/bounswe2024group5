import { ForumPostComponent } from "../components/forum/ForumPost";
import { ForumReplyComponent } from "../components/forum/ForumReply";
import { mockForumPosts, mockForumReplies } from "../types/forum-post";

export const ForumPage = () => {  
  return (
    <div className="flex flex-col gap-8 mx-auto items-center">
      { mockForumPosts.map(mockPost => {
        return <ForumPostComponent post={mockPost} />
      })}
      { mockForumReplies.map(mockReply => {
        return <ForumReplyComponent reply={mockReply} />
      })}
    </div>
  );
};
