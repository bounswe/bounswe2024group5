import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchPage() {
    const location = useLocation(); // Hook to get location object
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Extract the search query from the URL query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        if (query) {
            setSearchQuery(query);
            handleSearch(query);  // Optionally perform the search immediately
        }
    }, [location]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = (query = searchQuery) => {
        console.log("Searching for:", query);

        fetch(`http://34.118.44.165/search?query=${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                console.log(response);
                return response.body;
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className="mt-4 flex flex-col w-1/4 max-w-4xl mx-auto">
            <div className="flex">
                <input
                    type="text"
                    placeholder="Search for songs, artists, etc."
                    className="py-2 px-4 w-full rounded-l-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button
                    className="bg-indigo-500 text-white py-2 px-4 rounded-r-md border border-indigo-500 hover:bg-indigo-600"
                    onClick={() => handleSearch()}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchPage;
