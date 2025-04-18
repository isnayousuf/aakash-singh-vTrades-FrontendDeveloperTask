import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import OtpPage from "./pages/OtpPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateEmail from "./containers/Login/UpdateEmail";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/update-email" element={<UpdateEmail />} />

      </Routes>
    </Router>
  );
};
export default App;
