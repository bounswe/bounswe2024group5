import { Link, Outlet } from "react-router-dom";
import { IconLogout, IconPhotoOff, IconHelp } from "@tabler/icons-react";
import { Modal } from "antd";
import { useGetProfile } from "../hooks/api/profile/get";
import { useState } from "react";

const Logo = () => {
  return (
    <p className="text-3xl font-bold text-violet-600">
      <span className="text-violet-800">Quiz</span>zard
    </p>
  );
};
const NavBar = () => {
  const { data: profile } = useGetProfile();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  return (
    <>
      <div className="w-[%80] mx-auto bg-violet-200 border border-violet-400 rounded-3xl h-16 flex items-center justify-between px-8">
        <Logo />
        <div className="flex items-center gap-4">
          <Link to="/quizzes" className="font-semibold text-violet-700">
            Home
          </Link>
          <Link to="/quizzes" className="font-semibold text-violet-700">
            Quizzes
          </Link>
          <Link to="/leaderboard" className="font-semibold text-violet-700">
            Leaderboard
          </Link>

          <Link to="/forum" className="font-semibold text-violet-700">
            Forum
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-violet-400 hover:bg-violet-500"
          >
            <IconHelp size={24} className="text-white" />
          </button>
          <Link to="/profile">
            <div className="w-8 h-8 overflow-hidden transition-transform rounded-full cursor-pointer hover:scale-110">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Your profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-white">
                  <IconPhotoOff className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          </Link>
          <Link
            to="/login"
            onClick={() => {
              sessionStorage.removeItem("token");
            }}
          >
            <IconLogout size={32} className="cursor-pointer text-violet-700" />
          </Link>
        </div>
      </div>

      <Modal
        open={isInfoModalOpen}
        onCancel={() => setIsInfoModalOpen(false)}
        footer={null}
        width={400}
        className="rounded-2xl"
      >
        <div className="space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-violet-700">
            Welcome to Quizzard! 🎯
          </h2>

          <p className="text-gray-700">
            We are your friend in language learning.
          </p>
          <p className="text-gray-700">
            We offer quizzes to help you learn English with fun!
          </p>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-violet-700">
              The ELO - CEFR Levels Conversion
            </h3>
            <p className="mb-4 text-gray-700">
              You can see the conversion logic:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• A1 → [000, 400]</li>
              <li>• A2 → [400, 1800]</li>
              <li>• B1 → [1000, 1800]</li>
              <li>• B2 → [1800, 2600]</li>
              <li>• C1 → [2600, 3300]</li>
              <li>• C2 → [3300, 10000]</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};
export const RootLayout = () => {
  return (
    <div className="min-h-screen ">
      <NavBar />
      <div className="py-6 mx-auto max-w-7xl ">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
