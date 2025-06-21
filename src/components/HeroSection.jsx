// src/components/HeroSection.jsx
import React from 'react';

const HeroSection = ({ onShopNow }) => {
  const handleShopNow = () => {
    // Scroll to featured products section
    const featuredSection = document.querySelector('#featured-products');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="text-center lg:text-left lg:flex lg:items-center">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Just Do It</span>
                  <span className="block text-orange-500">Your Way</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the latest innovations in athletic footwear and apparel. 
                  Push your limits with Nike's cutting-edge technology.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button 
                      onClick={handleShopNow}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0">
                <div className="relative">
                  <img
                    className="w-full h-96 object-cover rounded-lg shadow-xl"
                    src="https://nike-website-demo.s3.eu-north-1.amazonaws.com/nike-shoe.jpg"
                    alt="Nike Shoes"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;