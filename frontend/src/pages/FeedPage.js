import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import CreatePostDialog from "../components/CreatePostDialog";
import { FaPlus } from "react-icons/fa";

const mockPost = {
  pp: "pp2.jpeg",
  username: "The Lumineers",
  when: "2 hours ago",
  textBody: "Hey everyone! We're excited to announce our new album coming out next month. Stay tuned for more updates!",
  imageURL: "content.jpg",
}

function FeedPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false);
  const [posts, setPosts] = useState([mockPost, mockPost, mockPost]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // You can perform any search-related logic here, such as filtering or fetching data based on the search query
  };

  const handleLogout = () => {
    // Add token removal logic here later
    navigate("/login");
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  }

  return (
    <>
      <div className="flex justify-center bg-[#0D1520] p-4 w-screen">
        <div className="w-[400px] overflow-scroll h-screen flex flex-col items-center gap-4
        no-scrollbar">
          {posts && posts.map((post, index) => <Post key={index} postData={post}></Post>)}
        </div>
      </div>
      <CreatePostDialog isOpen={createPostDialogOpen} setIsOpen={setCreatePostDialogOpen} addPost={addPost}></CreatePostDialog>
      <button onClick={() => setCreatePostDialogOpen(true)} className="fixed bottom-4 right-4 bg-[#2870BD] hover:bg-[#0090FF] text-white flex items-center transition-colors duration-300 pl-4 pr-6 py-2 rounded-md cursor-pointer"><FaPlus className="inline-block mr-2 z-0"></FaPlus>Create Post</button>
    </>
  );
}

export default FeedPage;