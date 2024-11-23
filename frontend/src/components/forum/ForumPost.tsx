import { useState } from "react";
import { ForumPostProps } from "../../types/forum-post";
import { IconHeart } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFetchPost } from "../../hooks/api/get-forum-post";

dayjs.extend(relativeTime)

const timePassed = (timeString: string) => {
  return dayjs(timeString).fromNow()
}

export const ForumPostComponent = ({ postId }: ForumPostProps) => {

    const { data: post } = useFetchPost(postId);

    const [liked, setLiked] = useState<boolean>(false);

    const navigate = useNavigate()
    const currentPath = useLocation().pathname;

    const handleLikes = (e: React.MouseEvent) => {
        e.stopPropagation()
        setLiked(!liked);
    }

    const handleClick = () => {
        if (post && currentPath.split("/").pop() === "forum") {
            navigate(`/post/${post.id}`)
        }
    }

    return (
        <>
            <div onClick={handleClick} className="w-full max-w-2xl h-fit bg-violet-200 text-left rounded-xl overflow-hidden shadow-md cursor-pointer">
                <div className="bg-violet-300 p-4">
                    <div className="text-xl font-medium">{post?.title}</div>
                </div>
                <div className="py-4 px-4">{post?.content}</div>
                <div className="px-4 py-1 pb-2 text-sm text-gray-500 flex justify-between items-center">
                    <div className="w-fit">
                        <span>{`@${post?.username || "quizzarduser"} - ${timePassed(post?.createdAt || "")}`}</span>
                    </div>
                    <div className="w-fit flex items-center gap-4">
                        <div className="w-fit flex items-center gap-2" onClick={handleLikes}>
                            <span className="cursor-pointer">
                                <IconHeart className={cx("stroke-red-500", 
                                    {"fill-red-500": liked, "hover:fill-red-300 ": !liked}
                                )}></IconHeart>
                            </span>
                            <span>{post?.noUpvote}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}