import { ForumPost } from "../../types/forum-post";
import { motion } from "framer-motion";
import { IconHeart, IconMessages } from "@tabler/icons-react";
import { timePassed } from "../../utils";
import { useFetchReplies } from "../../hooks/api/get-reply";
import { useNavigate } from "react-router-dom";

export const ForumPostCard = ({ post }: { post: ForumPost }) => {

  const navigate = useNavigate();

  const { data: replies } = useFetchReplies(post.id);
  return (
    <motion.div
      key={post.id}
      className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
      whileHover={{ scale: 1.01 }}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-purple-800 place-self-start">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 place-self-start">
            {timePassed(post.createdAt)}
          </p>
        </div>
        <div onClick={e => e.stopPropagation()} className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <IconHeart className="w-5 h-5 text-red-500" />
            <span>{post.noUpvote}</span>
          </div>
          |
          <div className="flex items-center gap-1">
            <IconMessages className="w-5 h-5 text-blue-500" />
            <span>{replies?.length ?? 0}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
