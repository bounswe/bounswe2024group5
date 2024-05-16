import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import CreatePostDialog from "../components/CreatePostDialog";
import ResultPreview from "../components/SearchResultPreview";
import { FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";

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

    const mockResults = [
        { id: 1, name: "Adam Acker", imageURL: "ProfilePicture1.png" },
        { id: 2, name: "Jessie Jordan", imageURL: "ProfilePicture2.png" },
        { id: 3, name: "Kareem Kahil", imageURL: "ProfilePicture3.png" },
        { id: 4, name: "Glenn Garrison", imageURL: "ProfilePicture4.png" },
        { id: 5, name: "Melina Maxwell", imageURL: "ProfilePicture5.png" }
    ];
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        fetch("http://localhost:80/api/posts", {
            method: "GET",
            headers: {
                "Host": "localhost:80",
                "Authorization": `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value) {
            setSearchResults(mockResults);
        } else {
            setSearchResults([]);
        }
    };


    const handleSearchKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            console.log("Search for:", searchQuery);
        }
    };


    const handleLogout = () => {
        navigate("/login");
    };

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    }

    return (
        <>
            <div className="w-screen h-screen overflow-hidden bg-[#0D1520] flex items-center justify-center">
                <div className="flex justify-center bg-[#0D1520] p-4 w-screen h-screen">
                    <div className="w-[400px] overflow-scroll h-screen flex flex-col items-center no-scrollbar">
                        {posts && posts.map((post, index) => <Post key={index} postData={post}></Post>)}
                    </div>
                </div>
                <CreatePostDialog isOpen={createPostDialogOpen} setIsOpen={setCreatePostDialogOpen} addPost={addPost}></CreatePostDialog>
                <button onClick={() => setCreatePostDialogOpen(true)} className="fixed bottom-4 right-4 bg-[#2870BD] hover:bg-[#0090FF] text-white flex items-center transition-colors duration-300 pl-4 pr-6 py-2 rounded-md cursor-pointer"><FaPlus className="inline-block mr-2 z-0"></FaPlus>Create Post</button>
                <Navbar></Navbar>
                <div className="absolute top-4 right-4 rounded-md py-2 px-4 w-1/6 rounded-md no-scrollbar border border-gray-300 focus:outline-none focus:border-indigo-500">
                    <div className="flex flex-col items-center w-full">
                        <input
                            type="text"
                            placeholder="Search for users"
                            className="py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 mb-4"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyPress={handleSearchKeyPress}
                        />
                        <div className="w-full bg-[#FFFFFF] rounded-md">
                            {searchResults.map(result => (
                                <ResultPreview key={result.id} result={result} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default FeedPage;
