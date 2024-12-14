import { FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useContext } from "react";
import HostContext from "../HostContext";

function Post({postData}) {

    const [liked, setLiked] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const hostURL = useContext(HostContext);

     const toggleLike = () => {
        setLiked(!liked);
    } 

    const dateFormat = (date) => {
        const diff = new Date() - new Date(date);
        const seconds = (diff / 1000) - 10800;
        if (seconds < 60) {
            return `${Math.floor(seconds)}s ago`;
        }
        const minutes = seconds / 60;
        if (minutes < 60) {
            return `${Math.floor(minutes)}m ago`;
        }
        const hours = minutes / 60;
        if (hours < 24) {
            return `${Math.floor(hours)}h ago`;
        }
        const days = hours / 24;
        if (days < 7) {
            return `${Math.floor(days)}d ago`;
        }
        const weeks = days / 7;
        if (weeks < 4) {
            return `${Math.floor(weeks)}w ago`;
        }
        const months = days / 30;
        if (months < 12) {
            return `${Math.floor(months)}mo ago`;
        }
        const years = months / 12;
        return `${Math.floor(years)}y ago`;
    }

    const handleDelete = () => {
        const token = localStorage.getItem("token");
        fetch(`${hostURL}/api/posts/${postData.id}`, {
            method: "DELETE",
            headers: {
                "Host": hostURL.split("://")[1],
                "Authorization": `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        }).then((response) => {
            console.log(response);
            setDialogOpen(false);
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <>
            <div className="w-[400px] relative text-white bg-[#090d14] rounded-2xl p-4 pr-6 h-fit
            flex">
                {dialogOpen && <div onClick={handleDelete} className="w-[100px] hover:bg-[#111b29] transition-colors duration-300 text-red-500 text-center hover:cursor-pointer bg-[#0D1520] absolute top-3 right-14 px-4 py-2 rounded-lg z-10">
                    <div>Delete</div>
                </div>}
                <img src={"pp-generic.png"} alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <div className="ps-4 grow">
                    <div className="flex items-center justify-between pb-2">
                        <p className="font-medium horizontal-break-after grow">
                            {postData.username} <span className="font-normal text-[#aaa]">- {dateFormat(postData.createdAt)}</span>
                        </p>
                        <div onClick={() => {setDialogOpen(!dialogOpen)}} className="flex w-8 h-8 transition-colors duration-300 hover:bg-[#0D1520] items-center justify-center rounded-full hover:cursor-pointer">
                            <BsThreeDotsVertical></BsThreeDotsVertical>
                        </div>
                    </div>
                    <p className="pb-2">
                        {postData.textBody}
                    </p>
                    {postData && postData.imageURL && <img src={postData.imageURL} alt="Post Content" className="rounded-xl"></img>}
                    <div className="flex flex-wrap gap-2">
                        {postData.tags && postData.tags.map((tag, index) => <div key={index} className="text-white bg-[#0D2847] w-fit px-3 py-1 rounded-md">#{tag}</div>)}
                    </div>
                    <div className="flex justify-start px-2 pt-3 gap-8">
                        <div className="pr-2" onClick={toggleLike}>
                            {liked ? 
                            <FaHeart size={18} className="text-[#ff0000ce] cursor-pointer"></FaHeart> :
                            <FaRegHeart size={18} className="text-[#777] cursor-pointer"/>
                            }
                        </div>
                        <FaRegComment size={18} className="text-[#777] cursor-pointer"/>
                        <FaShareAlt size={16} className="text-[#777] cursor-pointer"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;