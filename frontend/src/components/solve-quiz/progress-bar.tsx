import { Question } from "../../types/question";

export const ProgressBar = ({
  currentQuestion,
  questions,
  answers,
}: {
  currentQuestion: number;
  questions: Question[];
  answers: (string | undefined)[];
}) => {
  const answeredQuestionsCount = answers.filter(
    (answer) => answer !== undefined
  ).length;
  const progress = (answeredQuestionsCount / questions.length) * 100;
  return (
    <div className="flex items-center gap-4">
      <div className="w-full bg-white rounded-full h-2.5 mb-6">
        <div
          className="bg-violet-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h2 className="p-2 mb-4 font-semibold rounded-3xl text-nowrap bg-zinc-200">
        Question {currentQuestion + 1}/{questions.length}
      </h2>
    </div>
  );
};
