import { motion } from "framer-motion";
import { useState } from "react";

import {
  IconHeart,
  IconPencil,
  IconTrophy,
  IconMedal,
  IconUser,
  IconMail,
  IconEdit,
  IconMessages,
} from "@tabler/icons-react";

import ProfileUpdateModal from "../components/profile/update-modal";

import { QUIZ_DIFFICULTIES } from "../components/badges/level";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import { useGetProfile } from "../hooks/api/profile/get";
import { useUpdateProfile } from "../hooks/api/profile/update";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";

import { useQuizAttempts } from "../hooks/api/attempts/list";
import { QuizAttemptCard } from "../components/profile/quiz-attempt-card";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams<{ username?: string }>();
  const { data: profile, error } = useGetProfile(username);
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();

  const { data: userQuizAttempts } = useQuizAttempts();

  const { data: userQuizzes } = useFetchQuizzes({ filter: "own" });
  const user = {
    badges: [
      { id: 1, name: "Quiz Master", description: "Created 2 quizzes" },
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

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          {error instanceof Error ? error.message : "Failed to load profile"}
        </p>
      </div>
    );
  }
  const handleProfileUpdate = async (updates: {
    name?: string;
    email?: string;
    profilePicture?: string;
  }) => {
    await updateProfile(updates);
  };

  const isOwnProfile = !username;

  return (
    <main className="min-h-screen px-4 py-4 bg-purple-50 rounded-3xl">
      <ProfileUpdateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleProfileUpdate}
        initialData={profile}
        isUpdating={isUpdating}
      />
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
                {isOwnProfile && (
                  <button className="absolute flex items-center p-2 text-white bg-purple-500 rounded-full bottom-2 right-2 hover:bg-purple-600">
                    <IconPencil size={16} />
                  </button>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-purple-800">
                    {profile.name}
                  </h1>

                  {isOwnProfile && (
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-full bg-violet-500 hover:bg-violet-600"
                      onClick={() => setIsModalOpen(true)}
                      disabled={isUpdating}
                    >
                      <IconEdit size={20} />
                      {isUpdating ? "Updating..." : "Edit"}
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 mt-2">
                    <IconUser className="text-zinc-700" size={20} stroke={3} />
                    <p className="text-gray-600 text-md place-self-start">
                      @{profile.username}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    <IconMail className="text-zinc-700" size={20} stroke={3} />
                    <p className="text-gray-600 place-self-start">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <div className="flex items-center gap-2">
                    <IconTrophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold text-purple-800">
                      {profile.score} Points
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                      Level: {profile.englishProficiency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      {profile.noCreatedQuizzes} Quizzes Created
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
                      {userQuizzes ? (
                        userQuizzes.map((quiz) => (
                          <motion.div
                            key={quiz.id}
                            className="p-4 transition-colors cursor-pointer bg-purple-50 rounded-xl hover:bg-purple-100"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-purple-800 place-self-start">
                                  {quiz.title}
                                </h3>
                                <p className="text-sm text-gray-600 place-self-start">
                                  {quiz.questions.length} Questions
                                </p>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <IconHeart className="w-5 h-5 text-red-500" />
                                  {/* <span>{quiz.likes}</span> */}4
                                </div>
                                <span className="px-3 py-1 text-sm bg-purple-100 rounded-full">
                                  {QUIZ_DIFFICULTIES[quiz.difficulty]}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div>
                          <p className="text-purple-800">No quizzes found</p>
                        </div>
                      )}
                    </div>
                  ),
                },
                {
                  key: "history",
                  label: "Quiz History",
                  children: (
                    <div className="grid gap-4">
                      {userQuizAttempts?.map((attempt) => (
                        <QuizAttemptCard key={attempt.id} attempt={attempt} />
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
                              |
                              <div className="flex items-center gap-1">
                                <IconMessages className="w-5 h-5 text-blue-500" />
                                <span>{post.replies}</span>
                              </div>
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
