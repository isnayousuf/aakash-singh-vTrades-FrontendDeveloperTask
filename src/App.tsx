// src/App.tsx
import React from 'react';
import './App.css';
import GoogleSignIn from './components/GoogleSiginIn';
// import UserProfile from './components/UserProfile';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};
export default App;
