// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(product);
  };

  return (
    <div 
      className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Heart 
            className={`h-6 w-6 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
              isProductFavorite 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400 hover:text-red-500'
            }`}
            onClick={handleFavoriteClick}
          />
        </div>
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">
            New
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              isHovered 
                ? 'bg-black text-white scale-105' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;