export type ForumPost = {
    id: number,
    username: string,
    title: string,
    content: string,
    upvote: number,
    tags: string[],
    createdAt: string,
    updatedAt: string
}

export type ForumPostProps = { 
  post: ForumPost 
};

export type ForumReply = {
    id: number,
    username: string,
    content: string,
    upvote: number,
    createdAt: string,
    updatedAt: string
}

export type ForumReplyProps = {
  reply: ForumReply
}

export const mockForumPosts: ForumPost[] = [
    {
        id: 1,
        username: "odenizddd",
        title: "How can I use the word affection in a sentence?",
        content: "I came across the word affection when I was solving a quiz. I was able to find the correct answer by eliminating other options, however I don't feel confident using this word in a real sentence. Can you guys give me several examples, please?",
        upvote: 26,
        tags: ["affection"],
        createdAt: "2 hours ago",
        updatedAt: ""
    },
    {
      id: 2,
      username: "language_learner99",
      title: "What's the difference between affect and effect?",
      content: "I've been struggling with understanding when to use 'affect' and 'effect'. Could someone clarify the difference and provide examples?",
      upvote: 15,
      tags: ["grammar", "affect", "effect"],
      createdAt: "5 hours ago",
      updatedAt: ""
    },
    {
      id: 3,
      username: "vocab_victor",
      title: "Alternative words for 'important'?",
      content: "I'm looking for synonyms for the word 'important' to improve my writing. Can anyone suggest words that convey similar meanings?",
      upvote: 34,
      tags: ["vocabulary", "synonyms", "important"],
      createdAt: "1 day ago",
      updatedAt: ""
    },
    {
      id: 4,
      username: "englishenthusiast",
      title: "Using 'accomplish' in a sentence",
      content: "Could someone help me understand how to use 'accomplish' in different contexts? I'm trying to expand my vocabulary, and I'd like to hear how native speakers use it.",
      upvote: 21,
      tags: ["vocabulary", "accomplish", "sentence usage"],
      createdAt: "3 days ago",
      updatedAt: ""
    },
    {
      id: 5,
      username: "curious_mind",
      title: "Examples of 'benevolent' in everyday language",
      content: "I recently came across the word 'benevolent' and would love to see how it's used in real-life situations. Any examples?",
      upvote: 18,
      tags: ["vocabulary", "benevolent", "examples"],
      createdAt: "1 week ago",
      updatedAt: ""
    },
    {
      id: 6,
      username: "english_explorer",
      title: "How to express disappointment politely?",
      content: "Sometimes I need to express disappointment or disagreement in a polite way. Does anyone have any suggestions or phrases that would sound respectful?",
      upvote: 29,
      tags: ["communication", "politeness", "phrases"],
      createdAt: "2 weeks ago",
      updatedAt: ""
    },
    {
      id: 7,
      username: "word_wizard",
      title: "Is 'flabbergasted' too informal?",
      content: "I came across 'flabbergasted' and was wondering if it's suitable for professional writing. When would you use it, if at all?",
      upvote: 13,
      tags: ["vocabulary", "informal language", "flabbergasted"],
      createdAt: "3 weeks ago",
      updatedAt: ""
    },
    {
      id: 8,
      username: "student101",
      title: "How to remember synonyms easily?",
      content: "I'm struggling to remember synonyms while expanding my vocabulary. Are there any tricks or methods that could help me retain new words?",
      upvote: 42,
      tags: ["learning", "synonyms", "memory tricks"],
      createdAt: "1 month ago",
      updatedAt: ""
    }
]
  
export const mockForumReplies: ForumReply[] = [
  {
    id: 1,
    username: "language_expert",
    content: "Affection is a lovely word to describe warm feelings toward someone or something. For example: 'She showed affection for her cat by petting it gently every morning.'",
    upvote: 18,
    createdAt: "1 hour ago",
    updatedAt: ""
  },
  {
    id: 2,
    username: "grammar_guru",
    content: "You can use 'affection' to show fondness. For example, 'He has a deep affection for his hometown, even though he moved away years ago.'",
    upvote: 22,
    createdAt: "45 minutes ago",
    updatedAt: ""
  },
  {
    id: 3,
    username: "word_enthusiast",
    content: "Another example could be: 'Their affection for each other was obvious in the way they held hands and laughed together.'",
    upvote: 13,
    createdAt: "30 minutes ago",
    updatedAt: ""
  },
  {
    id: 4,
    username: "student_helper",
    content: "You can use it in different contexts, like 'affection for a hobby'. Example: 'She has a strong affection for painting landscapes.'",
    upvote: 9,
    createdAt: "25 minutes ago",
    updatedAt: ""
  },
  {
    id: 5,
    username: "english_pro",
    content: "Here's a simple sentence: 'He looked at her with great affection.' It's a good way to show warmth or love without being overly expressive.",
    upvote: 15,
    createdAt: "15 minutes ago",
    updatedAt: ""
  },
  {
    id: 6,
    username: "native_speaker",
    content: "Affection is usually used to express a friendly, caring feeling. For instance: 'She expressed her affection by writing him a letter.'",
    upvote: 20,
    createdAt: "10 minutes ago",
    updatedAt: ""
  },
  {
    id: 7,
    username: "literature_lover",
    content: "If you're reading books, you might find a sentence like: 'His affection for her grew every day, despite the distance between them.'",
    upvote: 12,
    createdAt: "5 minutes ago",
    updatedAt: ""
  },
];
