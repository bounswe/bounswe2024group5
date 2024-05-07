import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

function FeedPage() {
    const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // You can perform any search-related logic here, such as filtering or fetching data based on the search query
  };

  const handleLogout = () => {
    // Add token removal logic here later
    navigate("/login");
  };

  return (
    <>
    <div className="flex justify-center bg-[#0D1520] p-4 w-screen">
      <div className="w-[400px] overflow-scroll h-screen flex flex-col items-center gap-4
      no-scrollbar">
        <Post></Post>   
        <Post></Post> 
        <Post></Post>  
      </div>
    </div>
       
    </>
  );
}

export default FeedPage;