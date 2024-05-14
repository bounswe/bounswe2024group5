import { FaPlus } from "react-icons/fa";
import { useState } from "react";

function CreatePostDialog({ isOpen, setIsOpen, addPost }) {

    const [textBody, setTextBody] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleTextBodyChange = (event) => {
        setTextBody(event.target.value);
    }

    const handlePost = () => {
        addPost({
            pp: "pp2.jpeg",
            username: "The Lumineers",
            when: "2 hours ago",
            textBody: textBody,
            imageURL: selectedImage ? URL.createObjectURL(selectedImage) : null,
        });
        setIsOpen(false);
        setTextBody("");
        setSelectedImage(null);
    }

    return (<>
        <div onClick={() => {setIsOpen(false)}} className={`w-screen h-screen bg-red-600 absolute bg-transparent \
        backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={(e) => {e.stopPropagation()}} className="w-[400px] p-4 pb-6 bg-[#0D2847] text-white border-2 border-[#777] border-solid rounded-xl">
                <p className="text-center pb-4 text-2xl font-medium">Create New Post</p>
                <textarea value={textBody} onChange={handleTextBodyChange} className="w-full h-[140px] bg-[#0D1520] px-3 py-2 resize-none outline-none rounded-lg no-scrollbar" placeholder="What's on your mind?"></textarea>
                { selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-[200px] object-cover mt-4 rounded-lg"/> }
                <div className="pt-4 flex justify-between">
                    <label htmlFor="imageInput" className="bg-[#2870BD] hover:bg-[#0090FF] transition-colors duration-300 pl-4 pr-4 py-2 rounded-md cursor-pointer">
                        <FaPlus className="inline-block mr-2"/>
                        <span className="font-medium">Add Image</span>
                        <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                    </label>
                    <button onClick={handlePost} className="bg-[#2870BD] hover:bg-[#0090FF] transition-colors duration-300 px-6 py-2 rounded-md cursor-pointer">Post</button>
                </div>
            </div>
        </div>
    </>);
}

export default CreatePostDialog