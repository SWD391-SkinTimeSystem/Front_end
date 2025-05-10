import React from 'react';

const HeroFooter = () => {
  return (
    <div className="bg-[#8ba57e] rounded-lg overflow-hidden h-[450px] mx-auto px-5  mb-[30px]">
      <div className="mx-auto px-20 h-full">
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 flex flex-col justify-center z-10 pr-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Skin?
            </h1>
            <p className="text-white text-lg mb-8 max-w-lg">
              We understand that skincare can be complex, so we've gathered 
              the most common questions to help guide you on your journey to 
              healthy, beautiful skin. Find answers to your skincare concerns.
            </p>
            <button className="bg-[#8bc34a] hover:bg-green-600 text-white py-3 px-8 rounded-full font-medium transition-colors duration-300">
              Shop Now
            </button>
          </div>

          <div className="w-full md:w-1/2 flex items-end justify-end">
            <img 
              src="/src/assets/woman.png"
              alt="Woman with beautiful skin" 
              className="object-contain h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFooter;
