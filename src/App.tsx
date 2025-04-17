// src/App.tsx
import React from 'react';
import './App.css';
import GoogleSignIn from './components/GoogleSiginIn';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
  return (
    <div className="App">
      <GoogleSignIn />
      <UserProfile />
    </div>
  );
};

export default App;
