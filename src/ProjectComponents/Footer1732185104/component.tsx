import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 w-full h-full"> {/* Full width and height */}
      <div className="container mx-auto h-full">
        <div className="flex flex-wrap justify-between h-full">
          
          {/* FOOTER COPY */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">ThreadCraft</h3>
            <div className="flex items-center space-x-4">
              <img src="https://raw.githubusercontent.com/56b81caaa87941618cfed6dfb4d34047/Custom_T-shirt_Designer_1732185100/main/src/assets/images/370f094b7cc94b068b67225f449c9d86.jpeg" alt="Cute cat" className="w-16 h-16 rounded-full" />
              <div>
                <p className="text-gray-400">© 2023 ThreadCraft. Stitching creativity into every thread.</p>
                <p className="text-gray-400 mt-2">Copyright 2024</p>
              </div>
            </div>

          {/* SOCIALS */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer as component };