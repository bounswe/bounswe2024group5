import { useState } from "react";
import { ForumPostProps } from "../../types/forum-post";
import { IconHeart, IconMessageDots } from "@tabler/icons-react";
import { cx } from "class-variance-authority";

export const ForumPost = ({ title, content, upvote, username, createdAt }: ForumPostProps) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(upvote);

    const handleLikes = () => {
        setLikeCount(likeCount + (liked ? -1 : 1))
        setLiked(!liked);
    }

    return (
        <>
            <div className="w-full max-w-2xl h-fit bg-violet-200 text-left rounded-xl overflow-hidden shadow-md ">
                <div className="bg-violet-300 p-4">
                    <div className="text-xl font-medium">{title}</div>
                </div>
                <div className="py-4 px-4">{content}</div>
                <div className="px-4 py-1 pb-2 text-sm text-gray-500 flex justify-between items-center">
                    <div className="w-fit">
                        <span>{`@${username} - ${createdAt}`}</span>
                    </div>
                    <div className="w-fit flex items-center gap-4">
                        <div className="border-r border-r-gray-500 pr-4">
                            <span className="cursor-pointer">
                                <IconMessageDots className="stroke-red-500"></IconMessageDots>
                            </span>
                        </div>
                        <div className="w-fit flex items-center gap-2">
                            <span className="cursor-pointer" onClick={handleLikes}>
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