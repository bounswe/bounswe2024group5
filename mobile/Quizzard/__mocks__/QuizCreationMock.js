export const mockQuizData = {
  id: 1,
  title: 'Test Quiz',
  description: '',
  image: '/api/placeholder/250/250',
  questions: [{
    id: 1,
    questionType: 'multipleChoice',
    word: 'test word',
    correctAnswer: 'correct answer',
    wrongAnswers: ['wrong1', 'wrong2', 'wrong3']
  }]
};

export const mockAnswerSuggestions = {
  correctAnswerSuggestions: ['correct answer'],
  wrongAnswerSuggestions: ['wrong1', 'wrong2', 'wrong3']
};

export const mockQuestionTypes = [
  { label: 'Multiple Choice', value: 'multipleChoice' }
];

export const initialQuestionState = {
  word: '',
  options: { A: '', B: '', C: '', D: '' },
  questionType: 'multipleChoice',
  wordSuggestions: [],
  showWordSuggestions: false,
  isLoadingWordSuggestions: false,
  answerSuggestions: [],
  showAnswerSuggestions: false,
  isLoadingAnswerSuggestions: false
};
