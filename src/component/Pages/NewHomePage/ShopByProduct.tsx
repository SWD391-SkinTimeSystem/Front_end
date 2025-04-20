import { useState } from "react";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Radiant Glow Moisturizer",
    price: 80.00,
    image: "https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
  },
  {
    id: 2,
    name: "Hydration Boost Serum",
    price: 85.00,
    image: "https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
  },
  {
    id: 3,
    name: "Rejuvenating Night Cream",
    price: 99.00,
    image: "https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
  },
  {
    id: 4,
    name: "Purifying Face Cleanser",
    price: 80.00,
    image: "https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
  },
  {
    id: 5,
    name: "Brightening Eye Cream",
    price: 70.00,
    image: "https://i.pinimg.com/474x/82/4e/2b/824e2b88962e95a941970911902fb35a.jpg"
  }
];

type TabType = "New Arrival" | "Most Popular" | "Best Selling";

export default function ShopByProduct() {
  const [activeTab, setActiveTab] = useState<TabType>("New Arrival");

  return (
    <div className=" mx-auto mx-auto px-20 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Shop by product</h2>
          
          <div className="flex mt-4 md:mt-0 border-b">
            {["New Arrival", "Most Popular", "Best Selling"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={cn(
                  "px-4 py-2 text-lg relative",
                  activeTab === tab 
                    ? "text-green-500 font-medium" 
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="relative rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute bottom-4 left-2 right-2 bg-white rounded-full shadow-lg p-4 border-2">
  <h3 className="text-xs font-medium text-gray-700 text-opacity-80">{product.name}</h3> {/* Tên nhỏ hơn và mờ hơn */}
  <p className="text-sm font-bold mt-1">${product.price.toFixed(2)}</p>
  <div className="absolute bottom-4 right-2">
    <button 
      className="flex items-center justify-center w-10 h-10 bg-[#8bc34a] rounded-full text-white hover:bg-green-600"
      aria-label={`View ${product.name}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </button>
  </div>
</div>


             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}