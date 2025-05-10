import React from 'react';
import Header from './Header';
import HeroHeader from './HeroHeader';
import HeroFooter from './HeroFooter';
import ShopByCategory from './ShopByCategory';
import FabishSkincare from './FabishSkincare';
import ShopByProduct from './ShopByProduct';
import ClientTestimonials from './ClientTestimonials';
// import SkinFirst from './SkinFirst';
import FAQ from './FAQ';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-grow">
        <HeroHeader />
        <ShopByCategory />
        <FabishSkincare />
        <ShopByProduct />
        <ClientTestimonials />
        {/* <SkinFirst /> */}
        <FAQ />
      </main>
      <HeroFooter />
      <Footer />
    </div>
  );
};

export default Home;
