const Hero = () => {
    return (
<section className="bg-[#8BA57E] text-white ">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center py-12 gap-12 relative z-10 group">
          
          <div className="absolute top-14 left-0 w-full text-center z-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-dmserif">
              <span className="text-white">U</span>
              <span className="text-transparent stroke-white">nlock Your</span>
              <span className="text-white">Natural Glow</span>
            </h1>
          </div>
          
          <div className="md:col-span-1 text-center md:text-left order-2 md:order-3 flex flex-col gap-10">
            <p className="text-white text-base">
              Discover skincare products crafted with pure, natural ingredients. Elevate your beauty routine with solutions designed to nourish, protect, and renew your skin.
            </p>
            <button className="bg-[#8BC34A] hover:bg-[#7CB342] text-white py-3 px-8 rounded-full w-fit mx-auto md:mx-0">
              Shop Now
            </button>
          </div>
      
          <div className="md:col-span-2 relative flex justify-center items-center order-1 md:order-1 w-full">
            <div className="flex-grow max-w-[450px] h-[600px] rounded-[200px] overflow-hidden border-[5px] border-[#A0B696] transition-all duration-500 group-hover:scale-105">
              <img
                src="https://i.pinimg.com/474x/97/a0/02/97a002bded032ee07dc6c8850cb8e232.jpg"
                alt="Main"
                className="object-cover w-full h-full"
              />
            </div>
      
            <div className="absolute bottom-[-20px] right-8 w-[220px] h-[300px] rounded-t-[120px] overflow-hidden border-[5px] border-[#A0B696] shadow-lg transition-all duration-500 group-hover:scale-105">
              <img
                src="https://i.pinimg.com/474x/60/17/c7/6017c7aaf59669343914231c70b0b88d.jpg"
                alt="Product"
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  w-[150px] bg-[#8BA57E] text-white text-sm text-center px-6 py-2 rounded-full">
                Beauty Product
              </div>    
            </div>
          </div>
        </div>
        
        {/* Custom CSS for outline text effect */}
        <style jsx>{`
          .stroke-white {
            -webkit-text-stroke: 1px white;
            text-stroke: 1px white;
          }
        `}</style>
      </section>
    );
  };
  
  export default Hero;
  