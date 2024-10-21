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
import HostContext from "./HostContext";

const App = () => {
  return (
    <HostContext.Provider value="http://localhost:80">
      {/* Change the following line above to change the server URL. */}
      <Router>
        <Routes>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route element={<RootLayout />} errorElement={<ErrorPage />}>
            <Route index element={<ListQuizzesPage />} />
            <Route path="quizzes" element={<ListQuizzesPage />} />
            <Route path="quiz/:quizId" element={<SolveQuizPage />} />
            <Route path="forum" element={<ForumPage />} />
            <Route path="add-quiz" element={<AddQuizPage />} />
          </Route>
        </Routes>
      </Router>
    </HostContext.Provider>
  );
};

export default App;
