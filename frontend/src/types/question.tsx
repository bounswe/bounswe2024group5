export type QuestionType =
  | "english_to_turkish"
  | "turkish_to_english"
  | "english_to_sense";

export type Question = {
  id?: number;
  quizId?: number;
  word: string;
  questionType: QuestionType;
  options: string[];
  wrongAnswers: string[];
  correctAnswer: string;
  difficulty: number;
};

export type Quiz = {
  id?: number;
  username?: string;
  title: string;
  description: string;
  difficulty: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;

  questions: Question[];
};
