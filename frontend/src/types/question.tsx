export type Question = {
  id: number;
  word: string;
  type: "en-tr" | "tr-en" | "meaning";
  options: string[];
  answer: string;
};

export type Quiz = {
  id: number;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: "fruits" | "animals" | "colors" | "numbers";
  questionCount: number;
  imageUrl: string;
  highlighted: boolean;
  questions: Question[];
};

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Basic Turkish-English Vocabulary",
    description: "Learn fundamental Turkish and English words",
    level: "beginner",
    category: "colors",
    questionCount: 5,
    imageUrl: "/api/placeholder/250/250",
    highlighted: true,
    questions: [
      {
        id: 101,
        word: "hot",
        type: "en-tr",
        options: ["Soğuk", "Sıcak", "Ilık", "Serin"],
        answer: "Sıcak",
      },
      {
        id: 102,
        word: "ev",
        type: "tr-en",
        options: ["Car", "House", "Shoe", "Book"],
        answer: "House",
      },
      {
        id: 103,
        word: "happy",
        type: "meaning",
        options: ["Sad", "Angry", "Joyful", "Tired"],
        answer: "Joyful",
      },
      {
        id: 104,
        word: "mavi",
        type: "tr-en",
        options: ["Red", "Green", "Blue", "Yellow"],
        answer: "Blue",
      },
      {
        id: 105,
        word: "enormous",
        type: "meaning",
        options: ["Tiny", "Average", "Huge", "Fast"],
        answer: "Huge",
      },
    ],
  },
  {
    id: 2,
    title: "Intermediate Turkish-English Grammar",
    description: "Improve your understanding of Turkish and English grammar",
    level: "intermediate",
    category: "animals",
    questionCount: 5,
    imageUrl: "/api/placeholder/250/250",
    highlighted: true,
    questions: [
      {
        id: 201,
        word: "they're",
        type: "en-tr",
        options: ["Onların", "Orada", "Onlar", "Onlar're"],
        answer: "Onlar",
      },
      {
        id: 202,
        word: "yemek",
        type: "tr-en",
        options: ["Eat", "Ate", "Eaten", "Eating"],
        answer: "Eat",
      },
      {
        id: 203,
        word: "passive voice",
        type: "meaning",
        options: [
          "The subject performs the action",
          "The subject receives the action",
          "There is no subject in the sentence",
          "The verb is always in past tense",
        ],
        answer: "The subject receives the action",
      },
      {
        id: 204,
        word: "quickly",
        type: "en-tr",
        options: ["Hızlı", "Hızlılık", "Hızlıca", "Hızlandırmak"],
        answer: "Hızlıca",
      },
      {
        id: 205,
        word: "whose",
        type: "meaning",
        options: [
          "Indicating possession",
          "Asking about a person",
          "Referring to a place",
          "Describing time",
        ],
        answer: "Indicating possession",
      },
    ],
  },
  {
    id: 3,
    title: "Advanced Turkish-English Idioms",
    description: "Master complex Turkish and English expressions and idioms",
    level: "advanced",
    category: "fruits",
    questionCount: 5,
    imageUrl: "/api/placeholder/250/250",
    highlighted: false,
    questions: [
      {
        id: 301,
        word: "break the ice",
        type: "en-tr",
        options: [
          "Buzu kırmak",
          "Sohbeti başlatmak",
          "Buz gibi soğuk olmak",
          "Zor bir sorunu çözmek",
        ],
        answer: "Buzu kırmak",
      },
      {
        id: 302,
        word: "gözünden büyütmek",
        type: "tr-en",
        options: [
          "To eat too much",
          "To bite off more than you can chew",
          "To exaggerate",
          "To be very hungry",
        ],
        answer: "To exaggerate",
      },
      {
        id: 303,
        word: "cost an arm and a leg",
        type: "en-tr",
        options: [
          "Kol ve bacağa mal olmak",
          "Pahalıya patlamak",
          "Çok ucuz olmak",
          "Bedava olmak",
        ],
        answer: "Pahalıya patlamak",
      },
      {
        id: 304,
        word: "aynı frekansta olmak",
        type: "tr-en",
        options: [
          "To be on the same wavelength",
          "To be the same height as someone",
          "To see eye to eye",
          "To have good reception",
        ],
        answer: "To be on the same wavelength",
      },
      {
        id: 305,
        word: "let the cat out of the bag",
        type: "meaning",
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
