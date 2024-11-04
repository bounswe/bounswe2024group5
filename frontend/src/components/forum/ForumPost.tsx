import { useState } from "react";
import { ForumPostProps } from "../../types/forum-post";
import { IconHeart, IconMessageDots } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { useLocation, useNavigate } from "react-router-dom";

export const ForumPostComponent = ({ post }: ForumPostProps) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(post.upvote);

    const navigate = useNavigate()
    const currentPath = useLocation().pathname;

    const handleLikes = (e: React.MouseEvent) => {
        e.stopPropagation()
        setLikeCount(likeCount + (liked ? -1 : 1))
        setLiked(!liked);
    }

    const handleClick = () => {
        if (currentPath.split("/").pop() === "forum") {
            navigate(`/post/${post.id}`)
        }
    }

    return (
        <>
            <div onClick={handleClick} className="w-full max-w-2xl h-fit bg-violet-200 text-left rounded-xl overflow-hidden shadow-md cursor-pointer">
                <div className="bg-violet-300 p-4">
                    <div className="text-xl font-medium">{post.title}</div>
                </div>
                <div className="py-4 px-4">{post.content}</div>
                <div className="px-4 py-1 pb-2 text-sm text-gray-500 flex justify-between items-center">
                    <div className="w-fit">
                        <span>{`@${post.username} - ${post.createdAt}`}</span>
                    </div>
                    <div className="w-fit flex items-center gap-4">
                        <div className="border-r border-r-gray-500 pr-4">
                            <span className="cursor-pointer">
                                <IconMessageDots className="stroke-red-500"></IconMessageDots>
                            </span>
                        </div>
                        <div className="w-fit flex items-center gap-2" onClick={handleLikes}>
                            <span className="cursor-pointer">
                                <IconHeart className={cx("stroke-red-500", 
                                    {"fill-red-500": liked, "hover:fill-red-300 ": !liked}
                                )}></IconHeart>
                            </span>
                            <span>{likeCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}