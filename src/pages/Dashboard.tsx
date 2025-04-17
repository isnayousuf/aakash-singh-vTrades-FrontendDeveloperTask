import React, { useEffect, useState } from 'react';
import { fetchUserData } from '../api/mockApi';

interface User {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Something went wrong.');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('google_token');
    window.location.href = '/'; 
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
