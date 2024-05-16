import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import HostContext from "../HostContext";

function CreatePostDialog({ isOpen, setIsOpen, addPost }) {

    const [textBody, setTextBody] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [reqestError, setRequestError] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("")

    const hostURL = useContext(HostContext);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleTextBodyChange = (event) => {
        setTextBody(event.target.value);
    }

    const handleAddTag = () => {
        if (!tagInput) {
            return;
        }
        console.log("Adding tag: ", tagInput);
        setTags([...tags, tagInput]);
        setTagInput("");
    }

    const handleDeleteTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    }

    const handlePost = () => {
        /*
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
        */

        const requestBody = {
            text: textBody,
            tags: tags,
        }

        const token = sessionStorage.getItem("token");

        console.log("Posting with, ", token);
        const formData = new FormData();
        formData.append('file', selectedImage);
        fetch(`${hostURL}/api/file/upload`, {
            method: "POST",
            headers: {
                "Host": "localhost:80",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
        /*
        fetch(`${hostURL}/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": JSON.stringify(requestBody).length.toString(),
                "Host": "localhost:80",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody)
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            setTextBody("");
            setSelectedImage(null);
            setRequestError(false);
            setIsOpen(false);
        }).catch((error) => {
            console.log(error);
            setRequestError(true);
        });*/
    }

    return (<>
        <div onClick={() => {setIsOpen(false)}} className={`w-screen h-screen bg-red-600 absolute bg-transparent \
        backdrop-blur-[2px] flex items-center justify-center z-10 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={(e) => {e.stopPropagation()}} className="w-[400px] p-4 pb-6 bg-[#0D2847] text-white border-2 border-[#777] border-solid rounded-xl">
                <p className="text-center pb-4 text-2xl font-medium">Create New Post</p>
                {reqestError && <p className="text-center text-red-500 pb-6">Could not post.</p>}
                <textarea value={textBody} onChange={handleTextBodyChange} className="w-full h-[140px] bg-[#0D1520] px-3 py-2 resize-none outline-none rounded-lg no-scrollbar" placeholder="What's on your mind?"></textarea>
                { selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-[200px] object-cover mt-4 rounded-lg"/> }
                <div className="flex flex-wrap gap-2">
                        {tags && tags.map((tag, index) => <div key={index} className="text-white bg-[#0D1520] w-fit pl-4 pr-2 py-2 rounded-md flex gap-2 items-center"><span>#{tag}</span><button onClick={() => {handleDeleteTag(tag)}} className="bg-[#0D2847] hover:bg-[#103056] flex w-6 h-6 items-center justify-center rounded-full transition-colors duration-300 hover:cursor-pointer">x</button></div>)}
                </div>
                <div className="pt-2">
                    <input value={tagInput} onChange={(e) => {setTagInput(e.target.value)}} className="bg-[#0D1520] outline-none py-2 px-4 rounded-l-lg" placeholder="Tag a topic."></input>
                    <button onClick={handleAddTag} className="bg-[#2870BD] py-2 px-4 rounded-r-lg">Add Tag</button>
                </div>
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