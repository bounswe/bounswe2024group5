import { ForumPost } from "../components/forum/ForumPost";
import { mockForumPosts } from "../types/forum-post";

export const ForumPage = () => {  
  return (
    <div className="flex flex-col gap-8 mx-auto items-center">
      { mockForumPosts.map(mockPost => {
        return <ForumPost {...mockPost}/>
      })}
    </div>
  );
};
