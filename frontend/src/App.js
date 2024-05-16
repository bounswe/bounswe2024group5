import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostContext from './HostContext';


function App() {

  return (
    <>
      {/* Change the following line to change the server URL. */}
      <HostContext.Provider value="http://localhost:80">
        <div className='h-screen flex justify-center items-center relative'>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="search" element={<SearchPage />} />
          </Routes>
          </BrowserRouter>
        </div>
      </HostContext.Provider>
    </>
  );
}

export default App;
