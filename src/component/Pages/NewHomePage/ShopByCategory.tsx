import React from 'react';

const ShopByCategory = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-20">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="md:col-span-4 relative rounded-3xl overflow-hidden bg-[#F0F0D8] h-[740px]">
            <img
              src="https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
              alt="Serum Product with Natural Ingredients"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 w-full flex justify-center">
              <button className="bg-white text-gray-800 font-medium py-2 px-8 rounded-full shadow-md">
                SERUMS
              </button>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="hidden md:flex flex-col justify-center items-center text-center  h-[355px]">
              <h2 className="text-4xl font-semibold mb-6">Shop by Category</h2>
              <p className="text-center text-gray-600 min-w-2xl mx-auto mb-8">            
                  Explore our full range of skincare products, each formulated to address different skin concerns and goals.
              </p>
              <button className="bg-[#8BC34A] hover:bg-[#7CB342] text-white py-4 px-12 rounded-full text-base">
  Explore Now
</button>

            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#F0F0D8] h-[355px]">
              <img
                src="https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
                alt="Cleanse Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <button className="bg-white text-gray-800 font-medium py-2 px-8 rounded-full shadow-md text-sm">
                  CLEANSE
                </button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#F0F0D8]  h-[355px]">
              <img
                src="https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
                alt="Face Cream Product"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <button className="bg-white text-gray-800 font-medium py-2 px-8 rounded-full shadow-md text-sm">
                  FACE CREAM
                </button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-[#F0F0D8]  h-[355px]">
              <img
                src="https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
                alt="Lotion Products"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-0 w-full flex justify-center">
                <button className="bg-white text-gray-800 font-medium py-2 px-8 rounded-full shadow-md text-sm">
                  LOTION
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>


  );
};

export default ShopByCategory;