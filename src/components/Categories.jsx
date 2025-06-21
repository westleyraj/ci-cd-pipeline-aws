// src/components/Categories.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: "Men",
      route: "/men",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1faa7cfc-371f-440e-b061-3792bee1239b/AS+M+NK+DF+FORM+JKT.png"
    },
    {
      name: "Women",
      route: "/women",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Kids",
      route: "/kids",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a64ffe44-e504-46b5-b5da-e93edad2d6ab/B+NK+DF+SS+MILER+TOP.png"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.route}
              className="relative group cursor-pointer block"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white text-3xl font-bold mb-2">{category.name}</h3>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg font-medium bg-black bg-opacity-50 px-4 py-2 rounded-full">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;