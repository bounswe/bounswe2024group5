import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchPage() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        if (query) {
            setSearchQuery(query);
            handleSearch(query);
        }
    }, [location]);



    const mockResults = [
        { id: 1, name: "Adam Acker", imageURL: "ProfilePicture1.png" },
        { id: 2, name: "Jessie Jordan", imageURL: "ProfilePicture2.png" },
        { id: 3, name: "Kareem Kahil", imageURL: "ProfilePicture3.png" },
        { id: 4, name: "Glenn Garrison", imageURL: "ProfilePicture4.png" },
        { id: 5, name: "Melina Maxwell", imageURL: "ProfilePicture5.png" }
    ];

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value) {
            setSearchResults(mockResults);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearch = (query = searchQuery) => {
        console.log("Searching for:", query);
        setSearchResults(mockResults);
    };

    return (
        <div className="w-screen h-screen bg-[#0D1520] flex items-center justify-center">
            <div className="mt-4 flex flex-col w-1/4 max-w-4xl mx-auto">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search for users"
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
                <ul className="mt-4 bg-white shadow overflow-hidden rounded-md">
                    {searchResults.map(result => (
                        <li key={result.id} className="px-4 py-2 border-b border-gray-200 flex items-center last:border-b-0">
                            <img
                                src={result.imageURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-4"
                            />
                            {result.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchPage;
