import { useState } from "react";
import { useFetchPost } from "../../hooks/api/get-forum-post";
import { ForumPostComponent } from "../forum/ForumPost";
import { useFetchReplies } from "../../hooks/api/get-reply";
import { ForumReplyComponent } from "../forum/ForumReply";
import { useSearchPosts } from "../../hooks/api/search-forum";

export const ForumForQuizSolvePage = ({ word } : { word: string }) => {

    const { data: posts } = useSearchPosts({ keyword : word });
    const [open, setOpen] = useState<boolean>(false);
    const [postId, setPostId] = useState<number | null>(null);
    const { data: post } = useFetchPost(postId);
    const { data: replies } = useFetchReplies(postId);

    const toggleOpen = () => {
        setOpen(!open);
    }
    
    const handleGoBackButton = () => {
        setPostId(null);
    }

    return (
        <>
            <div className="bg-violet-100 mt-8 rounded-lg px-8 py-4">
                <div className="text-left">
                    <button onClick={toggleOpen} className="underline">{!open ? 'See' : 'Hide'} posts related to '{word}'.</button>
                </div>
                { open && !postId &&
                    <div className="mt-4 pb-4 flex flex-col gap-6 max-h-screen overflow-y-scroll">
                        { posts && posts.map( post => <ForumPostComponent postId={post.id} setPostId={setPostId}/> ) }
                    </div> 
                }
                { open && postId && 
                    <div>
                        { post && 
                            <div className="py-4">
                                <div className="text-left py-2">
                                    <button onClick={handleGoBackButton} className="underline ">Go back.</button>
                                </div>
                                <ForumPostComponent postId={postId} setPostId={setPostId}/>
                                { replies && <div className="flex flex-col gap-4 pt-4">
                                    { replies.map( reply => <ForumReplyComponent reply={reply} /> ) }
                                </div>}
                            </div> 
                        }
                    </div>
                }
            </div>
        </>
    );
}