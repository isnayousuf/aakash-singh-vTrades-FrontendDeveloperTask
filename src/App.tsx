import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import OtpPage from "./pages/OtpPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdateEmail from "./containers/Login/UpdateEmail";
import ForgotPassword from "./containers/Login/ForgotPassword";
import UpdatePassword from "./containers/Login/UpdatePassword";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/update-email" element={<UpdateEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </Router>
  );
};
export default App;
