export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export type Quiz = {
  id: number;
  name: string;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: 1,
    name: "Basic English Vocabulary",
    questions: [
      {
        id: 101,
        question: "What is the opposite of 'hot'?",
        options: ["Cold", "Warm", "Freezing", "Cool"],
        answer: "Cold",
      },
      {
        id: 102,
        question: "Which word means 'a place to live'?",
        options: ["Car", "House", "Shoe", "Book"],
        answer: "House",
      },
      {
        id: 103,
        question: "What is a synonym for 'happy'?",
        options: ["Sad", "Angry", "Joyful", "Tired"],
        answer: "Joyful",
      },
      {
        id: 104,
        question: "Which word is a color?",
        options: ["Dog", "Blue", "Run", "Eat"],
        answer: "Blue",
      },
      {
        id: 105,
        question: "What does 'enormous' mean?",
        options: ["Tiny", "Average", "Huge", "Fast"],
        answer: "Huge",
      },
    ],
  },
  {
    id: 2,
    name: "Intermediate Grammar",
    questions: [
      {
        id: 201,
        question: "Which sentence uses the correct form of 'there'?",
        options: [
          "Their going to the park.",
          "There going to the park.",
          "They're going to the park.",
          "There going to the park.",
        ],
        answer: "They're going to the park.",
      },
      {
        id: 202,
        question: "What is the past participle of 'eat'?",
        options: ["Ate", "Eaten", "Eated", "Eating"],
        answer: "Eaten",
      },
      {
        id: 203,
        question: "Which sentence is in the passive voice?",
        options: [
          "John wrote the letter.",
          "The letter was written by John.",
          "John is writing the letter.",
          "John will write the letter.",
        ],
        answer: "The letter was written by John.",
      },
      {
        id: 204,
        question: "What type of word is 'quickly'?",
        options: ["Noun", "Verb", "Adjective", "Adverb"],
        answer: "Adverb",
      },
      {
        id: 205,
        question: "Which sentence uses the correct relative pronoun?",
        options: [
          "The man who car broke down is my neighbor.",
          "The man which car broke down is my neighbor.",
          "The man whose car broke down is my neighbor.",
          "The man whom car broke down is my neighbor.",
        ],
        answer: "The man whose car broke down is my neighbor.",
      },
    ],
  },
  {
    id: 3,
    name: "Advanced English Idioms",
    questions: [
      {
        id: 301,
        question: "What does the idiom 'break the ice' mean?",
        options: [
          "To literally break ice",
          "To start a conversation in a social situation",
          "To cool down a drink",
          "To solve a difficult problem",
        ],
        answer: "To start a conversation in a social situation",
      },
      {
        id: 302,
        question: "What does 'bite off more than you can chew' mean?",
        options: [
          "To eat too much food",
          "To take on a task that is too difficult",
          "To speak with your mouth full",
          "To be very hungry",
        ],
        answer: "To take on a task that is too difficult",
      },
      {
        id: 303,
        question: "What does the phrase 'cost an arm and a leg' imply?",
        options: [
          "To injure oneself badly",
          "To lose limbs",
          "To be very expensive",
          "To go through a difficult surgery",
        ],
        answer: "To be very expensive",
      },
      {
        id: 304,
        question: "What does it mean to 'see eye to eye' with someone?",
        options: [
          "To look directly into someone's eyes",
          "To be the same height as someone",
          "To agree with someone",
          "To have good eyesight",
        ],
        answer: "To agree with someone",
      },
      {
        id: 305,
        question: "What does the idiom 'let the cat out of the bag' mean?",
        options: [
          "To release a cat from a bag",
          "To reveal a secret accidentally",
          "To start a fight",
          "To solve a mystery",
        ],
        answer: "To reveal a secret accidentally",
      },
    ],
  },
];
