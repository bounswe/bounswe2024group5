import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FeedPage from './pages/FeedPage'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <>
      <div className='h-screen flex justify-center items-center relative'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="feed" element={<FeedPage />} />
        </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
