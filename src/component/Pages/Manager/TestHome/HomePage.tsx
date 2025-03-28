import React from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import Categories from "./Categories";
import ServiceList from "./Services";
import Footer from "./Footer";
import { mockServiceCategories, servicesList, categories } from "../Service/services";
import WhyChooseUs from "./WhyChooseUs";
import AboutUs from "./AboutUs";

interface Category {
  serviceGroupId: string;
  serviceGroupName: string;
  description?: string;
  image?: string;
}

interface Service {
  serviceNameId: string;
  serviceName: string;
  description?: string;
  price?: number;
  image?: string;
}

interface HomePageProps {
  categories: Category[];
  services: Service[];
}

const HomePage: React.FC<HomePageProps> = ({ categories, services }) => {
  return (
    <div
      className="min-h-screen font-sans relative bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGdyZWVufGVufDB8fDB8fHww')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header />
        <HeroBanner />
        <div className="container mx-auto px-4">
        <Categories categoryList={categories} />
        <AboutUs />
        <WhyChooseUs />
        
          <ServiceList serviceList={services} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default function Home() {
  return <HomePage categories={categories} services={servicesList} />;
}