// src/components/ProductListing.jsx
import React, { useState, useMemo } from 'react';
import { Filter, Grid, List,  } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductListing = ({ category, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Extended product database with category-specific products
  const allProducts = {
    men: [
      {
        id: 1,
        name: "Air Max 270",
        category: "Men's Shoes",
        price: 150,
        rating: 5,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: true,
        type: "shoes",
        sale: false,
        originalPrice: null
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
        type: "shoes",
        sale: false,
        originalPrice: null
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
        type: "clothing",
        sale: false,
        originalPrice: null
      },
      {
        id: 8,
        name: "Metcon 7",
        category: "Men's Training Shoes",
        price: 130,
        rating: 5,
        reviews: 76,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: true,
        type: "shoes",
        sale: false,
        originalPrice: null
      },
      {
        id: 9,
        name: "Air Max 97",
        category: "Men's Shoes",
        price: 160,
        rating: 4,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "shoes",
        sale: true,
        originalPrice: 180
      },
      {
        id: 10,
        name: "Tech Fleece Hoodie",
        category: "Men's Hoodie",
        price: 85,
        rating: 4,
        reviews: 95,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "clothing",
        sale: false,
        originalPrice: null
      }
    ],
    women: [
      {
        id: 2,
        name: "React Infinity Run",
        category: "Women's Running",
        price: 160,
        rating: 4,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "shoes",
        sale: false,
        originalPrice: null
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
        type: "shoes",
        sale: false,
        originalPrice: null
      },
      {
        id: 11,
        name: "Air Force 1 Shadow",
        category: "Women's Shoes",
        price: 110,
        rating: 5,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: true,
        type: "shoes",
        sale: false,
        originalPrice: null
      },
      {
        id: 12,
        name: "Yoga Luxe Leggings",
        category: "Women's Yoga",
        price: 90,
        rating: 4,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "clothing",
        sale: true,
        originalPrice: 110
      },
      {
        id: 13,
        name: "Dri-FIT Sports Bra",
        category: "Women's Sports Bra",
        price: 45,
        rating: 5,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: true,
        type: "clothing",
        sale: false,
        originalPrice: null
      }
    ],
    kids: [
      {
        id: 14,
        name: "Air Max 90 Kids",
        category: "Kids' Shoes",
        price: 75,
        rating: 5,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1514590804865-d39e2d46b81b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: true,
        type: "shoes",
        sale: false,
        originalPrice: null
      },
      {
        id: 15,
        name: "Revolution 6 Kids",
        category: "Kids' Running",
        price: 55,
        rating: 4,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1514590804865-d39e2d46b81b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "shoes",
        sale: true,
        originalPrice: 65
      },
      {
        id: 16,
        name: "Kids' T-Shirt Pack",
        category: "Kids' Clothing",
        price: 25,
        rating: 4,
        reviews: 34,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        isNew: false,
        type: "clothing",
        sale: false,
        originalPrice: null
      }
    ],
    sale: []
  };

  // Get sale products from all categories
  const getSaleProducts = () => {
    const saleProducts = [];
    Object.values(allProducts).forEach(categoryProducts => {
      saleProducts.push(...categoryProducts.filter(product => product.sale));
    });
    return saleProducts;
  };

  // Get products based on category
  const products = useMemo(() => {
    let productList = category === 'sale' ? getSaleProducts() : allProducts[category] || [];
    
    // Apply filters
    if (filterBy !== 'all') {
      productList = productList.filter(product => product.type === filterBy);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        return [...productList].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...productList].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...productList].sort((a, b) => b.isNew - a.isNew);
      case 'rating':
        return [...productList].sort((a, b) => b.rating - a.rating);
      default:
        return productList;
    }
  }, [category, sortBy, filterBy]);

  const getCategoryTitle = () => {
    switch (category) {
      case 'men': return "Men's Collection";
      case 'women': return "Women's Collection";
      case 'kids': return "Kids' Collection";
      case 'sale': return "Sale Items";
      default: return "Products";
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case 'men': return "Discover the latest in men's athletic wear and footwear";
      case 'women': return "Explore our complete women's collection";
      case 'kids': return "Fun and functional gear for young athletes";
      case 'sale': return "Great deals on your favorite Nike products";
      default: return "Browse our collection";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{getCategoryTitle()}</h1>
          <p className="text-xl text-gray-300">{getCategoryDescription()}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            {showFilters && (
              <div className="flex items-center space-x-4">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="all">All Products</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'} transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {products.length} result{products.length !== 1 ? 's' : ''}
            {category === 'sale' && <span className="ml-2 text-red-600 font-medium">🔥 Sale Items</span>}
          </p>
        </div>

        {/* Products Grid/List */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <div key={product.id} className={viewMode === 'list' ? 'max-w-2xl' : ''}>
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={isFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;