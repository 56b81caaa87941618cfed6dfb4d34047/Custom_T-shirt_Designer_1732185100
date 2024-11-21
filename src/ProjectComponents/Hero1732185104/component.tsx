import React from 'react';

const Hero: React.FC = () => {
  
  return (
    <div className="bg-black py-16 text-white w-full h-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Design Your Story, Wear Your Passion</h1>
          <p className="text-xl mb-6">Create unique, custom t-shirts that express your style and personality with our easy-to-use design tool.</p>
          <h2 className="text-3xl font-bold mb-4">Buy Now</h2>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <p className="text-sm text-gray-400">Copyright 2024</p>
        </div>
      </div>
    </div>
  );
};

export { Hero as component }