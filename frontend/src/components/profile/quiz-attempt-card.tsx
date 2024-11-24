import { QuizAttempt } from "../../hooks/api/attempts/list";
import { motion } from "framer-motion";
import { useGetQuiz } from "../../hooks/api/quizzes/get";
import { CompletedBadge } from "../badges/completed";
import { InProgressBadge } from "../badges/in-progress";

export const QuizAttemptCard = ({ attempt }: { attempt: QuizAttempt }) => {
  const { data: quiz, isLoading, refetch } = useGetQuiz(attempt.quizId);
  console.log(quiz, attempt.quizId);
  if (isLoading || !quiz) {
    refetch();
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <motion.div
      key={attempt.id}
      className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-purple-800 place-self-start">
            {quiz.title}
          </h3>
          <p className="text-sm text-gray-600 place-self-start">
            {quiz.createdAt}
          </p>
        </div>

        {attempt.completed ? <CompletedBadge /> : <InProgressBadge />}
      </div>
    </motion.div>
  );
};
