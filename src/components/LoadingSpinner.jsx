import React from 'react';

 const LoadingSpinner = ({ message = "Loading...", size = "default" }) => {
  const dotSize = {
    small: "w-2 h-2",
    default: "w-3 h-3",
    large: "w-4 h-4"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex space-x-1">
        <div className={`${dotSize[size]} bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
        <div className={`${dotSize[size]} bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
        <div className={`${dotSize[size]} bg-gray-600 rounded-full animate-bounce`}></div>
      </div>
      <p className="text-sm text-gray-600 font-medium">{message}</p>
    </div>
  );
};


export default LoadingSpinner;