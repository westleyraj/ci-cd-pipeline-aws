// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import ProductCard from './ProductCard';

const SearchModal = ({ isOpen, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Extended product database for search
  const allProducts = [
    {
      id: 1,
      name: "Air Max 270",
      category: "Men's Shoes",
      price: 150,
      rating: 5,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true,
      keywords: ["air", "max", "270", "men", "shoes", "running", "sports"]
    },
    {
      id: 2,
      name: "React Infinity Run",
      category: "Women's Running",
      price: 160,
      rating: 4,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false,
      keywords: ["react", "infinity", "run", "women", "running", "sports", "fitness"]
    },
    {
      id: 3,
      name: "Air Force 1",
      category: "Unisex Shoes",
      price: 90,
      rating: 5,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false,
      keywords: ["air", "force", "1", "unisex", "shoes", "classic", "basketball"]
    },
    {
      id: 4,
      name: "Dri-FIT Training",
      category: "Men's T-Shirt",
      price: 35,
      rating: 4,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true,
      keywords: ["dri-fit", "training", "men", "shirt", "workout", "gym", "fitness"]
    },
    {
      id: 5,
      name: "Air Jordan 1",
      category: "Men's Basketball",
      price: 170,
      rating: 5,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false,
      keywords: ["air", "jordan", "1", "men", "basketball", "classic", "retro"]
    },
    {
      id: 6,
      name: "Free RN 5.0",
      category: "Women's Running",
      price: 100,
      rating: 4,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true,
      keywords: ["free", "rn", "5.0", "women", "running", "lightweight", "flexible"]
    },
    {
      id: 7,
      name: "Tech Fleece Hoodie",
      category: "Unisex Apparel",
      price: 85,
      rating: 4,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: false,
      keywords: ["tech", "fleece", "hoodie", "unisex", "apparel", "warm", "casual"]
    },
    {
      id: 8,
      name: "Metcon 7",
      category: "Training Shoes",
      price: 130,
      rating: 5,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isNew: true,
      keywords: ["metcon", "7", "training", "shoes", "crossfit", "gym", "workout"]
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      if (query.trim() === '') {
        setSearchResults([]);
      } else {
        const filtered = allProducts.filter(product => {
          const searchTerm = query.toLowerCase();
          return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.keywords.some(keyword => keyword.includes(searchTerm))
          );
        });
        setSearchResults(filtered);
      }
      setIsSearching(false);
    }, 300);
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Focus on search input when modal opens
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] mx-4 overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center p-6 border-b border-gray-200">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg"
            />
          </div>
          <button
            onClick={handleClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Search Results */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching...</p>
            </div>
          ) : searchQuery === '' ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Start searching</h3>
              <p className="text-gray-500">Enter a product name, category, or keyword to find what you're looking for</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search terms or browse our categories</p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;