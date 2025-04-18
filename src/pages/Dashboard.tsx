// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { fetchUserData, fetchRandomProducts } from '../api/mockApi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string, email: string, profilePic: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const userData = fetchUserData();
    setUser(userData);

    fetchRandomProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Something went wrong.');
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/'; 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>{error}</p>
        <button type="button" onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <Header onLogout={handleLogout} userEmail={user?.email || ""}  profileIcon={user?.profilePic}/>
      <div className="dashboard-container" >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} /> 
      ))}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
