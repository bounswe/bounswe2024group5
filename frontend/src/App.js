import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <div className='h-screen flex justify-center items-center'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="search" element={<SearchPage />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
