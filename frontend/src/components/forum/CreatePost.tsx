import { useRef, useState, useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useCreatePost } from "../../hooks/api/create-post";
import { useWordAutocomplete } from "../../hooks/api/autocomplete";

const TagComponent = ({
  word,
  removeSelf,
}: {
  word: string;
  removeSelf: () => void;
}) => {
  return (
    <div className="flex items-center gap-4 py-1 pl-4 pr-1 text-white rounded-full w-fit bg-violet-400">
      <span>{word}</span>
      <span
        onClick={removeSelf}
        className="flex items-center justify-center p-1 rounded-full cursor-pointer bg-violet-200 w-fit h-fit"
      >
        <IconX size={16} />
      </span>
    </div>
  );
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
      className="px-4 py-2 text-left cursor-pointer hover:bg-violet-100"
    >
      {option}
    </div>
  );
};

export const CreateaPostComponent = ({ close }: { close: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: createPost } = useCreatePost();

  // Use the autocomplete hook for both English and Turkish words
  const { data: englishSuggestions, isLoading: isLoadingEnglish } =
    useWordAutocomplete(tagInput, "english");
  const { data: turkishSuggestions, isLoading: isLoadingTurkish } =
    useWordAutocomplete(tagInput, "turkish");

  // Combine suggestions from both languages
  const suggestions = [
    ...(englishSuggestions || []),
    ...(turkishSuggestions || []),
  ].filter(
    // Filter out already added tags
    (suggestion) => !tags.includes(suggestion)
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput && suggestions.includes(tagInput)) {
      addTag(tagInput);
    }
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
      setShowSuggestions(false);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const sendPost = async () => {
    if (title === "") {
      alert("Please enter a title for this post.");
      return;
    }
    if (content === "") {
      alert("Please enter the content of this post.");
      return;
    }
    if (tags.length === 0) {
      alert(
        "Please enter at least one tag. This is necessary to help other users who might also be confused about this word find this post easier."
      );
      return;
    }

    await createPost({
      title: title,
      content: content,
      tags: tags,
    });

    close();
  };

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-2xl gap-4 p-4 bg-violet-200 rounded-xl">
      <div>
        <input
          type="text"
          placeholder="Enter title."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 text-xl font-medium border-2 border-transparent rounded-lg outline-none bg-violet-100 focus:border-violet-600"
        />
      </div>
      <div>
        <textarea
          placeholder="Enter content."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border-2 border-transparent rounded-lg outline-none min-h-48 bg-violet-100 focus:border-violet-600"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Which words are relevant to this post?"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="w-full p-2 border-2 border-transparent rounded-lg outline-none bg-violet-100 focus:border-violet-600"
        />
        {showSuggestions &&
          (tagInput || isLoadingEnglish || isLoadingTurkish) && (
            <div
              ref={suggestionsRef}
              className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border rounded-lg shadow-lg border-violet-300 max-h-60"
            >
              {isLoadingEnglish || isLoadingTurkish ? (
                <div className="px-4 py-2 text-gray-500">
                  Loading suggestions...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                  <AutoCompleteOption
                    key={`${suggestion}-${index}`}
                    option={suggestion}
                    selectOption={() => addTag(suggestion)}
                  />
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        <div className="flex flex-wrap gap-1 py-3">
          {tags.map((tag, index) => (
            <TagComponent
              key={`${tag}-${index}`}
              word={tag}
              removeSelf={() => removeTag(tag)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={close}
          className="p-2 px-8 text-white rounded-lg bg-violet-600"
        >
          Discard
        </button>
        <button
          onClick={sendPost}
          className="p-2 px-8 text-white rounded-lg bg-violet-600"
        >
          Send Post
        </button>
      </div>
    </div>
  );
};
