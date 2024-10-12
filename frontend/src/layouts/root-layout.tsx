import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <NavBar /> */}
      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
