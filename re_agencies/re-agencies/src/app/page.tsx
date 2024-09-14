"use client"
import Header from './_components/Header';
import Banner from './_components/Banner';
import Footer from './_components/Footer';
import ProductsSection from './_components/ProductSection';
import ClientProvider from "./client-provider";
import { useState } from 'react';

const HomePage = () => {
  const scrollToProducts = () => {
    // Use document.getElementById to find the element and scroll into view
    const element = document.getElementById('products-sectio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ClientProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          {/* Pass the function as a callback */}
          <Banner onButtonClick={scrollToProducts} />
          <ProductsSection /> {/* Ensure this component is properly named and imported */}
        </main>
        <Footer />
      </div>
    </ClientProvider>
  );
};

export default HomePage;
