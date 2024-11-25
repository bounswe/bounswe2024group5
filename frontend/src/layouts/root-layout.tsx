import { Link, Outlet } from "react-router-dom";
import { IconLogout, IconPhotoOff } from "@tabler/icons-react";
import { useGetProfile } from "../hooks/api/profile/get";

const Logo = () => {
  return (
    <p className="text-3xl font-bold text-violet-600">
      <span className="text-violet-800">Quiz</span>zard
    </p>
  );
};
const NavBar = () => {
  const { data: profile } = useGetProfile();
  return (
    <div className="w-[%80] mx-auto bg-violet-200 border border-violet-400 rounded-3xl h-16 flex items-center justify-between px-8">
      <Logo />
      <div className="flex items-center gap-4">
        <Link to="/quizzes" className="font-semibold text-violet-700">
          Home
        </Link>
        <Link to="/quizzes" className="font-semibold text-violet-700">
          Quizzes
        </Link>
        <Link to="/forum" className="font-semibold text-violet-700">
          Forum
        </Link>
      </div>
      <div className="flex gap-4">
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
