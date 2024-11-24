import { useContext, useEffect, useState } from "react";
import { ForumPostProps } from "../../types/forum-post";
import { IconHeart } from "@tabler/icons-react";
import { cx } from "class-variance-authority";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useFetchPost } from "../../hooks/api/get-forum-post";
import HostContext from "../../HostContext";
import { useCreateUpvote } from "../../hooks/api/create-upvote";
import { useDeleteUpvote } from "../../hooks/api/delete-upvote";

dayjs.extend(relativeTime)

const timePassed = (timeString: string) => {
  return dayjs(timeString).fromNow()
}

export const ForumPostComponent = ({ postId }: ForumPostProps) => {

    const { data: post } = useFetchPost(postId);

    const [liked, setLiked] = useState<boolean>(false);

    const hostUrl = useContext(HostContext);

    useEffect(() => {
        const TOKEN = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');
        const fetchUpvote = async () => {
            const response = await fetch(`${hostUrl}/api/posts/${postId}/upvotes?username=${username}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            });

            if (!response.ok) return;

            const body = await response.json();

            setLiked(Array.isArray(body) && body.length > 0);
            
        }
        fetchUpvote();
    }, [hostUrl, postId])

    const navigate = useNavigate()
    const currentPath = useLocation().pathname;

    const { mutateAsync: createUpvote } = useCreateUpvote(postId);
    const { mutateAsync: deleteUpvote } = useDeleteUpvote(postId);

    const handleLikes = async (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!liked) {
            await createUpvote();
        } else {
            await deleteUpvote();
        }
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