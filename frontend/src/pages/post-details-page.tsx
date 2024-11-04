import { useLocation } from "react-router-dom";
import { useFetchPost } from "../hooks/api/get-forum-post";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { ForumReplyComponent } from "../components/forum/ForumReply";

export const PostDetailsPage = () => {
    const currentPath = useLocation().pathname;

    const postId = currentPath.split("/").pop();

    const { data, isLoading } = useFetchPost(parseInt(postId || "0"));
    if (isLoading) return <p>Loading...</p>

    return (
        <>
            <div className="flex flex-col gap-8 mx-auto items-center">
                { data?.post?.map(mockPost => {
                    return <ForumPostComponent post={mockPost} />
                })}
                { data?.replies?.map(mockReply => {
                    return <ForumReplyComponent reply={mockReply} />
                })}
            </div>
        </>
    );
}