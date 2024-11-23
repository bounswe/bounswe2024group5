import { CreateaPostComponent } from "../components/forum/CreatePost";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { useFetchPosts } from "../hooks/api/get-forum-post";
import { useState } from "react";

export const ForumPage = () => {  

  const [postComponent, setPostComponent] = useState<boolean>(false);

  const { data: posts } = useFetchPosts();

  console.log('here', posts)

  const closePostComponent = () => {
    setPostComponent(false)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-8 mx-auto items-center">
      <div className="w-full">
        <input type="text" placeholder="Search posts." className="border-b-2 border-b-violet-300 focus:border-b-violet-600 w-full text-xl px-2 py-1 outline-none"/>
      </div>
      <div className="flex justify-end items-end w-full">
        <button onClick={() => {setPostComponent(true)}} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Create Post</button>
      </div>
      { postComponent && <CreateaPostComponent close={closePostComponent}/> }
      { posts && posts.map(post => {
        return <ForumPostComponent postId={post.id} />
      })}
    </div>
  );
};
