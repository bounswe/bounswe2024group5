import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ErrorPage } from "./pages/error-page";
import { ForumPage } from "./pages/forum-page";
import { ListQuizzesPage } from "./pages/list-quiz-page";

import { SolveQuizPage } from "./pages/solve-quiz-page";

import { RootLayout } from "./layouts/root-layout";

import "./App.css";
import { AddQuizPage } from "./pages/add-quiz-page";
import { LoginPage } from "./pages/login-page";
import { SignUpPage } from "./pages/sign-up";
import HostContext from "./HostContext";

import { PostDetailsPage } from "./pages/post-details-page";

import ProfilePage from "./pages/profile-page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <HostContext.Provider value="http://localhost:80">
      <Router>
        <Routes>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate to="/quizzes" replace />
              </ProtectedRoute>
            }
          />
          <Route element={<RootLayout />} errorElement={<ErrorPage />}>
            <Route
              path="quizzes"
              element={
                <ProtectedRoute>
                  <ListQuizzesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="quiz/:quizId"
              element={
                <ProtectedRoute>
                  <SolveQuizPage />
                </ProtectedRoute>
              }
            />
            <Route path="forum" element={<ForumPage />} />
            <Route path="post/:postId" element={<PostDetailsPage />} />
            <Route
              path="add-quiz"
              element={
                <ProtectedRoute>
                  <AddQuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/:id?"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </HostContext.Provider>
  );
};

export default App;
