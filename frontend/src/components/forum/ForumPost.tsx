import { ForumPostProps } from "../../types/forum-post";

export const ForumPost = ({ title, content, upvote, username }: ForumPostProps) => {
    return (
        <>
            <div className="w-full max-w-2xl h-fit bg-violet-200 text-left rounded-xl overflow-hidden shadow-md ">
                <div className="bg-violet-300 p-4">
                    <div className="text-xl font-medium">{title}</div>
                </div>
                <div className="py-4 px-4">{content}</div>
                <div className="px-4 py-1 pb-2 text-sm opacity-50 flex justify-between">
                    <span>{`@${username}`}</span>
                    <span>{`${upvote} likes`}</span>
                </div>
            </div>
        </>
    );
}