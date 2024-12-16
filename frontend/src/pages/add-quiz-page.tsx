import {
  IconCirclePlus,
  IconImageInPicture,
  IconUpload,
  IconPlus,
  IconLoader2,
  IconSparkles,
  IconWand,
} from "@tabler/icons-react";
import React, { useState, useRef, useEffect } from "react";
import type { Quiz, Question, QuestionType } from "../types/question";
import { QuestionInputWithTemplate } from "../components/create-quiz/word-input-with-question-template";
import { useCreateQuiz } from "../hooks/api/create-quiz";
import { useNavigate, useParams } from "react-router-dom";
import { useUploadFile } from "../hooks/api/upload-image";

import { useAnswerSuggestions } from "../hooks/api/questions-answers/get-suggestions";

import { useGetQuiz } from "../hooks/api/quizzes/get";
import { useUpdateQuiz } from "../hooks/api/quizzes/update";
import { useCreateQuizFromFavorites } from "../hooks/api/quizzes/from-favorites";
import { useFetchQuestionFavorites } from "../hooks/api/question-favorite/get-question-favorite";


export const AddQuizPage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: createQuiz } = useCreateQuiz();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const [showMagicEffect, setShowMagicEffect] = useState<number | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<{
    id: number;
    word: string;
    questionType: QuestionType;
  } | null>(null);

  const { data: suggestions, isFetched } = useAnswerSuggestions({
    word: pendingQuestion?.word ?? "",
    questionType: pendingQuestion?.questionType ?? "english_to_turkish",
    enabled: !!pendingQuestion,
  });

  const [quiz, setQuiz] = useState<Quiz>({
    id: Math.floor(Math.random() * 1000),
    title: "",
    description: "",
    difficulty: 1,
    image: "none",
    questions: [],
  });


  useEffect(() => {
    if (isFetched && suggestions && pendingQuestion) {
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        questions: prevQuiz.questions.map((q) =>
          q.id === pendingQuestion.id
            ? {
                ...q,
                correctAnswer: suggestions.correctAnswerSuggestions[0] || "",
                wrongAnswers: [
                  suggestions.wrongAnswerSuggestions[0] || "",
                  suggestions.wrongAnswerSuggestions[1] || "",
                  suggestions.wrongAnswerSuggestions[2] || "",
                ],
              }
            : q
        ),
      }));
      setPendingQuestion(null);
    }
  }, [suggestions, isFetched, pendingQuestion]);

  const quizIdParam = useParams().quizId;
  const quizId = quizIdParam ? parseInt(quizIdParam) : undefined;
  const { data: quizData } = useGetQuiz(quizId);

  const { mutateAsync: updateQuiz } = useUpdateQuiz();
  const { data: favoriteQuestions } = useFetchQuestionFavorites();
  const { mutateAsync: createQuizFromFavorites } = useCreateQuizFromFavorites();

  useEffect(() => {
    if (quizData) {
      setQuiz(quizData);
    }
  }, [quizData]);

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

  const handleAutoFill = (questionId: number) => {
    const question = quiz.questions.find((q) => q.id === questionId);
    if (!question?.word) return;

    setShowMagicEffect(questionId);
    setTimeout(() => setShowMagicEffect(null), 1500);

    setPendingQuestion({
      id: questionId,
      word: question.word,
      questionType: question.questionType,
    });
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
    if (!quizId) {
      console.log("Creating new quiz...");
      await createQuiz(quiz);
    } else {
      // Update quiz
      console.log("Updating quiz...");
      await updateQuiz(quiz);
    }
    navigate("/quizzes");
  };

  const handleFromFavorites = async () => {
    await createQuizFromFavorites({ title: quiz.title || "My Favorites", count: favoriteQuestions?.length || 0 });
    navigate("/quizzes");
  }

  return (
    <div className="min-h-screen p-8 bg-purple-50 rounded-3xl">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-purple-800">
          {!quizId ? "Create a Quiz" : "Edit Quiz" }
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
        </div>

        { !quizId && 
        <h2 className="mb-4 text-2xl font-semibold text-purple-800">
          Questions
        </h2>
        }

        {!quizId && quiz.questions.map((question, index) => (
          <div
            key={question.id}
            className="p-6 mb-6 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-purple-800">
                Question {index + 1}
              </h3>
              <div className="flex items-center gap-2">
                {question.word && (
                  <button
                    onClick={() => handleAutoFill(question.id as number)}
                    className="flex items-center gap-2 px-3 py-1 transition-all rounded-md text-emerald-800 bg-emerald-100 hover:bg-emerald-200"
                  >
                    {showMagicEffect === question.id ? (
                      <IconSparkles className="animate-spin" size={20} />
                    ) : (
                      <IconWand size={20} />
                    )}
                    Auto-fill Answers
                  </button>
                )}
                <select
                  className="px-3 py-1.5 text-purple-800 bg-purple-100 rounded-md outline-none cursor-pointer hover:bg-purple-200 transition-all"
                  value={question.questionType}
                  onChange={(e) =>
                    updateQuestion(
                      question.id as number,
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
          </div>
        ))}

        { !quizId &&
          <button
          onClick={addQuestion}
          className="flex items-center justify-center w-full p-4 mb-8 text-purple-800 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200"
          >
          <IconCirclePlus className="mr-2" />
          Add Question
        </button>
        }

        <button
          onClick={onSubmit}
          className="w-full p-4 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          {!quizId ? "Submit Quiz" : "Update Quiz"}
        </button>

        { !quizId && (
          <button onClick={handleFromFavorites} className="w-full p-4 mt-4 text-purple-800 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200">
            Create new quiz from favorited questions.
          </button>
        )}
      </div>
    </div>
  );
};
