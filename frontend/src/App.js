import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
      <Router basename="/melodify-ui">
          <div className='h-screen flex justify-center items-center'>
              <Routes>
                  <Route path="/" element={<Navigate replace to="/register" />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/login" element={<LoginPage />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
