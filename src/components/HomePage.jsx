// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';

const HomePage = ({ onAddToCart, onToggleFavorite, isFavorite }) => {
  return (
    <>
      <HeroSection />
      <div id="featured-products">
        <FeaturedProducts 
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
      <Categories />
      <Newsletter />
    </>
  );
};

export default HomePage;