import React, { useEffect, useRef, useState } from "react";
import type { Question } from "../../types/question";

type QuestionInputWithTemplateProps = {
  word: Question["word"];
  questionType: Question["questionType"];
  onWordChange: (word: Question["word"]) => void;
};

const AutoCompleteOption = ({ option, selectOption }: { option: string, selectOption: () => void }) => {

  return (
    <>
      <div onClick={() => {selectOption()}} className="py-2 px-4 border border-b-purple-200 cursor-pointer text-left">{option}</div>
    </>
  );
}

export const QuestionInputWithTemplate = ({
  word,
  questionType,
  onWordChange,
}: QuestionInputWithTemplateProps) => {
  const [before, after] = getTemplate(questionType);

  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>(["organ", "organic", "organism"]);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (ref.current && !ref.current.contains(target)) {
        setOptionsOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  useEffect(() => {
    const fetchSuggestion = async () => {
      console.log(`Fetching suggestions for ${word}`);
      if (word) setOptions([word, word+"sdf", word+"dslkfsdmfk"]);
    };

    const debounceTimeout = setTimeout(() => {
      fetchSuggestion();
    }, 300)

    return () => {
      clearTimeout(debounceTimeout);
    }

  }, [word]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onWordChange(e.target.value);
      if (e.target.value === "") {
        setOptionsOpen(false);
        setOptions([]);
      } else {
        setOptionsOpen(true);
      }
  }

  return (
    <div className="flex items-center mb-4">
      <span className="text-purple-800">{before}</span>
      <span className="relative">
        <input
          type="text"
          value={word}
          onChange={onChange}
          className="p-1 mx-2 border-b-2 border-purple-200 outline-none focus:border-purple-500"
          placeholder="Enter word"
        />
        <div hidden={!optionsOpen} ref={ref} className="absolute w-full h-fit top-8 bg-white border border-purple-200 rounded-lg">
          { options.map(opt => <AutoCompleteOption option={opt} selectOption={() => {onWordChange(opt); setOptionsOpen(false)}}/>)}
        </div>
      </span>
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
