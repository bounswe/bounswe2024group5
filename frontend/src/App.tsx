import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ErrorPage } from "./pages/error-page";
import { ForumPage } from "./pages/forum-page";
import { ListQuizzesPage } from "./pages/list-quiz-page";

import { SolveQuizPage } from "./pages/solve-quiz-page";

import { RootLayout } from "./layouts/root-layout";

import "./App.css";
import { AddQuizPage } from "./pages/add-quiz-page";
import { LoginPage } from "./pages/login-page";
import { SignUpPage } from "./pages/sign-up";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route index element={<ListQuizzesPage />} />
          <Route path="quizzes" element={<ListQuizzesPage />} />
          <Route path="quiz/:quizId" element={<SolveQuizPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="add-quiz" element={<AddQuizPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
