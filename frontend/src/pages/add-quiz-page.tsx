import {
  IconCirclePlus,
  IconImageInPicture,
  IconUpload,
  IconPlus,
  IconLoader2,
} from "@tabler/icons-react";
import React, { useState, useRef } from "react";
import type { Quiz, Question, QuestionType } from "../types/question";
import { QuestionInputWithTemplate } from "../components/create-quiz/word-input-with-question-template";
import { useCreateQuiz } from "../hooks/api/create-quiz";
import { useNavigate } from "react-router-dom";
import { useUploadFile } from "../hooks/api/upload-image";

export const AddQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createQuiz } = useCreateQuiz();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const [quiz, setQuiz] = useState<Quiz>({
    id: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    difficulty: 1,
    image: "none",
    questions: [],
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = await uploadFile(file);
    console.log(imageUrl);
    setQuiz((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.floor(Math.random() * 1000),
      word: "",
      questionType: "english_to_turkish",
      correctAnswer: "",
      wrongAnswers: ["", "", ""],
      options: [],
      difficulty: 1,
    };

    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: [...prevQuiz.questions, newQuestion],
    }));
  };

  const updateQuestion = (
    id: number,
    field: keyof Question,
    value: unknown
  ) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  const updateWrongAnswer = (
    questionId: number,
    answerIndex: number,
    value: string
  ) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      questions: prevQuiz.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              wrongAnswers: q.wrongAnswers.map((ans, idx) =>
                idx === answerIndex ? value : ans
              ),
            }
          : q
      ),
    }));
  };

  const onSubmit = async () => {
    await createQuiz(quiz);
    navigate("/quizzes");
  };

  return (
    <div className="min-h-screen p-8 bg-purple-50 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-purple-800">
          Create a Quiz
        </h1>

        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div
              onClick={handleImageClick}
              className="relative flex items-center justify-center mr-6 bg-purple-200 rounded-lg cursor-pointer w-36 h-36 group"
            >
              {quiz.image === "none" ? (
                <>
                  <IconImageInPicture className="text-purple-500" size={32} />
                  <div className="absolute z-50 p-1 bg-white rounded-full shadow-md -bottom-3 -right-3">
                    <div className="p-1 bg-purple-500 rounded-full">
                      <IconPlus className="text-white" size={16} />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={quiz.image}
                  alt="Quiz cover"
                  className="object-cover w-full h-full rounded-lg"
                />
              )}

              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <IconLoader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100">
                  <IconUpload className="text-white" size={24} />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
              />
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

          <div className="place-self-start">
            <label className="block mb-1 text-sm font-medium text-purple-700 place-self-start">
              Difficulty
            </label>
            <select
              className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none w-36"
              value={quiz.difficulty}
              onChange={(e) =>
                setQuiz({ ...quiz, difficulty: Number(e.target.value) })
              }
            >
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Advanced</option>
            </select>
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
                value={question.questionType}
                onChange={(e) =>
                  updateQuestion(
                    question.id ?? 0,
                    "questionType",
                    e.target.value as QuestionType
                  )
                }
              >
                <option value="english_to_turkish">Eng -&gt; Tr</option>
                <option value="turkish_to_english">Tr -&gt; Eng</option>
                <option value="english_to_sense">Meaning</option>
              </select>
            </div>

            <QuestionInputWithTemplate
              word={question.word}
              questionType={question.questionType}
              onWordChange={(word) =>
                updateQuestion(question.id ?? 0, "word", word)
              }
            />

            <div className="mt-4">
              <input
                type="text"
                placeholder="Correct Answer"
                className="w-full p-2 mb-2 border-b border-purple-200 outline-none focus:border-purple-500"
                value={question.correctAnswer}
                onChange={(e) =>
                  updateQuestion(
                    question.id ?? 0,
                    "correctAnswer",
                    e.target.value
                  )
                }
              />
            </div>

            {question.wrongAnswers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center mb-2">
                <span className="mr-2 font-semibold text-purple-800">
                  Wrong Answer {answerIndex + 1}:
                </span>
                <input
                  type="text"
                  placeholder={`Wrong Answer ${answerIndex + 1}`}
                  className="flex-1 p-2 border-b border-purple-200 outline-none focus:border-purple-500"
                  value={answer}
                  onChange={(e) =>
                    updateWrongAnswer(
                      question.id ?? 0,
                      answerIndex,
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-purple-700">
                Question Difficulty
              </label>
              <input
                type="number"
                min="1"
                max="3"
                className="px-3 py-1 text-purple-800 bg-purple-100 rounded-md outline-none"
                value={question.difficulty}
                onChange={(e) =>
                  updateQuestion(
                    question.id ?? 0,
                    "difficulty",
                    Number(e.target.value)
                  )
                }
              />
            </div>
          </div>
        ))}

        <button
          onClick={addQuestion}
          className="flex items-center justify-center w-full p-4 mb-8 text-purple-800 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200"
        >
          <IconCirclePlus className="mr-2" />
          Add Question
        </button>

        <button
          onClick={onSubmit}
          className="w-full p-4 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};
