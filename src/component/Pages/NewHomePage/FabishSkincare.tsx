import React from 'react';
import { Play } from 'lucide-react';

const FabishSkincare = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="relative w-full h-72">
              <div className="absolute left-0 w-full h-4/5 top-1/4 bg-[#D8F1B6] rounded-l-full"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/src/assets/product.png"
                  alt="Fabish Skincare Products"
                  className="h-[230%] w-auto object-contain z-10"
                />
              </div>
            </div>

            <div className="relative rounded-r-full overflow-hidden h-60 w-full">
              <img
                src="https://i.pinimg.com/474x/50/b3/22/50b32239b2738064c20bf040ca11e2e9.jpg"
                alt="Woman applying skincare product"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white bg-opacity-70 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-90 transition-all">
                  <Play size={30} className="text-gray-800 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-lg space-y-6">
            <h2 className="text-4xl font-semibold text-gray-900">Fabish Skincare For Your Beautiful Skin</h2>

            <p className="text-gray-600">
              At Expert Skincare, we provide personalized treatments to nourish and enhance your natural beauty. Our expert team is dedicated to helping you achieve healthy, radiant skin every day.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="min-w-4 mr-3 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-600">Customized skincare solutions for all skin types</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 mr-3 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-600">Expert consultations and advice</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 mr-3 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-600">Safe and proven skincare techniques</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-4 mr-3 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-600">Achieve glowing, youthful skin</span>
              </li>
            </ul>

            <button className="bg-[#8bc34a] hover:bg-green-600 text-white py-3 px-8 rounded-full">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabishSkincare;
