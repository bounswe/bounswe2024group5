import { CreateaPostComponent } from "../components/forum/CreatePost";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { mockForumPosts } from "../types/forum-post";
import { useState } from "react";

export const ForumPage = () => {  

  const [postComponent, setPostComponent] = useState<boolean>(false);

  const closePostComponent = () => {
    setPostComponent(false)
  }

  return (
    <div className="max-w-fit flex flex-col gap-8 mx-auto items-center">
      <div className="flex justify-end items-end w-full">
        <button onClick={() => {setPostComponent(true)}} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Create Post</button>
      </div>
      { postComponent && <CreateaPostComponent close={closePostComponent}/> }
      { mockForumPosts.map(mockPost => {
        return <ForumPostComponent post={mockPost} />
      })}
    </div>
  );
};
