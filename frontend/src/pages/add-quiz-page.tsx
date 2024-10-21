import { IconCirclePlus, IconImageInPicture } from "@tabler/icons-react";
import React, { useState } from "react";
import type { Quiz, Question } from "../types/question";
import { QuestionInputWithTemplate } from "../components/create-quiz/word-input-with-question-template";

export const AddQuizPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    id: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    level: "beginner",
    category: "colors",
    questionCount: 0,
    imageUrl: "/api/placeholder/250/250",
    highlighted: false,
    questions: [],
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.floor(Math.random() * 1000),
      word: "",
      type: "en-tr",
      options: ["", "", "", ""],
      answer: "",
    };

    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
      questionCount: prevQuiz.questionCount + 1,
    }));
  };

  const updateQuestion = (id: number, field: keyof Question, value: string) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  const updateOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      ),
    }));
  };

  return (
    <div className="min-h-screen p-8 bg-purple-50 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-purple-800">
          Create a Quiz
        </h1>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center mr-6 bg-purple-200 rounded-lg cursor-pointer w-36 h-36">
              <IconImageInPicture className="text-purple-500" size={32} />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Quiz Title"
                className="w-full p-2 mb-4 text-2xl font-semibold text-purple-900 border-b-2 border-purple-200 outline-none focus:border-purple-500"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              />
              <textarea
                placeholder="Quiz Description"
                className="w-full h-20 p-2 text-purple-700 border-2 border-purple-200 rounded-lg outline-none resize-none focus:border-purple-500"
                value={quiz.description}
                onChange={(e) =>
                  setQuiz({ ...quiz, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <label className="block mb-1 text-sm font-medium text-purple-700 place-self-start">
                Level
              </label>
              <select
                className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none w-36"
                value={quiz.level}
                onChange={(e) =>
                  setQuiz({ ...quiz, level: e.target.value as Quiz["level"] })
                }
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-purple-700 place-self-start">
                Category
              </label>
              <select
                className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none w-36 "
                value={quiz.category}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    category: e.target.value as Quiz["category"],
                  })
                }
              >
                <option value="fruits">Fruits</option>
                <option value="animals">Animals</option>
                <option value="colors">Colors</option>
                <option value="numbers">Numbers</option>
              </select>
            </div>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-semibold text-purple-800">
          Questions
        </h2>

        {quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="p-6 mb-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-800">
                Question {index + 1}
              </h3>
              <select
                className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none"
                value={question.type}
                onChange={(e) =>
                  updateQuestion(
                    question.id,
                    "type",
                    e.target.value as Question["type"]
                  )
                }
              >
                <option value="en-tr">Eng -&gt; Tr</option>
                <option value="tr-en">Tr -&gt; Eng</option>
                <option value="meaning">Meaning</option>
              </select>
            </div>

            <QuestionInputWithTemplate
              word={question.word}
              type={question.type}
              onWordChange={(word) => updateQuestion(question.id, "word", word)}
            />

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <span className="mr-2 font-semibold text-purple-800">
                  {String.fromCharCode(65 + optionIndex)})
                </span>
                <input
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  className="flex-1 p-2 border-b border-purple-200 outline-none focus:border-purple-500"
                  value={option}
                  onChange={(e) =>
                    updateOption(question.id, optionIndex, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-purple-700">
                Correct Answer
              </label>
              <select
                className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none"
                value={question.answer}
                onChange={(e) =>
                  updateQuestion(question.id, "answer", e.target.value)
                }
              >
                <option value="">Select correct answer</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="flex items-center justify-center w-full p-4 mb-8 text-purple-800 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200"
        >
          {<IconCirclePlus className="mr-2" />}
          Add Question
        </button>

        <button
          onClick={() => {
            alert("Quiz submitted successfully!");
          }}
          className="w-full p-4 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};
