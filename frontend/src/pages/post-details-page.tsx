import { useLocation } from "react-router-dom";
import { useFetchPost } from "../hooks/api/get-forum-post";
import { ForumPostComponent } from "../components/forum/ForumPost";
import { ForumReplyComponent } from "../components/forum/ForumReply";
import { CreateReplyComponent } from "../components/forum/CreateReply";
import { useState } from "react";
import { useFetchReplies } from "../hooks/api/get-reply";
import { useCreateReply } from "../hooks/api/create-reply";

export const PostDetailsPage = () => {

    const [replyComponent, setReplyComponent] = useState<boolean>(false);

    const currentPath = useLocation().pathname;

    const postId = parseInt(currentPath.split("/").pop() || "0");

    const { data: post, isLoading } = useFetchPost(postId);
    const { data: replies } = useFetchReplies(postId);
    
    console.log(replies)

    const { mutateAsync: createReply } = useCreateReply(postId);

    if (isLoading) return <p>Loading...</p>

    const closeReplyComponent = () => {
        setReplyComponent(false)
    }

    const openReplyComponent = () => {
        setReplyComponent(true)
    }

    const sendReply = ( payload: { content: string}) => {
        createReply(payload)
        setReplyComponent(false)
    }

    return (
        <>
            <div className="flex flex-col gap-8 mx-auto items-center">
                { post && <ForumPostComponent postId={post.id}/>
                }
                { !replyComponent && 
                    <div className="w-full max-w-2xl h-fit flex justify-end">
                        <button onClick={openReplyComponent} className="bg-violet-600 text-white p-2 px-8 rounded-lg">Reply</button>
                    </div>
                }
                { replyComponent &&  <CreateReplyComponent close={closeReplyComponent} send={sendReply} />}
                { replies && replies.map(reply => {
                    return <ForumReplyComponent reply={reply} />
                })}
            </div>
        </>
    );
}