// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User } from 'lucide-react';

const Header = ({ 
  cartItems, 
  favoritesCount, 
  onShowFavorites, 
  onShowCart, 
  onShowSearch, 
  onShowAuth,
  isLoggedIn,
  userInfo,
  onLogout 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const handleSearchClick = () => {
    onShowSearch();
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      // Route to auth page instead of showing modal
      navigate('/auth');
    }
  };

  const handleLogout = () => {
    onLogout();
    setShowUserMenu(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                Nikefit
              </Link>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/new-featured" 
              className={`font-medium transition-colors ${
                isActiveLink('/new-featured') 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              New & Featured
            </Link>
            <Link 
              to="/men" 
              className={`font-medium transition-colors ${
                isActiveLink('/men') 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className={`font-medium transition-colors ${
                isActiveLink('/women') 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              Women
            </Link>
            <Link 
              to="/kids" 
              className={`font-medium transition-colors ${
                isActiveLink('/kids') 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              Kids
            </Link>
            <Link 
              to="/sale" 
              className={`font-medium transition-colors ${
                isActiveLink('/sale') 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-900 hover:text-gray-700'
              }`}
            >
              Sale
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex relative">
              <button 
                onClick={handleSearchClick}
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-48 text-left text-gray-500 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
              >
                Search
              </button>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
            
            {/* Mobile search button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleSearchClick}
            >
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            
            <div className="relative">
              <Heart 
                className="h-6 w-6 text-gray-700 hover:text-red-500 cursor-pointer transition-colors" 
                onClick={onShowFavorites}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {favoritesCount}
                </span>
              )}
            </div>
            
            <div className="relative">
              <ShoppingBag 
                className="h-6 w-6 text-gray-700 hover:text-black cursor-pointer transition-colors" 
                onClick={onShowCart}
              />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </div>

            {/* User Authentication */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleAuthClick}
                className={`flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none ${
                  isLoggedIn ? 'bg-gray-50' : ''
                }`}
                title={isLoggedIn ? 'Account menu' : 'Sign in'}
              >
                <User className={`h-6 w-6 ${isLoggedIn ? 'text-black' : 'text-gray-700'}`} />
              </button>

              {/* User Dropdown Menu - Only show when logged in */}
              {isLoggedIn && showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {userInfo?.firstName && userInfo?.lastName 
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : 'User'
                      }
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {userInfo?.email || 'No email provided'}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/new-featured" 
              className={`block px-3 py-2 font-medium transition-colors ${
                isActiveLink('/new-featured') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              New & Featured
            </Link>
            <Link 
              to="/men" 
              className={`block px-3 py-2 font-medium transition-colors ${
                isActiveLink('/men') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className={`block px-3 py-2 font-medium transition-colors ${
                isActiveLink('/women') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              to="/kids" 
              className={`block px-3 py-2 font-medium transition-colors ${
                isActiveLink('/kids') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Kids
            </Link>
            <Link 
              to="/sale" 
              className={`block px-3 py-2 font-medium transition-colors ${
                isActiveLink('/sale') 
                  ? 'text-black bg-gray-100' 
                  : 'text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sale
            </Link>
            <button 
              onClick={() => {
                onShowFavorites();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
            >
              Favorites ({favoritesCount})
            </button>
            <button 
              onClick={() => {
                onShowCart();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
            >
              Shopping Bag ({cartItems})
            </button>
            
            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-2">
              {isLoggedIn ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {userInfo?.firstName && userInfo?.lastName 
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : 'User'
                      }
                    </p>
                    <p className="text-sm text-gray-500">
                      {userInfo?.email || 'No email provided'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-900 font-medium hover:bg-gray-50"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;