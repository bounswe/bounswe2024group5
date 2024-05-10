import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FeedPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <>
            <div>
                <h1 className="text-white text-6xl font-medium">Welcome to Melodify.</h1>
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search for songs, artists, etc."
                        className="py-2 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleLogout}
                        className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default FeedPage;
