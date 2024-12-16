import React, { useState, useRef, useEffect } from "react";

export const CorrectAnswerInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  onSelect: (value: string) => void;
  questionId: number;
  onActivate: (questionId: number) => void; // Add this prop
}> = ({ value, onChange, suggestions, onSelect, questionId, onActivate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsOpen(true);
    onActivate(questionId);
  };

  return (
    <div className="relative" ref={ref}>
      <input
        type="text"
        placeholder="Correct Answer"
        className="w-full p-2 mb-2 border-b border-purple-200 outline-none focus:border-purple-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
      />
      {isOpen && suggestions?.length > 0 && (
        <div className="absolute z-10 w-full overflow-y-auto bg-white border border-purple-200 rounded-lg shadow-lg max-h-60">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="px-4 py-2 text-left border-b border-purple-200 cursor-pointer hover:bg-purple-50"
              onClick={() => {
                onSelect(suggestion);
                setIsOpen(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
