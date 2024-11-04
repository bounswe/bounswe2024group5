import { ForumPostComponent } from "../components/forum/ForumPost";
import { mockForumPosts } from "../types/forum-post";

export const ForumPage = () => {  
  return (
    <div className="max-w-fit flex flex-col gap-8 mx-auto items-center">
      <div className="flex justify-end items-end w-full">
        <button className="bg-violet-600 text-white p-2 px-8 rounded-lg">Create Post</button>
      </div>
      { mockForumPosts.map(mockPost => {
        return <ForumPostComponent post={mockPost} />
      })}
    </div>
  );
};
