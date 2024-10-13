import { Question } from "../../types/question";
import { cx } from "class-variance-authority";
export const QuizOverview = ({
  questions,
  currentQuestion,
  score,
  answers,
  handleNavigateToQuestion,
}: {
  questions: Question[];
  currentQuestion: number;
  score: number;
  answers: (string | undefined)[];
  handleNavigateToQuestion: (questionIndex: number) => void;
}) => {
  return (
    <div className="flex flex-col items-center w-1/4 p-4 rounded-xl bg-violet-50">
      <h3 className="mt-2 mb-4 text-xl font-semibold">Question Overview</h3>
      <div className="grid grid-cols-5 gap-4">
        {questions.map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => handleNavigateToQuestion(index)}
              className={cx(
                "w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer",
                getButtonColor({
                  questionIndex: index,
                  questions,
                  answers,
                }),
                index === currentQuestion && "border-4 border-violet-500"
              )}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl font-bold">
          Score: {score}/{questions.length}
        </p>
      </div>
    </div>
  );
};

const getButtonColor = ({
  questionIndex,

  questions,
  answers,
}: {
  questionIndex: number;

  questions: Question[];
  answers: (string | undefined)[];
}) => {
  const isQuestionAnswered = answers[questionIndex] !== undefined;
  const isAnswerCorrect =
    answers[questionIndex] === questions[questionIndex].answer;
  const isQuestionCorrectlyAnswered = isQuestionAnswered && isAnswerCorrect;

  if (!isQuestionAnswered) {
    return "bg-zinc-300 hover:bg-zinc-200";
  } else if (isQuestionCorrectlyAnswered) {
    return "bg-emerald-500 hover:bg-emerald-300";
  } else {
    return "bg-red-500 hover:bg-red-300";
  }
};
