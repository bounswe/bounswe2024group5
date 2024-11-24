import { useState } from "react";
import { ForumReplyProps } from "../../types/forum-post";
import { IconHeart } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

const timePassed = (timeString: string) => {
  return dayjs(timeString).fromNow()
}

export const ForumReplyComponent = ({ reply }: ForumReplyProps) => {

    const [liked, setLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    const handleLikes = () => {
        setLikeCount(likeCount + (liked ? -1 : 1))
        setLiked(!liked);
    }

    return (
        <>
            <div className="w-full max-w-2xl h-fit bg-amber-100 text-left rounded-xl overflow-hidden shadow-md ">
                <div className="py-4 px-4">{reply.content}</div>
                <div className="px-4 py-1 pb-2 text-sm text-gray-500 flex justify-between items-center">
                    <div className="w-fit">
                        <span>{`@${reply.username} - ${timePassed(reply.createdAt)}`}</span>
                    </div>
                    <div className="w-fit flex items-center gap-4">
                        <div className="w-fit flex items-center gap-2">
                            <span className="cursor-pointer" onClick={handleLikes}>
                                <IconHeart className={cx("stroke-red-500", 
                                    {"fill-red-500": liked, "hover:fill-red-300 ": !liked}
                                )}></IconHeart>
                            </span>
                            <span >{likeCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}