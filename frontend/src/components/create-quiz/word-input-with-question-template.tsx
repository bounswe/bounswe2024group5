import type { Question } from "../../types/question";

type QuestionInputWithTemplateProps = {
  word: Question["word"];
  type: Question["type"];
  onWordChange: (word: Question["word"]) => void;
};

export const QuestionInputWithTemplate = ({
  word,
  type,
  onWordChange,
}: QuestionInputWithTemplateProps) => {
  const [before, after] = getTemplate(type);

  return (
    <div className="mb-4">
      <div className="flex items-center">
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
    </div>
  );
};

const getTemplate = (type: Question["type"]) => {
  switch (type) {
    case "en-tr":
      return ["How do you say ", " in Turkish?"];
    case "tr-en":
      return ["How do you say ", " in English?"];
    case "meaning":
      return ["What is the meaning of ", "?"];
  }
};
