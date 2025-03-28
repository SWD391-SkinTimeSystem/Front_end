import { ShoppingCart, Leaf } from 'lucide-react';

const SkincareLandingPage = () => {
  return (
    <div className="relative min-h-screen bg-green-700 overflow-hidden">
      {/* Background Leaf Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <Leaf className="absolute top-10 left-10 text-white/20 w-20 h-20 opacity-20" />
        <Leaf className="absolute bottom-10 right-10 text-white/20 w-20 h-20 opacity-20" />
        <Leaf className="absolute top-1/3 right-20 text-white/20 w-16 h-16 opacity-20 rotate-45" />
        <Leaf className="absolute bottom-1/4 left-20 text-white/20 w-16 h-16 opacity-20 -rotate-45" />
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-green-700 bg-opacity-90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-700 font-bold text-xl">H</span>
            </div>
            <nav className="ml-10 space-x-6">
              <a href="#" className="text-white hover:text-green-200">Home</a>
              <a href="#" className="text-white hover:text-green-200">Contact</a>
            </nav>
          </div>
          <div>
            <button className="text-white hover:bg-green-600 p-2 rounded-full">
              <ShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-lg transform rotate-6 scale-90">
              <img 
                src="/api/placeholder/500/600" 
                alt="Skincare products" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-lg -rotate-6 -z-10"></div>
          </div>

          {/* Right Side - Text */}
          <div>
            <h1 className="text-5xl font-bold text-white mb-6">
              Nourish Your Skin Naturally
            </h1>
            <p className="text-white/80 text-xl mb-8">
              Indulge in the purest, plant-based skincare products for a radiant complexion.
            </p>
            <button className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition">
              Shop Now
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkincareLandingPage;