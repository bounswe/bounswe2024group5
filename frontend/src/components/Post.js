import { FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

function Post() {

    const [liked, setLiked] = useState(false);

     const toggleLike = () => {
        setLiked(!liked);
    }

    return (
        <>
            <div className="w-[400px] text-white bg-[#111927] border border-[#777] border-solid p-4 h-fit
            flex rounded-2xl">
                <img src="pp2.jpeg" alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <div className="ps-4">
                    <p className="font-bold pb-2 horizontal-break-after">
                        The Lumineers <span className="font-normal text-[#aaa]">- 6 Hours Ago</span>
                    </p>
                    <p className="pb-2">
                        Last night was a very special night for us. Thank you to everyone who came for our show in Istanbul
                    </p>
                    <img src="content.jpg" className="rounded-xl"></img>
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