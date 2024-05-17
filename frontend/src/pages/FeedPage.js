import { useEffect, useState } from "react";
import Post from "../components/Post";
import CreatePostDialog from "../components/CreatePostDialog";
import { FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import HostContext from "../HostContext";
import WikidataCard from "../components/WikidataCard";

/*
const mockPost = {
    pp: "pp2.jpeg",
    username: "The Lumineers",
    when: "2 hours ago",
    textBody: "Hey everyone! We're excited to announce our new album coming out next month. Stay tuned for more updates!",
    imageURL: "content.jpg",
}
*/

function FeedPage() {
    const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [tab, setTab] = useState("feed");
    const [searchResults, setSearchResults] = useState(null);

    const hostURL = useContext(HostContext);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        //console.log("Getting posts with token: ", token);

        fetch(`${hostURL}/api/posts`, {
            method: "GET",
            headers: {
                "Host": hostURL.split("://")[1],
                "Authorization": `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            setPosts(response);
        }).catch((error) => {
            console.error(error);
        });
    }, [hostURL]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    }

    const handleSearch = () => {
        const token = sessionStorage.getItem("token");
        const params = new URLSearchParams();
        params.append("query", searchInput);
        fetch(`${hostURL}/api/search?` + params.toString(), {
            method: "GET",
            headers: {
                "Host": hostURL.split("://")[1],
                "Authorization": `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setSearchResults(response);
            if (response.posts.length > 0)
                setTab("posts");
            else
                setTab("wikidata");
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="w-screen h-screen overflow-hidden bg-[#0D1520] flex items-center justify-center">
                <div className="flex w-[90%] h-full p-6 justify-center">
                    <Navbar></Navbar>
                    <div className="w-[400px] overflow-hidden h-full flex flex-col items-center gap-2">
                        <div className="text-white w-full flex mb-2">
                            <input 
                            placeholder="Search..." 
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="grow bg-[#0D2847]
                            font-sans placeholder:font-sans p-2 px-4 rounded-l-lg outline-none" />
                            <button
                            onClick={handleSearch}
                            className="text-white h-full p-2 px-4 bg-[#2870BD] rounded-r-lg font-medium hover:bg-[#0090FF] transition-colors duration-300"
                            >
                                Search
                            </button>
                        </div>
                        <div className="text-slate-300 flex w-full justify-around mb-2">
                            <div onClick={()=>{setTab("feed")}} className={`bg-[#0D2847] grow transition-colors duration-300 flex justify-center py-2 rounded-l-lg cursor-pointer ${tab === "feed" ? "active-tab": ""}`}>For You</div>
                            <div onClick={()=>{setTab("posts")}} className={`bg-[#0D2847] grow transition-colors duration-300 flex justify-center py-2 cursor-pointer ${tab === "posts" ? "active-tab": ""}`}>Related Posts</div>
                            <div onClick={()=>{setTab("wikidata")}} className={`bg-[#0D2847] grow transition-colors duration-300 flex justify-center py-2 rounded-r-lg cursor-pointer ${tab === "wikidata" ? "active-tab": ""}`}>Related Topics</div>
                        </div>
                        {tab === "feed" &&
                        <div className="w-full overflow-scroll flex flex-col items-center gap-2 no-scrollbar">
                            {posts && posts.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((post, index) => <Post key={index} postData={{id: post.id, username: post.author, textBody: post.text, tags: post.tags, createdAt: post.createdAt}}></Post>)}
                        </div>
                        }
                        {tab === "posts" &&
                        <div className="w-full overflow-scroll flex flex-col items-center gap-2 no-scrollbar">
                            {searchResults && searchResults.posts && searchResults.posts.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt))).map((post, index) => <Post key={index} postData={{id: post.id, username: post.author, textBody: post.text, tags: post.tags, createdAt: post.createdAt}}></Post>)}
                        </div>
                        }
                        {tab === "wikidata" && <div className="w-full flex flex-wrap gap-4">{searchResults && searchResults.wiki && searchResults.wiki.map((wikidata, index) => <WikidataCard key={index} wikidata={wikidata}></WikidataCard>)}</div>
                        }
                    </div>
                </div>
                <CreatePostDialog isOpen={createPostDialogOpen} setIsOpen={setCreatePostDialogOpen} addPost={addPost}></CreatePostDialog>
                <button onClick={() => setCreatePostDialogOpen(true)} className="fixed bottom-8 right-8 bg-[#2870BD] hover:bg-[#0090FF] text-white flex items-center transition-colors duration-300 pl-4 pr-6 py-2 rounded-md cursor-pointer"><FaPlus className="inline-block mr-2 z-0"></FaPlus>Create Post</button>
            </div>
        </>
    );
}

export default FeedPage;
