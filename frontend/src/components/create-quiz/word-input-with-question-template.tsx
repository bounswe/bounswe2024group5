import React, { useEffect, useRef, useState } from "react";
import type { Question } from "../../types/question";
import { useWordAutocomplete } from "../../hooks/api/autocomplete";

type QuestionInputWithTemplateProps = {
  word: Question["word"];
  questionType: Question["questionType"];
  onWordChange: (word: Question["word"]) => void;
};

const AutoCompleteOption = ({
  option,
  selectOption,
}: {
  option: string;
  selectOption: () => void;
}) => {
  return (
    <div
      onClick={selectOption}
      className="px-4 py-2 text-left border-b border-purple-200 cursor-pointer hover:bg-purple-50"
    >
      {option}
    </div>
  );
};

export const QuestionInputWithTemplate = ({
  word,
  questionType,
  onWordChange,
}: QuestionInputWithTemplateProps) => {
  const [before, after] = getTemplate(questionType);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState(word);
  const [debouncedInput, setDebouncedInput] = useState(word);

  const ref = useRef<HTMLDivElement | null>(null);

  // Determine language based on question type
  const language =
    questionType === "turkish_to_english" ? "turkish" : "english";

  const { data: suggestions, isLoading } = useWordAutocomplete(
    debouncedInput,
    language
  );

  // Update input value when word prop changes (e.g., from parent component)
  useEffect(() => {
    setInputValue(word);
  }, [word]);

  // Debounce input for API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOptionsOpen(false);
        // Reset input to last valid word if no suggestion was selected
        setInputValue(word);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [word]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setOptionsOpen(true);
  };

  const handleSelect = (selectedWord: string) => {
    onWordChange(selectedWord);
    setInputValue(selectedWord);
    setOptionsOpen(false);
  };

  const shouldShowOptions =
    optionsOpen && suggestions && suggestions.length > 0;

  return (
    <div className="flex items-center mb-4">
      <span className="text-purple-800">{before}</span>
      <span className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          onFocus={() => setOptionsOpen(true)}
          className={`p-1 mx-2 border-b-2 outline-none ${
            inputValue !== word
              ? "border-orange-300 bg-orange-50"
              : "border-purple-200 focus:border-purple-500"
          }`}
          placeholder="Enter word"
        />
        <div
          hidden={!shouldShowOptions}
          ref={ref}
          className="absolute z-10 w-full overflow-y-auto bg-white border border-purple-200 rounded-lg shadow-lg max-h-60 top-8"
        >
          {isLoading ? (
            <div className="px-4 py-2 text-gray-500">
              Loading suggestions...
            </div>
          ) : suggestions?.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No suggestions found</div>
          ) : (
            suggestions?.map((opt, index) => (
              <AutoCompleteOption
                key={`${opt}-${index}`}
                option={opt}
                selectOption={() => handleSelect(opt)}
              />
            ))
          )}
        </div>
      </span>
      <span className="text-purple-800">{after}</span>
      {inputValue !== word && (
        <div className="ml-2 text-xs text-red-600">
          Please select a word from the suggestions
        </div>
      )}
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
