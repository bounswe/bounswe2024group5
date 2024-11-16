import { motion } from "framer-motion";

import {
  IconHeart,
  IconPencil,
  IconTrophy,
  IconMedal,
} from "@tabler/icons-react";

import { QUIZ_DIFFICULTIES } from "../components/list-quizzes/regular-quiz-card";
import { Tabs } from "antd";

const ProfilePage = () => {
  const user = {
    username: "JohnDoe",
    email: "john@example.com",
    totalPoints: 1250,
    badges: [
      { id: 1, name: "Quiz Master", description: "Created 10 quizzes" },
      { id: 2, name: "Perfect Score", description: "Got 100% on 5 quizzes" },
    ],
    quizHistory: [
      { id: 1, title: "English Grammar", score: 90, date: "2024-03-15" },
      { id: 2, title: "Basic Vocabulary", score: 85, date: "2024-03-10" },
    ],
    createdQuizzes: [
      {
        id: 1,
        title: "Beginner French",
        difficulty: 0,
        likes: 42,
        questions: { length: 10 },
      },
    ],
    forumPosts: [
      {
        id: 1,
        title: "Tips for Learning Spanish",
        likes: 15,
        replies: 8,
        date: "2024-03-01",
      },
    ],
  };

  return (
    <main className="min-h-screen px-4 py-4 bg-purple-50 rounded-3xl">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gap-6 space-y-6"
        >
          {/* Profile Header */}
          <div className="p-6 bg-white rounded-3xl">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-purple-200 rounded-full">
                  <img
                    src="/api/placeholder/128/128"
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <button className="absolute flex items-center p-2 text-white bg-purple-500 rounded-full bottom-2 right-2 hover:bg-purple-600">
                  <IconPencil size={16} />
                </button>
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-purple-800">
                    {user.username}
                  </h1>
                  <button className="px-4 py-2 text-white transition-colors rounded-full bg-violet-500 hover:bg-violet-600">
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-600 place-self-start">{user.email}</p>

                <div className="flex items-center gap-4 mt-8">
                  <div className="flex items-center gap-2">
                    <IconTrophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-purple-800">
                      {user.totalPoints} Points
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="p-6 bg-white rounded-3xl">
            <h2 className="mb-4 text-xl font-semibold text-purple-800">
              Badges
            </h2>
            <div className="flex gap-4">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 bg-purple-100 rounded-xl"
                >
                  <IconMedal className="w-8 h-8 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-purple-800">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Tabs */}
          <div className="p-6 bg-white rounded-3xl">
            <Tabs
              defaultActiveKey="quizzes"
              items={[
                {
                  key: "quizzes",
                  label: "My Quizzes",
                  children: (
                    <div className="grid gap-4">
                      {user.createdQuizzes.map((quiz) => (
                        <motion.div
                          key={quiz.id}
                          className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-purple-800">
                              {quiz.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 text-sm bg-purple-100 rounded-full">
                                {QUIZ_DIFFICULTIES[quiz.difficulty]}
                              </span>
                              <div className="flex items-center gap-1">
                                <IconHeart className="w-5 h-5 text-red-500" />
                                {/* <span>{quiz.likes}</span> */}
                                <span>{Math.floor(Math.random() * 100)}</span>
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600 place-self-start">
                            {quiz.questions.length} Questions
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ),
                },
                {
                  key: "history",
                  label: "Quiz History",
                  children: (
                    <div className="grid gap-4">
                      {user.quizHistory.map((quiz) => (
                        <motion.div
                          key={quiz.id}
                          className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-purple-800">
                                {quiz.title}
                              </h3>
                              <p className="text-sm text-gray-600 place-self-start">
                                {quiz.date}
                              </p>
                            </div>
                            <div className="px-3 py-1 text-lg font-semibold text-green-800 bg-green-100 rounded-full">
                              {quiz.score}%
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ),
                },
                {
                  key: "forum",
                  label: "Forum Posts",
                  children: (
                    <div className="grid gap-4">
                      {user.forumPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-purple-800">
                                {post.title}
                              </h3>
                              <p className="text-sm text-gray-600 place-self-start">
                                {post.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <IconHeart className="w-5 h-5 text-red-500" />
                                <span>{post.likes}</span>
                              </div>
                              <span className="px-3 py-1 text-sm bg-purple-100 rounded-full">
                                {post.replies} replies
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ProfilePage;
