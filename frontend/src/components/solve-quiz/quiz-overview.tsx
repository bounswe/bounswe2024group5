import { Question } from "../../types/question";

export const QuizOverview = ({
  questions,
  currentQuestion,
  score,
  answers,
}: {
  questions: Question[];
  currentQuestion: number;
  score: number;
  answers: boolean[];
}) => {
  return (
    <div className="flex flex-col items-center w-1/4 p-4 rounded-xl bg-violet-50">
      <h3 className="mt-2 mb-4 text-xl font-semibold">Question Overview</h3>
      <div className="grid grid-cols-5 gap-4">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
              index === currentQuestion
                ? "bg-violet-500"
                : index < answers.length
                ? answers[index]
                  ? "bg-emerald-500"
                  : "bg-red-500"
                : "bg-zinc-300"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-bold">
          Score: {score}/{questions.length}
        </p>
      </div>
    </div>
  );
};
