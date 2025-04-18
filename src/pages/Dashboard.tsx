// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { fetchUserData, fetchRandomProducts } from "../api/mockApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import CustomModal from "../components/CustomModal";
import {AlertTriangle} from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{
    email: string;
    profilePic: string;
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserData();
        setUser(userData);

        const productData = await fetchRandomProducts();
        setProducts(productData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong while loading data.';
        setError(errorMessage);
        setShowErrorModal(true); 
        setLoading(false);
        
      } finally {
        setLoading(false);
       
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  if (loading) {
    return <Loader />;
  }

  //We can have a custom error handler in the middleware to show errors 
  if (error) {
    return (
      <CustomModal
        showModal={showErrorModal}
        closeModal={() => {
          setShowErrorModal(false);
          window.location.reload(); 
        }}
        modalIcon={<AlertTriangle color="#E5484D" style={{width: "80px", height:"80px"}}/>}
        modalHeading="Oops! Something went wrong."
        modalSubHeading={error} 
        ctaLabel="Retry"
      />
    );
  }

  return (
    <div>
      <Header
        onLogout={handleLogout}
        userEmail={user?.email || ""}
        profileIcon={user?.profilePic}
      />
      <div className="dashboard-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
