// src/components/FeaturedProducts.jsx
import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ onAddToCart, onToggleFavorite, isFavorite }) => {
  const products = [
    {
      id: 1,
      name: "Air Max 270",
      category: "Men's Shoes",
      price: 150,
      rating: 5,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true
    },
    {
      id: 2,
      name: "React Infinity Run",
      category: "Women's Running",
      price: 160,
      rating: 4,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false
    },
    {
      id: 3,
      name: "Air Force 1",
      category: "Unisex Shoes",
      price: 90,
      rating: 5,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false
    },
    {
      id: 4,
      name: "Dri-FIT Training",
      category: "Men's T-Shirt",
      price: 35,
      rating: 4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover our latest and most popular items
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;