import type { Question } from "../../types/question";

type QuestionInputWithTemplateProps = {
  word: Question["word"];
  questionType: Question["questionType"];
  onWordChange: (word: Question["word"]) => void;
};

export const QuestionInputWithTemplate = ({
  word,
  questionType,
  onWordChange,
}: QuestionInputWithTemplateProps) => {
  const [before, after] = getTemplate(questionType);

  return (
    <div className="flex items-center mb-4">
      <span className="text-purple-800">{before}</span>
      <input
        type="text"
        value={word}
        onChange={(e) => onWordChange(e.target.value)}
        className="p-1 mx-2 border-b-2 border-purple-200 outline-none focus:border-purple-500"
        placeholder="Enter word"
      />
      <span className="text-purple-800">{after}</span>
    </div>
  );
};

const getTemplate = (questionType: Question["questionType"]) => {
  switch (questionType) {
    case "english_to_turkish":
      return ["How do you say ", " in Turkish?"];
    case "turkish_to_english":
      return ["How do you say ", " in English?"];
    case "english_to_sense":
      return ["What is the meaning of ", "?"];
  }
};
