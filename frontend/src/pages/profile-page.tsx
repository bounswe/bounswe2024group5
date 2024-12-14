import { motion } from "framer-motion";
import { useState } from "react";

import {
  IconHeart,
  IconTrophy,
  IconMedal,
  IconUser,
  IconMail,
  IconEdit,
} from "@tabler/icons-react";

import ProfileUpdateModal from "../components/profile/update-modal";

import { message, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetProfile } from "../hooks/api/profile/get";
import { useUpdateProfile } from "../hooks/api/profile/update";
import { useFetchQuizzes } from "../hooks/api/get-quizzes";

import { useQuizAttempts } from "../hooks/api/attempts/list";
import { QuizAttemptCard } from "../components/profile/quiz-attempt-card";
import { DifficultyBadge } from "../components/badges/level";
import { useFetchPosts } from "../hooks/api/get-forum-post";
import { ForumPostCard } from "../components/profile/forum-post-card";
import { ProfilePhotoUpload } from "../components/profile/profile-photo";

import { useFetchFollowing } from "../hooks/api/profile/follow-button/get-following";
import { usePostFollowing } from "../hooks/api/profile/follow-button/post-following";
import { useDeleteFollowing } from "../hooks/api/profile/follow-button/delete-following";

import { DeleteQuizButton } from "../components/profile/delete-quiz-button";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams<{ username?: string }>();
  const { data: profile, error } = useGetProfile(username);
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile();
  const { data: posts } = useFetchPosts({ username: profile?.username ?? "" });

  const { data: userQuizAttempts } = useQuizAttempts();

  const { data: userQuizzes } = useFetchQuizzes({
    username: profile?.username ?? "",
  });

  const { data: following } = useFetchFollowing();
  const isFollowing = following?.some((f) => f.username === username);

  const { mutateAsync: followUser } = usePostFollowing();
  const { mutateAsync: unfollowUser } = useDeleteFollowing();

  const handleFollow = () => {
    if (isFollowing) {
      unfollowUser(username);
    } else {
      followUser(username);
    }
  }

  const user = {
    badges: [
      { id: 1, name: "Quiz Master", description: "Created 2 quizzes" },
      { id: 2, name: "Perfect Score", description: "Got 100% on 5 quizzes" },
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
              <ProfilePhotoUpload
                currentPhoto={profile.profilePicture}
                isOwnProfile={isOwnProfile}
                username={profile.username}
                size="large"
              />

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

                  {!isOwnProfile && (
                    <button onClick={handleFollow} className="flex items-center justify-center px-4 py-2 text-white transition-colors rounded-full bg-violet-500 hover:bg-violet-600">
                      { isFollowing ? "Unfollow" : "Follow" }
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

                  { isOwnProfile && (  
                    <div className="flex items-center gap-1 mt-2">
                    <IconMail className="text-zinc-700" size={20} stroke={3} />
                    <p className="text-gray-600 place-self-start">
                      {profile.email}
                    </p>
                  </div>
                  )}
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
                                <DifficultyBadge difficulty={quiz.difficulty} />
                                <div className="flex items-center gap-1">
                                  <IconHeart className="w-5 h-5 text-red-500" />
                                  {/* <span>{quiz.likes}</span> */}4
                                </div>
                                {isOwnProfile && (
                                  <DeleteQuizButton
                                    quizId={quiz.id as number}
                                    quizTitle={quiz.title}
                                    onDeleteSuccess={() => {
                                      message.success(
                                        "Quiz deleted successfully"
                                      );
                                    }}
                                  />
                                )}
                                {isOwnProfile && (
                                  <Link to={`/add-quiz/${quiz.id}`}>
                                    <button className="flex items-center gap-1 px-2 py-1 text-sm text-orange-600 transition-colors rounded-lg hover:bg-orange-50">
                                      <IconEdit size={16} />
                                      Edit
                                    </button>
                                  </Link>
                                )}
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
                ...(isOwnProfile ? [{
                  key: "history",
                  label: "Quiz History",
                  children: (
                    <div className="grid gap-4">
                      {userQuizAttempts?.map((attempt) => (
                        <QuizAttemptCard key={attempt.id} attempt={attempt} />
                      ))}
                    </div>
                  ),
                }] : []),
                {
                  key: "forum",
                  label: "Forum Posts",
                  children: (
                    <div className="grid gap-4">
                      {posts?.map((post) => (
                        <ForumPostCard key={post.id} post={post} />
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
