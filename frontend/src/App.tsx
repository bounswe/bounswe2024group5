import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ErrorPage } from "./pages/error-page";
import { ForumPage } from "./pages/forum-page";
import { ListQuizzesPage } from "./pages/list-quiz-page";
import { MainPage } from "./pages/main-page";
import { SolveQuizPage } from "./pages/solve-quiz-page";

import { RootLayout } from "./layouts/root-layout";

import "./App.css";
import { AddQuizPage } from "./pages/add-quiz-page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
          <Route index element={<MainPage />} />
          <Route path="quizzes" element={<ListQuizzesPage />} />
          <Route path="quiz/:quizId" element={<SolveQuizPage />} />
          <Route path="forum" element={<ForumPage />} />
          <Route path="addQuiz" element={<AddQuizPage/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
