import { useLocation } from "react-router-dom";
import { useFetchPost } from "../hooks/api/get-forum-post";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { ForumReplyComponent } from "../components/forum/ForumReply";
import { CreateReplyComponent } from "../components/forum/CreateReply";
import { useState } from "react";

export const PostDetailsPage = () => {

    const [replyComponent, setReplyComponent] = useState<boolean>(false);

    const currentPath = useLocation().pathname;

    const postId = currentPath.split("/").pop();

    const { data, isLoading } = useFetchPost(parseInt(postId || "0"));
    if (isLoading) return <p>Loading...</p>

    const closeReplyComponent = () => {
        setReplyComponent(false)
    }

    const openReplyComponent = () => {
        setReplyComponent(true)
    }

    const sendReply = () => {
        alert("Your replies is sent.")
        setReplyComponent(false)
    }

    return (
        <>
            <div className="flex flex-col gap-8 mx-auto items-center">
                { data?.post?.map(mockPost => {
                    return <ForumPostComponent post={mockPost}/>
                })}
                { !replyComponent && 
                    <div className="w-full max-w-2xl h-fit flex justify-end">
                        <button onClick={openReplyComponent} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Reply</button>
                    </div>
                }
                { replyComponent &&  <CreateReplyComponent close={closeReplyComponent} send={sendReply} />}
                { data?.replies?.map(mockReply => {
                    return <ForumReplyComponent reply={mockReply} />
                })}
            </div>
        </>
    );
}