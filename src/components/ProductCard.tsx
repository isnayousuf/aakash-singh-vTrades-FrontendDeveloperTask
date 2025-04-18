import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
      />
      <h3 className="product-title">{product.title}</h3>
      <p   className="product-description">{product.description.slice(0, 50)}...</p>
      <p   className="product-price"> 
        <strong>${product.price}</strong>
      </p>
    </div>
  );
};

export default ProductCard;
