export const QuizResult = ({
  score,
  questionCount,
}: {
  score: number;
  questionCount: number;
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center p-6 rounded-xl bg-violet-50">
        <h1 className="text-4xl font-bold">Quiz Finished!</h1>
        <p className="mt-4 text-lg">
          You scored {score} out of {questionCount}
        </p>
      </div>
    </div>
  );
};
