import { CreateaPostComponent } from "../components/forum/CreatePost";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { useState } from "react";
import { useSearchPosts } from "../hooks/api/search-forum";

export const ForumPage = () => {  

  const [postComponent, setPostComponent] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  const { data: posts } = useSearchPosts({ keyword: searchInput });

  console.log('here', posts)

  const closePostComponent = () => {
    setPostComponent(false)
  }

  return (
    <div className="max-w-2xl flex flex-col gap-8 mx-auto items-center">
      <div className="w-full">
        <input value={searchInput} onChange={e => {setSearchInput(e.target.value)}} type="text" placeholder="Search posts." className="border-b-2 border-b-violet-300 focus:border-b-violet-600 w-full text-xl px-2 py-1 outline-none"/>
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
