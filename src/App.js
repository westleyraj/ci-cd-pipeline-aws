// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Favorites from './components/Favorites';
import Cart from './components/Cart';
import SearchModal from './components/Search';
import ProductListing from './components/ProductListing';
import CheckoutPage from './components/CheckoutPage';
import ThankYouPage from './components/ThankYouPage';

import AuthPage from './components/AuthPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'checkout', 'thankyou'
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleToggleFavorite = (product) => {
    setFavorites(prev => {
      const isAlreadyFavorite = prev.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) {
        return prev.filter(fav => fav.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

  const handleCloseFavorites = () => {
    setShowFavorites(false);
  };

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleShowSearch = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  // Authentication handlers
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserInfo({
      firstName: userData?.firstName || 'westley',
      lastName: userData?.lastName || 'raj',
      email: userData?.email || 'john.doe@example.com'
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    // Optionally clear user-specific data like favorites
    // setFavorites([]);
  };

  // Checkout related handlers
  const handleCheckout = () => {
    setShowCart(false); // Close cart modal
    setCurrentPage('checkout');
  };

  const handleBackToCart = () => {
    setCurrentPage('main');
    setShowCart(true); // Reopen cart modal
  };

  const handleOrderComplete = () => {
    setCurrentPage('thankyou');
    // Clear cart after successful order
    setCartItems([]);
  };

  const handleContinueShopping = () => {
    setCurrentPage('main');
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.id === productId);
  };

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Home page component
  const HomePage = () => (
    <>
      <HeroSection />
      <div id="featured-products">
        <FeaturedProducts 
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
      <Categories />
      <Newsletter />
    </>
  );

  // New & Featured page component
  const NewFeaturedPage = () => (
    <>
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">New & Featured</h1>
          <p className="text-xl text-gray-300">Discover the latest innovations and featured products</p>
        </div>
      </div>
      <div id="featured-products">
        <FeaturedProducts 
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
    </>
  );

  // Main Layout Component (with Header and Footer)
  const MainLayout = ({ children }) => (
    <div className="min-h-screen bg-white">
      <Header 
        cartItems={getTotalCartItems()} 
        favoritesCount={favorites.length}
        onShowFavorites={handleShowFavorites}
        onShowCart={handleShowCart}
        onShowSearch={handleShowSearch}
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        onLogout={handleLogout}
      />
      
      {children}
      
      <Footer />
      
      {/* Modals */}
      {showFavorites && (
        <Favorites
          favorites={favorites}
          onClose={handleCloseFavorites}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={handleCloseCart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      )}

      {showSearch && (
        <SearchModal
          isOpen={showSearch}
          onClose={handleCloseSearch}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/auth" replace />;
  };

  // Render different pages based on current state
  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <CheckoutPage
          cartItems={cartItems}
          onBack={handleBackToCart}
          onOrderComplete={handleOrderComplete}
        />
      </div>
    );
  }

  if (currentPage === 'thankyou') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ThankYouPage
          onContinueShopping={handleContinueShopping}
        />
      </div>
    );
  }

  // Main application with routing
  return (
    <Router>
      <Routes>
        {/* Auth page - publicly accessible */}
        <Route 
          path="/auth" 
          element={<AuthPage onLogin={handleLogin} />} 
        />
        
        {/* Redirect root to auth if not logged in, otherwise to home */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          } 
        />
        
        {/* Protected routes - require authentication */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/homepage" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <HomePage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/new-featured" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <NewFeaturedPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/men" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductListing 
                  category="men"
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/women" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductListing 
                  category="women"
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/kids" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductListing 
                  category="kids"
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/sale" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProductListing 
                  category="sale"
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;