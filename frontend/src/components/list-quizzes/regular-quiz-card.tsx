import { Quiz } from "../../types/question";
import { motion } from "framer-motion";

export const RegularQuizCard = ({ quiz }: { quiz: Quiz }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="flex overflow-hidden bg-purple-100 shadow-md cursor-pointer rounded-3xl "
  >
    <div className="w-[200px] h-[200px] rounded-3xl bg-white m-2" />
    <div className="flex flex-col justify-between flex-grow p-4">
      <div>
        <h3 className="mb-2 text-xl font-bold text-purple-800">{quiz.title}</h3>
        <p className="mb-4 text-gray-600">{quiz.description}</p>
      </div>
      <div>
        <motion.div
          className="flex items-center justify-between mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.span
            className={`px-2 py-1 rounded-full text-sm font-semibold 
              ${
                quiz.level === "beginner"
                  ? "bg-green-200 text-green-800"
                  : quiz.level === "intermediate"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            whileHover={{ scale: 1.1 }}
          >
            {quiz.level}
          </motion.span>
          <motion.span
            className="px-2 py-1 text-sm font-semibold text-purple-800 bg-purple-200 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            {quiz.category}
          </motion.span>
        </motion.div>
        <p className="text-sm text-gray-600">{quiz.questionCount} questions</p>
      </div>
    </div>
  </motion.div>
);
