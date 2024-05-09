import { FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

function Post({postData}) {

    const [liked, setLiked] = useState(false);

     const toggleLike = () => {
        setLiked(!liked);
    }

    return (
        <>
            <div className="w-[400px] text-white bg-[#111927] border border-[#777] border-solid p-4 pr-6 h-fit
            flex border-b-0">
                <img src={postData.pp} alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <div className="ps-4 grow">
                    <p className="font-bold pb-2 horizontal-break-after">
                        {postData.username} <span className="font-normal text-[#aaa]">- {postData.when}</span>
                    </p>
                    <p className="pb-2">
                        {postData.textBody}
                    </p>
                    {postData && postData.imageURL && <img src={postData.imageURL} className="rounded-xl"></img>}
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