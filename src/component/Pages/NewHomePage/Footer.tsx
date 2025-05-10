import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
       <div className="mr-2">
         <img
              src="/src/assets/logo-xanh.png"
              alt="Main"
                className="object-cover w-[70px] h-[70px]"
              />
      </div>
      <div className="text-2xl font-semibold text-green">Demi</div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-2 border-t border-gray-100">
      <div className=" mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div >
            <Logo />
            <p className="mt-4 text-gray-600">
              At Demi, we provide premium natural skincare products formulated with proven ingredients for radiant, healthy skin at any age.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-sage-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sage-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sage-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sage-600">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-500 uppercase font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sage-600">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-500 uppercase font-medium mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Cleansers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Serums</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Moisturizers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Skin Treatments</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-500 uppercase font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Track Order</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Loyalty Program</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sage-600">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-2 pt-2 text-center text-gray-500">
          <p>© 2025 Demi Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;